import type { ArtworkDefinition, CategoryId, UpcomingLevelMeta } from '../types/colorverse';
import { buildUpcomingLevels, CATEGORIES } from './categories';
import { DISNEY_ARTWORKS } from './artworks/disney';
import { MARVEL_ARTWORKS } from './artworks/marvel';
import { MOVIES_ARTWORKS } from './artworks/movies';
import { KIDS_ARTWORKS } from './artworks/kids';
import { STUDY_ARTWORKS } from './artworks/study';
import { MEMES_ARTWORKS } from './artworks/memes';

export const GALLERY_ASSETS = {
  heroAtelier: '/src/assets/images/hero_gallery_atelier_1795348706318.jpg',
  introFantasy: '/src/assets/images/intro_showcase_fantasy_1795348706937.jpg',
  introCinema: '/src/assets/images/intro_showcase_cinema_1795348707321.jpg',
} as const;

export const ARTWORKS_BY_CATEGORY: Record<CategoryId, ArtworkDefinition[]> = {
  disney: DISNEY_ARTWORKS,
  marvel: MARVEL_ARTWORKS,
  movies: MOVIES_ARTWORKS,
  kids: KIDS_ARTWORKS,
  study: STUDY_ARTWORKS,
  memes: MEMES_ARTWORKS,
};

// Ordered with Marvel Level 01 (Iron Man) first as the flagship default recommendation
export const ALL_ARTWORKS: ArtworkDefinition[] = [
  ...MARVEL_ARTWORKS,
  ...MOVIES_ARTWORKS,
  ...DISNEY_ARTWORKS,
  ...KIDS_ARTWORKS,
  ...STUDY_ARTWORKS,
  ...MEMES_ARTWORKS,
];

const ARTWORK_MAP = new Map<string, ArtworkDefinition>(
  ALL_ARTWORKS.map((artwork) => [artwork.id, artwork]),
);

const UPCOMING_CACHE: Partial<Record<CategoryId, UpcomingLevelMeta[]>> = {};

export function getArtworksByCategory(categoryId: CategoryId): ArtworkDefinition[] {
  return ARTWORKS_BY_CATEGORY[categoryId] ?? [];
}

export function getArtworkById(id: string): ArtworkDefinition | undefined {
  return ARTWORK_MAP.get(id);
}

export function getUpcomingCatalogByCategory(categoryId: CategoryId): UpcomingLevelMeta[] {
  if (!UPCOMING_CACHE[categoryId]) {
    const playableCount = getArtworksByCategory(categoryId).length;
    UPCOMING_CACHE[categoryId] = buildUpcomingLevels(categoryId, playableCount + 1, 80);
  }
  return UPCOMING_CACHE[categoryId]!;
}

export function getTotalCatalogArchitectureStats(): {
  playableCount: number;
  plannedTotalCount: number;
  categoriesCount: number;
} {
  return {
    playableCount: ALL_ARTWORKS.length,
    plannedTotalCount: CATEGORIES.reduce((sum, cat) => sum + cat.targetLevels, 0),
    categoriesCount: CATEGORIES.length,
  };
}
