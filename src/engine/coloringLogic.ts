import type {
  ArtworkDefinition,
  ArtworkProgress,
  ArtworkStats,
  CategoryId,
  RegionFillResult,
  UserProgressStore,
} from '../types/colorverse';

export const STORAGE_KEY = 'colorverse_store_v1';
export const STORE_VERSION = 1;

const VALID_CATEGORIES: ReadonlySet<CategoryId> = new Set([
  'disney',
  'marvel',
  'movies',
  'kids',
  'study',
  'memes',
]);

export function createDefaultStore(): UserProgressStore {
  return {
    version: STORE_VERSION,
    progressByArtwork: {},
    recentArtworkIds: [],
    lastCategoryId: 'marvel',
    introSeen: false,
    settings: {
      soundEnabled: true,
      ambientEnabled: false,
      hapticsEnabled: true,
      theme: 'dark',
    },
  };
}

export function computeArtworkStats(
  artwork: ArtworkDefinition,
  filledRegionIds: readonly string[],
): ArtworkStats {
  const filledSet = new Set(filledRegionIds);
  const totalRegions = artwork.regions.length;
  const remainingByColor: Record<number, number> = {};
  const totalByColor: Record<number, number> = {};

  for (const swatch of artwork.palette) {
    remainingByColor[swatch.id] = 0;
    totalByColor[swatch.id] = 0;
  }

  let validFilledCount = 0;
  for (const region of artwork.regions) {
    totalByColor[region.colorId] = (totalByColor[region.colorId] ?? 0) + 1;
    if (filledSet.has(region.id)) {
      validFilledCount += 1;
    } else {
      remainingByColor[region.colorId] = (remainingByColor[region.colorId] ?? 0) + 1;
    }
  }

  const completedColorIds = artwork.palette
    .filter((swatch) => (totalByColor[swatch.id] ?? 0) > 0 && (remainingByColor[swatch.id] ?? 0) === 0)
    .map((swatch) => swatch.id);

  const percent = totalRegions === 0 ? 100 : Math.round((validFilledCount / totalRegions) * 100);
  const isComplete = totalRegions > 0 && validFilledCount >= totalRegions;

  return {
    filledCount: validFilledCount,
    totalRegions,
    percent,
    remainingByColor,
    totalByColor,
    completedColorIds,
    isComplete,
  };
}

export function applyRegionFill(
  artwork: ArtworkDefinition,
  filledRegionIds: readonly string[],
  regionId: string,
  selectedColorId: number,
): RegionFillResult {
  const region = artwork.regions.find((item) => item.id === regionId);
  if (!region) {
    return {
      ok: false,
      reason: 'not-found',
      nextFilledIds: [...filledRegionIds],
      completedColorId: null,
      isArtworkComplete: false,
      expectedColorId: null,
    };
  }

  if (filledRegionIds.includes(regionId)) {
    return {
      ok: false,
      reason: 'already-filled',
      nextFilledIds: [...filledRegionIds],
      completedColorId: null,
      isArtworkComplete: computeArtworkStats(artwork, filledRegionIds).isComplete,
      expectedColorId: region.colorId,
    };
  }

  if (region.colorId !== selectedColorId) {
    return {
      ok: false,
      reason: 'wrong-color',
      nextFilledIds: [...filledRegionIds],
      completedColorId: null,
      isArtworkComplete: false,
      expectedColorId: region.colorId,
    };
  }

  const nextFilledIds = [...filledRegionIds, regionId];
  const stats = computeArtworkStats(artwork, nextFilledIds);
  const colorJustFinished = (stats.remainingByColor[selectedColorId] ?? 0) === 0;

  return {
    ok: true,
    reason: 'filled',
    nextFilledIds,
    completedColorId: colorJustFinished ? selectedColorId : null,
    isArtworkComplete: stats.isComplete,
    expectedColorId: region.colorId,
  };
}

