import React from 'react';
import { ArrowRight, Calendar, CheckCircle2, Play, Sparkles } from 'lucide-react';
import type { ArtworkDefinition, ArtworkProgress, CategoryId } from '../types/colorverse';
import { CATEGORIES, getCategoryMeta } from '../data/categories';
import {
  ALL_ARTWORKS,
  GALLERY_ASSETS,
  getArtworkById,
  getArtworksByCategory,
  getTotalCatalogArchitectureStats,
} from '../data/catalog';
import {
  computeArtworkStats,
  getCategoryCompletionSummary,
  getContinueArtwork,
  getDailyArtwork,
} from '../engine/coloringLogic';
import { ArtworkPreview } from './ArtworkPreview';

interface HomeScreenProps {
  progressByArtwork: Record<string, ArtworkProgress>;
  recentArtworkIds: readonly string[];
  onOpenArtwork: (artwork: ArtworkDefinition) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progressByArtwork,
  recentArtworkIds,
  onOpenArtwork,
  onSelectCategory,
}) => {
  const continueArt = getContinueArtwork(ALL_ARTWORKS, progressByArtwork, recentArtworkIds);
  const continueProg = progressByArtwork[continueArt.id];
  const continueStats = computeArtworkStats(continueArt, continueProg?.filledRegionIds ?? []);
  const continueCat = getCategoryMeta(continueArt.categoryId);

  const dailyArt = getDailyArtwork(ALL_ARTWORKS);
  const dailyProg = progressByArtwork[dailyArt.id];
  const dailyStats = computeArtworkStats(dailyArt, dailyProg?.filledRegionIds ?? []);
  const dailyCat = getCategoryMeta(dailyArt.categoryId);

  const catalogStats = getTotalCatalogArchitectureStats();

  const totalCompleted = ALL_ARTWORKS.filter((art) => {
    const p = progressByArtwork[art.id];
    return p ? computeArtworkStats(art, p.filledRegionIds).isComplete : false;
  }).length;

  const recentArtworks = recentArtworkIds
    .map((id) => getArtworkById(id))
    .filter((a): a is ArtworkDefinition => Boolean(a))
    .slice(0, 4);

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-10">
      {/* 1. HERO SECTION — Cinematic gallery studio backdrop with calm left negative space */}
      <section
        aria-label="Featured showcase"
        className="relative rounded-2xl overflow-hidden bg-[#0E1017] border border-[#DCD7CC] dark:border-white/[0.08] min-h-[290px] sm:min-h-[340px] flex items-center"
      >
        <img
          src={GALLERY_ASSETS.heroAtelier}
          alt="Illuminated artist easel and brass palette in a twilight gallery studio"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-right opacity-85"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#090A0E] via-[#090A0E]/82 to-[#090A0E]/25"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-xl p-6 sm:p-10">
          <p className="text-xs font-medium tracking-[0.22em] text-[#E5C158] uppercase">
            Digital Art Atelier
          </p>
          <h1 className="mt-2.5 font-display text-3xl sm:text-5xl font-semibold tracking-[0.06em] text-[#F4F1EA] leading-[1.12] [text-wrap:balance]">
            Every picture has a story.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#C4C9D6] leading-relaxed max-w-md">
            Transform crisp ink sketches into luminous gallery pieces across six curated worlds.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              data-start="true"
              onClick={() => onOpenArtwork(continueArt)}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E2BF4E] active:scale-[0.99] text-[#0B0C10] font-semibold text-sm transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-[#090A0E]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{continueStats.filledCount > 0 ? 'Continue Coloring' : 'Start Coloring'}</span>
            </button>

            <div className="text-xs sm:text-sm text-[#B8BECE] tabular-nums">
              <span>{totalCompleted} of {catalogStats.playableCount} completed</span>
              <span className="mx-2 text-[#6C7387]" aria-hidden="true">·</span>
              <span>{catalogStats.plannedTotalCount}-level archive</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUE COLORING & DAILY ART — Balanced 2-column gallery showcase */}
      <section aria-label="Continue and Daily Art" className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Continue Coloring Card */}
        <article className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07]">
          <button
            type="button"
            onClick={() => onOpenArtwork(continueArt)}
            aria-label={`Resume ${continueArt.title}`}
            className="w-full sm:w-36 aspect-[4/5] shrink-0 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#FAF8F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ArtworkPreview
              artwork={continueArt}
              mode={continueStats.filledCount > 0 ? 'progress' : 'sketch'}
              filledRegionIds={continueProg?.filledRegionIds}
            />
          </button>

          <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6A08] dark:text-[#E5C158] font-medium">
                <span>Continue Coloring</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#6B7080] dark:text-[#9CA2B4]">{continueCat.name}</span>
              </div>
              <h2 className="mt-1.5 font-display text-xl font-semibold text-[#14151A] dark:text-[#F4F1EA] truncate">
                {continueArt.title}
              </h2>
              <p className="mt-0.5 text-sm text-[#5C606E] dark:text-[#A4A8B8] truncate">
                {continueArt.character} · {continueArt.source}
              </p>
              <p className="mt-2 text-xs text-[#6B7080] dark:text-[#8A90A2] italic line-clamp-2">
                “{continueArt.punchline}”
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-[#5C606E] dark:text-[#9CA2B4] tabular-nums mb-1.5">
                  <span>
                    {continueStats.filledCount} / {continueStats.totalRegions} regions
                  </span>
                  <span className="font-semibold text-[#14151A] dark:text-[#F4F1EA]">
                    {continueStats.percent}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#E8E4DA] dark:bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#D4AF37] transition-all duration-300"
                    style={{ width: `${continueStats.percent}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenArtwork(continueArt)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#14161E] hover:bg-[#232735] dark:bg-white/[0.09] dark:hover:bg-white/[0.15] text-[#F4F1EA] text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>{continueStats.filledCount > 0 ? 'Resume Artwork' : 'Begin Level 01'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Daily Art Spotlight Card */}
        <article className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07]">
          <button
            type="button"
            onClick={() => onOpenArtwork(dailyArt)}
            aria-label={`Open Daily Art: ${dailyArt.title}`}
            className="w-full sm:w-36 aspect-[4/5] shrink-0 rounded-xl overflow-hidden border border-[#D4AF37]/35 bg-[#12131A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ArtworkPreview artwork={dailyArt} mode="completed" />
          </button>

          <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6A08] dark:text-[#E5C158] font-medium">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Daily Art</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#6B7080] dark:text-[#9CA2B4]">{dailyCat.name}</span>
              </div>
              <h2 className="mt-1.5 font-display text-xl font-semibold text-[#14151A] dark:text-[#F4F1EA] truncate">
                {dailyArt.title}
              </h2>
              <p className="mt-0.5 text-sm text-[#5C606E] dark:text-[#A4A8B8] truncate">
                {dailyArt.character} · {dailyArt.source}
              </p>
              <p className="mt-2 text-xs text-[#6B7080] dark:text-[#8A90A2] italic line-clamp-2">
                “{dailyArt.punchline}”
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-xs text-[#6B7080] dark:text-[#9CA2B4] tabular-nums">
                <span>Level {String(dailyArt.levelNumber).padStart(2, '0')}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>{dailyArt.difficulty}</span>
              </div>

              <button
                type="button"
                onClick={() => onOpenArtwork(dailyArt)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#8C6A08] dark:text-[#E5C158] text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Sparkles className="w-4 h-4" />
                <span>{dailyStats.isComplete ? 'View Masterpiece' : 'Paint Daily Art'}</span>
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* 3. BROWSE SIX CATEGORIES */}
      <section aria-labelledby="browse-categories-heading">
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <div>
            <h2
              id="browse-categories-heading"
              className="font-display text-2xl font-semibold text-[#14151A] dark:text-[#F4F1EA]"
            >
              Curated Worlds
            </h2>
            <p className="mt-1 text-sm text-[#5C606E] dark:text-[#9CA2B4]">
              Six distinct art galleries, each designed for an 80-level collection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {CATEGORIES.map((category) => {
            const catArtworks = getArtworksByCategory(category.id);
            const coverArt = catArtworks[0];
            const summary = getCategoryCompletionSummary(catArtworks, progressByArtwork);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className="group text-left flex items-center gap-4 p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07] hover:border-[#D4AF37]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <div className="w-24 aspect-[4/5] shrink-0 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#12131A]">
                  <ArtworkPreview
                    artwork={coverArt}
                    mode="completed"
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-[#6B7080] dark:text-[#9CA2B4] tabular-nums">
                    <span>{summary.completed}/{summary.playableTotal} complete</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{category.targetLevels} levels</span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-[#14151A] dark:text-[#F4F1EA] group-hover:text-[#8C6A08] dark:group-hover:text-[#E5C158] transition-colors truncate">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#5C606E] dark:text-[#9CA2B4] line-clamp-2 leading-relaxed">
                    {category.tagline}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#14151A] dark:text-[#E5C158]">
                    <span>Explore gallery</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. RECENT ARTWORK */}
      <section aria-labelledby="recent-artwork-heading" className="pb-6">
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <h2
            id="recent-artwork-heading"
            className="font-display text-2xl font-semibold text-[#14151A] dark:text-[#F4F1EA]"
          >
            {recentArtworks.length > 0 ? 'Recent Studio Pieces' : 'Featured Masterpieces'}
          </h2>
          <span className="text-xs text-[#6B7080] dark:text-[#9CA2B4] tabular-nums">
            {recentArtworks.length > 0
              ? `${recentArtworks.length} recent`
              : 'Handpicked Level 01 starters'}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {(recentArtworks.length > 0
            ? recentArtworks
            : [ALL_ARTWORKS[0], ALL_ARTWORKS[5], ALL_ARTWORKS[10], ALL_ARTWORKS[20]]
          ).map((art) => {
            const prog = progressByArtwork[art.id];
            const stats = computeArtworkStats(art, prog?.filledRegionIds ?? []);
            const cat = getCategoryMeta(art.categoryId);

            return (
              <button
                key={art.id}
                type="button"
                onClick={() => onOpenArtwork(art)}
                className="group text-left flex flex-col rounded-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07] hover:border-[#D4AF37]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#12131A]">
                  <ArtworkPreview
                    artwork={art}
                    mode={stats.isComplete ? 'completed' : stats.filledCount > 0 ? 'progress' : 'completed'}
                    filledRegionIds={prog?.filledRegionIds}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {stats.isComplete && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#0B0C10]/80 text-[#E5C158] text-[11px] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Done</span>
                    </div>
                  )}
                </div>
                <div className="p-3.5">
                  <div className="text-[11px] text-[#8C6A08] dark:text-[#E5C158] font-medium truncate">
                    {cat.name} · Level {String(art.levelNumber).padStart(2, '0')}
                  </div>
                  <h3 className="mt-1 font-display text-sm font-semibold text-[#14151A] dark:text-[#F4F1EA] truncate">
                    {art.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-[#6B7080] dark:text-[#9CA2B4] tabular-nums">
                    <span className="truncate">{art.character}</span>
                    {stats.filledCount > 0 && <span>{stats.percent}%</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
