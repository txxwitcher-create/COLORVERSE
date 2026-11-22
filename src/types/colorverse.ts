export type CategoryId = 'disney' | 'marvel' | 'movies' | 'kids' | 'study' | 'memes';

export type Difficulty = 'Easy' | 'Medium' | 'Advanced';

export type AppView = 'intro' | 'home' | 'category' | 'studio' | 'settings';

export type ThemeMode = 'dark' | 'light';

export interface PaletteColor {
  id: number;
  name: string;
  hex: string;
}

export interface ArtworkRegion {
  id: string;
  colorId: number;
  d: string;
  labelX: number;
  labelY: number;
  labelSize?: number;
}

export interface ArtworkDefinition {
  id: string;
  categoryId: CategoryId;
  levelNumber: number;
  title: string;
  character: string;
  source: string;
  punchline: string;
  difficulty: Difficulty;
  isPremium: boolean;
  viewBox: string;
  backgroundHex: string;
  palette: PaletteColor[];
  regions: ArtworkRegion[];
  detailStrokes?: string[];
}

export interface UpcomingLevelMeta {
  id: string;
  categoryId: CategoryId;
  levelNumber: number;
  title: string;
  character: string;
  source: string;
  punchline: string;
  difficulty: Difficulty;
}

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  shortName: string;
  tagline: string;
  accentHex: string;
  targetLevels: number;
  defaultDifficulty: Difficulty;
}

export interface ArtworkProgress {
  filledRegionIds: string[];
  updatedAt: number;
  completedAt?: number;
  strokeCount: number;
}

export interface AppSettings {
  soundEnabled: boolean;
  ambientEnabled: boolean;
  hapticsEnabled: boolean;
  theme: ThemeMode;
}

export interface UserProgressStore {
  version: number;
  progressByArtwork: Record<string, ArtworkProgress>;
  recentArtworkIds: string[];
  lastCategoryId: CategoryId;
  introSeen: boolean;
  settings: AppSettings;
}

export interface RegionFillResult {
  ok: boolean;
  reason: 'filled' | 'already-filled' | 'wrong-color' | 'not-found';
  nextFilledIds: string[];
  completedColorId: number | null;
  isArtworkComplete: boolean;
  expectedColorId: number | null;
}

export interface ArtworkStats {
  filledCount: number;
  totalRegions: number;
  percent: number;
  remainingByColor: Record<number, number>;
  totalByColor: Record<number, number>;
  completedColorIds: number[];
  isComplete: boolean;
}