export function findNextIncompleteColorId(
  artwork: ArtworkDefinition,
  filledRegionIds: readonly string[],
  currentColorId: number,
): number {
  const stats = computeArtworkStats(artwork, filledRegionIds);
  if ((stats.remainingByColor[currentColorId] ?? 0) > 0) {
    return currentColorId;
  }
  const nextIncomplete = artwork.palette.find((p) => (stats.remainingByColor[p.id] ?? 0) > 0);
  return nextIncomplete ? nextIncomplete.id : currentColorId;
}

export function findHintTarget(
  artwork: ArtworkDefinition,
  filledRegionIds: readonly string[],
  preferredColorId: number,
): { regionId: string; colorId: number; labelX: number; labelY: number } | null {
  const filledSet = new Set(filledRegionIds);
  const matchingSelected = artwork.regions.find(
    (region) => region.colorId === preferredColorId && !filledSet.has(region.id),
  );
  const target = matchingSelected ?? artwork.regions.find((region) => !filledSet.has(region.id));
  if (!target) {
    return null;
  }
  return {
    regionId: target.id,
    colorId: target.colorId,
    labelX: target.labelX,
    labelY: target.labelY,
  };
}

export function isArtworkCompleted(
  artwork: ArtworkDefinition,
  progressByArtwork: Record<string, ArtworkProgress>,
): boolean {
  const progress = progressByArtwork[artwork.id];
  if (!progress) return false;
  if (progress.completedAt) return true;
  return computeArtworkStats(artwork, progress.filledRegionIds).isComplete;
}

export function isLevelUnlocked(
  artwork: ArtworkDefinition,
  categoryArtworks: readonly ArtworkDefinition[],
  progressByArtwork: Record<string, ArtworkProgress>,
  dailyArtworkId?: string,
): boolean {
  if (artwork.levelNumber <= 1) return true;
  if (dailyArtworkId && artwork.id === dailyArtworkId) return true;
  const existing = progressByArtwork[artwork.id];
  if (existing && (existing.filledRegionIds.length > 0 || existing.completedAt)) {
    return true;
  }
  const previousLevel = categoryArtworks.find(
    (item) => item.levelNumber === artwork.levelNumber - 1,
  );
  if (!previousLevel) return true;
  return isArtworkCompleted(previousLevel, progressByArtwork);
}

export function getNextLevelArtwork(
  currentArtwork: ArtworkDefinition,
  categoryArtworks: readonly ArtworkDefinition[],
): ArtworkDefinition | null {
  return (
    categoryArtworks.find((item) => item.levelNumber === currentArtwork.levelNumber + 1) ?? null
  );
}

export function getDailyArtwork(
  allArtworks: readonly ArtworkDefinition[],
  date: Date = new Date(),
): ArtworkDefinition {
  const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dayKey.length; i += 1) {
    hash = (hash * 31 + dayKey.charCodeAt(i)) >>> 0;
  }
  return allArtworks[hash % allArtworks.length];
}

export function getContinueArtwork(
  allArtworks: readonly ArtworkDefinition[],
  progressByArtwork: Record<string, ArtworkProgress>,
  recentArtworkIds: readonly string[],
): ArtworkDefinition {
  const byId = new Map(allArtworks.map((art) => [art.id, art]));

  // Prefer the most recently updated unfinished artwork with at least 1 filled region
  const unfinishedWithProgress = Object.entries(progressByArtwork)
    .map(([id, prog]) => ({ art: byId.get(id), prog }))
    .filter(
      (entry): entry is { art: ArtworkDefinition; prog: ArtworkProgress } =>
        Boolean(entry.art) &&
        entry.prog.filledRegionIds.length > 0 &&
        !computeArtworkStats(entry.art!, entry.prog.filledRegionIds).isComplete,
    )
    .sort((a, b) => b.prog.updatedAt - a.prog.updatedAt);

  if (unfinishedWithProgress.length > 0) {
    return unfinishedWithProgress[0].art;
  }

  // Otherwise check most recently opened unfinished artwork
  for (const id of recentArtworkIds) {
    const art = byId.get(id);
    if (art && !isArtworkCompleted(art, progressByArtwork)) {
      return art;
    }
  }

  // Fallback to first unlocked uncompleted artwork (starts with Iron Man Level 01)
  const firstUnfinished = allArtworks.find((art) => !isArtworkCompleted(art, progressByArtwork));
  return firstUnfinished ?? allArtworks[0];
}

