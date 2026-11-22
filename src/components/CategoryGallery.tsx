import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Crown, Lock, Play } from 'lucide-react';
import type { ArtworkDefinition, ArtworkProgress, CategoryId } from '../types/colorverse';
import { getCategoryMeta } from '../data/categories';
import {
  ALL_ARTWORKS,
  getArtworksByCategory,
  getUpcomingCatalogByCategory,
} from '../data/catalog';
import {
  computeArtworkStats,
  getCategoryCompletionSummary,
  getDailyArtwork,
  isLevelUnlocked,
} from '../engine/coloringLogic';
import { ArtworkPreview } from './ArtworkPreview';

interface CategoryGalleryProps {
  categoryId: CategoryId;
  progressByArtwork: Record<string, ArtworkProgress>;
  onOpenArtwork: (artwork: ArtworkDefinition) => void;
}

const ARCHIVE_PAGE_SIZE = 15;

export const CategoryGallery: React.FC<CategoryGalleryProps> = ({
  categoryId,
  progressByArtwork,
  onOpenArtwork,
}) => {
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveVisibleCount, setArchiveVisibleCount] = useState(ARCHIVE_PAGE_SIZE);

  const category = getCategoryMeta(categoryId);
  const artworks = getArtworksByCategory(categoryId);
  const upcomingLevels = getUpcomingCatalogByCategory(categoryId);
  const summary = getCategoryCompletionSummary(artworks, progressByArtwork);
  const dailyArt = getDailyArtwork(ALL_ARTWORKS);

  const handleCardClick = (art: ArtworkDefinition, unlocked: boolean) => {
    if (!unlocked) {
      setLockedNotice(
        `Complete Level ${String(art.levelNumber - 1).padStart(2, '0')} in ${category.name} to unlock “${art.title}”.`,
      );
      return;
    }
    setLockedNotice(null);
    onOpenArtwork(art);
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-8">
      {/* Category Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E2DDD2] dark:border-white/[0.08]">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8C6A08] dark:text-[#E5C158]">
            Edition I · {category.defaultDifficulty} Collection
          </p>
          <h1 className="mt-1.5 font-display text-3xl sm:text-4xl font-semibold text-[#14151A] dark:text-[#F4F1EA]">
            {category.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5C606E] dark:text-[#9CA2B4] max-w-2xl">
            {category.tagline}
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm tabular-nums shrink-0">
          <div>
            <div className="text-xs text-[#6B7080] dark:text-[#8A90A2]">Completed</div>
            <div className="font-semibold text-[#14151A] dark:text-[#F4F1EA]">
              {summary.completed} / {summary.playableTotal} ready
            </div>
          </div>
          <div className="h-7 w-px bg-[#DCD7CC] dark:bg-white/[0.08]" aria-hidden="true" />
          <div>
            <div className="text-xs text-[#6B7080] dark:text-[#8A90A2]">Full Collection</div>
            <div className="font-semibold text-[#14151A] dark:text-[#F4F1EA]">
              {category.targetLevels} levels
            </div>
          </div>
        </div>
      </header>

      {/* Locked level feedback banner */}
      {lockedNotice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#D4AF37]/12 border border-[#D4AF37]/30 text-sm text-[#7A5B06] dark:text-[#F4E2B0]"
        >
          <span>{lockedNotice}</span>
          <button
            type="button"
            onClick={() => setLockedNotice(null)}
            className="text-xs font-semibold underline underline-offset-2 shrink-0 min-h-[32px] px-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Collectible Premium Artwork Grid */}
      <section aria-label={`${category.name} playable levels`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {artworks.map((art) => {
            const prog = progressByArtwork[art.id];
            const stats = computeArtworkStats(art, prog?.filledRegionIds ?? []);
            const unlocked = isLevelUnlocked(art, artworks, progressByArtwork, dailyArt.id);
            const isDailyUnlocked = art.id === dailyArt.id && art.levelNumber > 1 && !prog?.filledRegionIds.length;

            return (
              <article
                key={art.id}
                className={`group flex flex-col rounded-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#14161E] border transition-all duration-200 ${
                  unlocked
                    ? 'border-[#E2DDD2] dark:border-white/[0.08] hover:border-[#D4AF37]/60'
                    : 'border-[#E6E2D9] dark:border-white/[0.05] opacity-80'
                }`}
              >
                {/* Collectible Framed Artwork Thumbnail */}
                <button
                  type="button"
                  onClick={() => handleCardClick(art, unlocked)}
                  aria-label={
                    unlocked
                      ? `Open Level ${String(art.levelNumber).padStart(2, '0')}: ${art.title}`
                      : `Locked Level ${String(art.levelNumber).padStart(2, '0')}: ${art.title}`
                  }
                  className="relative aspect-[4/5] w-full overflow-hidden bg-[#12131A] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                >
                  <div className={`w-full h-full ${!unlocked ? 'grayscale-[65%] brightness-75' : ''}`}>
                    <ArtworkPreview
                      artwork={art}
                      mode={
                        stats.isComplete
                          ? 'completed'
                          : stats.filledCount > 0
                            ? 'progress'
                            : unlocked
                              ? 'completed'
                              : 'sketch'
                      }
                      filledRegionIds={prog?.filledRegionIds}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Subtle bottom scrim for status readability */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/48 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Top-right clean completion or lock cue */}
                  <div className="absolute top-3 right-3">
                    {stats.isComplete ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B0C10]/85 text-[#E5C158] text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : !unlocked ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B0C10]/85 text-[#D1D5E0] text-xs font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </span>
                    ) : isDailyUnlocked ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#0B0C10] text-xs font-semibold">
                        <span>Daily Unlock</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Bottom metadata strip inside frame */}
                  <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-xs text-[#F4F1EA]">
                    <span className="font-medium tracking-[0.14em] tabular-nums">
                      LEVEL {String(art.levelNumber).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#E5C158] font-medium tracking-[0.12em]">
                      <Crown className="w-3.5 h-3.5" />
                      <span>PREMIUM ART</span>
                    </span>
                  </div>
                </button>

                {/* Card Identity & Metadata */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#14151A] dark:text-[#F4F1EA] leading-snug">
                      {art.title}
                    </h2>
                    <div className="mt-1 text-xs font-medium text-[#5C606E] dark:text-[#B4BAC9]">
                      <span>{art.character}</span>
                      <span className="mx-1.5 text-[#9CA2B4]" aria-hidden="true">·</span>
                      <span>{art.source}</span>
                    </div>
                    <p className="mt-2.5 text-sm text-[#5C606E] dark:text-[#9CA2B4] italic leading-relaxed">
                      “{art.punchline}”
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#ECE8DF] dark:border-white/[0.06] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6B7080] dark:text-[#9CA2B4] tabular-nums">
                      <span>
                        {art.difficulty} · {art.regions.length} regions
                      </span>
                      <span className="font-semibold text-[#14151A] dark:text-[#F4F1EA]">
                        {stats.percent}%
                      </span>
                    </div>

                    <div className="h-1 w-full rounded-full bg-[#E8E4DA] dark:bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#D4AF37] transition-all duration-300"
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCardClick(art, unlocked)}
                      className={`w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        unlocked
                          ? 'bg-[#D4AF37] hover:bg-[#E2BF4E] text-[#0B0C10]'
                          : 'bg-[#ECE8DF] dark:bg-white/[0.06] text-[#6B7080] dark:text-[#8A90A2] cursor-not-allowed'
                      }`}
                    >
                      {unlocked ? (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>
                            {stats.isComplete
                              ? 'Repaint Artwork'
                              : stats.filledCount > 0
                                ? 'Continue Painting'
                                : 'Start Sketch'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Complete Level {String(art.levelNumber - 1).padStart(2, '0')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Transparent 80-Level Scalable Collection Archive (Levels 06–80 · In Production) */}
      <section
        aria-label="Upcoming collection archive"
        className="pt-4 border-t border-[#E2DDD2] dark:border-white/[0.07]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-[#14151A] dark:text-[#F4F1EA]">
              Upcoming Collection Archive · Levels 06–{category.targetLevels}
            </h2>
            <p className="mt-0.5 text-xs text-[#6B7080] dark:text-[#9CA2B4]">
              {upcomingLevels.length} additional unique plates scheduled in this {category.targetLevels}-level gallery architecture. Released progressively as handcrafted art is completed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowArchive((prev) => !prev)}
            aria-expanded={showArchive}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#EFECE5] dark:bg-white/[0.06] hover:bg-[#E4DFD3] dark:hover:bg-white/[0.1] text-xs font-semibold text-[#14151A] dark:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <span>{showArchive ? 'Hide Archive Catalog' : 'View 80-Level Roadmap'}</span>
            {showArchive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showArchive && (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {upcomingLevels.slice(0, archiveVisibleCount).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#FAF8F4] dark:bg-[#11131A] border border-[#E6E2D9] dark:border-white/[0.05]"
                >
                  <div className="flex items-center justify-between text-[11px] tabular-nums text-[#8C6A08] dark:text-[#D4AF37]/80 font-medium">
                    <span>LEVEL {String(item.levelNumber).padStart(2, '0')}</span>
                    <span className="text-[#7C8194]">In Production</span>
                  </div>
                  <div className="mt-1 font-display text-sm font-semibold text-[#14151A] dark:text-[#E8E5DE] truncate">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs text-[#6B7080] dark:text-[#9CA2B4] truncate">
                    {item.character} · {item.source}
                  </div>
                  <p className="mt-1.5 text-xs text-[#7C8194] dark:text-[#7F869B] italic line-clamp-1">
                    “{item.punchline}”
                  </p>
                </div>
              ))}
            </div>

            {archiveVisibleCount < upcomingLevels.length && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setArchiveVisibleCount((c) => Math.min(upcomingLevels.length, c + ARCHIVE_PAGE_SIZE))
                  }
                  className="min-h-[44px] px-5 py-2 rounded-xl border border-[#DCD7CC] dark:border-white/[0.1] text-xs font-semibold text-[#14151A] dark:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors"
                >
                  Show More ({upcomingLevels.length - archiveVisibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