export function getCategoryCompletionSummary(
  categoryArtworks: readonly ArtworkDefinition[],
  progressByArtwork: Record<string, ArtworkProgress>,
): { completed: number; playableTotal: number; inProgress: number } {
  let completed = 0;
  let inProgress = 0;

  for (const art of categoryArtworks) {
    const prog = progressByArtwork[art.id];
    if (!prog) continue;
    const stats = computeArtworkStats(art, prog.filledRegionIds);
    if (stats.isComplete) {
      completed += 1;
    } else if (stats.filledCount > 0) {
      inProgress += 1;
    }
  }

  return {
    completed,
    playableTotal: categoryArtworks.length,
    inProgress,
  };
}

export function pushRecentArtwork(
  recentIds: readonly string[],
  artworkId: string,
  maxItems = 8,
): string[] {
  const filtered = recentIds.filter((id) => id !== artworkId);
  return [artworkId, ...filtered].slice(0, maxItems);
}

export function serializeStore(store: UserProgressStore): string {
  return JSON.stringify(store);
}

export function hydrateStore(raw: string | null | undefined): UserProgressStore {
  const defaults = createDefaultStore();
  if (!raw) return defaults;

  try {
    const parsed = JSON.parse(raw) as Partial<UserProgressStore>;
    if (!parsed || typeof parsed !== 'object') return defaults;

    const safeProgress: Record<string, ArtworkProgress> = {};
    if (parsed.progressByArtwork && typeof parsed.progressByArtwork === 'object') {
      for (const [id, entry] of Object.entries(parsed.progressByArtwork)) {
        if (entry && Array.isArray(entry.filledRegionIds)) {
          safeProgress[id] = {
            filledRegionIds: entry.filledRegionIds.filter((r): r is string => typeof r === 'string'),
            updatedAt: typeof entry.updatedAt === 'number' ? entry.updatedAt : Date.now(),
            completedAt: typeof entry.completedAt === 'number' ? entry.completedAt : undefined,
            strokeCount: typeof entry.strokeCount === 'number' ? entry.strokeCount : entry.filledRegionIds.length,
          };
        }
      }
    }

    const lastCategory =
      parsed.lastCategoryId && VALID_CATEGORIES.has(parsed.lastCategoryId)
        ? parsed.lastCategoryId
        : defaults.lastCategoryId;

    return {
      version: STORE_VERSION,
      progressByArtwork: safeProgress,
      recentArtworkIds: Array.isArray(parsed.recentArtworkIds)
        ? parsed.recentArtworkIds.filter((id): id is string => typeof id === 'string').slice(0, 12)
        : [],
      lastCategoryId: lastCategory,
      introSeen: Boolean(parsed.introSeen),
      settings: {
        soundEnabled:
          typeof parsed.settings?.soundEnabled === 'boolean'
            ? parsed.settings.soundEnabled
            : defaults.settings.soundEnabled,
        ambientEnabled:
          typeof parsed.settings?.ambientEnabled === 'boolean'
            ? parsed.settings.ambientEnabled
            : defaults.settings.ambientEnabled,
        hapticsEnabled:
          typeof parsed.settings?.hapticsEnabled === 'boolean'
            ? parsed.settings.hapticsEnabled
            : defaults.settings.hapticsEnabled,
        theme: parsed.settings?.theme === 'light' ? 'light' : 'dark',
      },
    };
  } catch {
    return defaults;
  }
}

export function loadStoreFromStorage(): UserProgressStore {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return createDefaultStore();
    }
    return hydrateStore(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return createDefaultStore();
  }
}

export function saveStoreToStorage(store: UserProgressStore): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEY, serializeStore(store));
  } catch {
    // Ignore storage quota or private-mode errors gracefully
  }
}
