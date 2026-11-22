import React from 'react';
import {
  BookOpen,
  Film,
  Flame,
  Home,
  Settings,
  Shield,
  Smile,
  Sparkles,
} from 'lucide-react';
import type { AppView, ArtworkProgress, CategoryId } from '../types/colorverse';
import { CATEGORIES } from '../data/categories';
import { getArtworksByCategory } from '../data/catalog';
import { getCategoryCompletionSummary } from '../engine/coloringLogic';
import { BrandLogoMark } from './BrandLogo';

interface LeftCategoryNavProps {
  activeView: AppView;
  activeCategory: CategoryId;
  progressByArtwork: Record<string, ArtworkProgress>;
  onSelectHome: () => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onSelectSettings: () => void;
}

const CATEGORY_ICONS: Record<
  CategoryId,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  disney: Sparkles,
  marvel: Shield,
  movies: Film,
  kids: Smile,
  study: BookOpen,
  memes: Flame,
};

export const LeftCategoryNav: React.FC<LeftCategoryNavProps> = ({
  activeView,
  activeCategory,
  progressByArtwork,
  onSelectHome,
  onSelectCategory,
  onSelectSettings,
}) => {
  return (
    <aside
      aria-label="Gallery navigation"
      className="fixed left-0 top-0 bottom-0 z-30 w-[68px] md:w-[240px] flex flex-col justify-between bg-[#EFECE5] dark:bg-[#0E1016] border-r border-[#DCD7CC] dark:border-white/[0.07] select-none transition-colors duration-200"
    >
      {/* Top quiet brand anchor — keeps upper rail clean and uncluttered */}
      <div className="pt-4 px-2 md:px-5 flex items-center justify-center md:justify-start">
        <button
          type="button"
          onClick={onSelectHome}
          aria-label="COLORVERSE Home"
          className="group flex items-center gap-2.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl"
        >
          <BrandLogoMark className="w-9 h-9 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="hidden md:block font-display text-sm font-semibold tracking-[0.22em] text-[#14151A] dark:text-[#F4F1EA] whitespace-nowrap">
            COLORVERSE
          </span>
        </button>
      </div>

      {/* Lower-positioned ergonomic thumb-zone category menu (Requirement 13) */}
      <nav
        aria-label="Art categories"
        className="mt-auto pb-4 px-1.5 md:px-3 flex flex-col gap-1"
      >
        {/* Home Button */}
        <button
          type="button"
          onClick={onSelectHome}
          aria-current={activeView === 'home' ? 'page' : undefined}
          className={`group flex flex-col md:flex-row items-center md:justify-between gap-1 md:gap-2.5 w-full min-h-[48px] md:min-h-[44px] px-1.5 md:px-3 py-1.5 rounded-xl text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
            activeView === 'home'
              ? 'bg-[#D4AF37]/16 text-[#8C6A08] dark:text-[#E5C158] font-semibold'
              : 'text-[#525666] dark:text-[#9CA2B4] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-[#14151A] dark:hover:text-[#F4F1EA]'
          }`}
        >
          <span className="flex flex-col md:flex-row items-center gap-0.5 md:gap-2.5 min-w-0">
            <Home className="w-5 h-5 shrink-0" />
            <span className="text-[10px] md:text-[13px] leading-tight truncate whitespace-nowrap">
              Gallery
            </span>
          </span>
        </button>

        <div className="my-1 mx-2 h-px bg-[#DCD7CC] dark:bg-white/[0.06]" aria-hidden="true" />

        {/* Six Main Art Categories */}
        {CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category.id];
          const isActive = activeView === 'category' && activeCategory === category.id;
          const summary = getCategoryCompletionSummary(
            getArtworksByCategory(category.id),
            progressByArtwork,
          );

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`${category.name} category`}
              className={`group flex flex-col md:flex-row items-center md:justify-between gap-0.5 md:gap-2 w-full min-h-[48px] md:min-h-[44px] px-1 md:px-3 py-1.5 rounded-xl text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isActive
                  ? 'bg-[#181B24] text-[#F4F1EA] dark:bg-white/[0.09] dark:text-[#F4F1EA] font-semibold shadow-sm'
                  : 'text-[#525666] dark:text-[#9CA2B4] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-[#14151A] dark:hover:text-[#F4F1EA]'
              }`}
            >
              <span className="flex flex-col md:flex-row items-center gap-0.5 md:gap-2.5 min-w-0">
                <Icon
                  className="w-[19px] h-[19px] shrink-0 transition-transform duration-150 group-hover:scale-105"
                  style={isActive ? { color: category.accentHex } : undefined}
                />
                <span className="text-[10px] md:text-[13px] leading-tight truncate max-w-[58px] md:max-w-[156px] whitespace-nowrap">
                  <span className="md:hidden">{category.shortName}</span>
                  <span className="hidden md:inline">{category.name}</span>
                </span>
              </span>
              <span className="hidden md:inline text-[11px] tabular-nums text-[#7C8194] dark:text-[#787E93] shrink-0">
                {summary.completed}/{summary.playableTotal}
              </span>
            </button>
          );
        })}

        <div className="my-1 mx-2 h-px bg-[#DCD7CC] dark:bg-white/[0.06]" aria-hidden="true" />

        {/* Settings */}
        <button
          type="button"
          onClick={onSelectSettings}
          aria-current={activeView === 'settings' ? 'page' : undefined}
          className={`flex flex-col md:flex-row items-center md:justify-between gap-0.5 md:gap-2.5 w-full min-h-[48px] md:min-h-[44px] px-1.5 md:px-3 py-1.5 rounded-xl text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
            activeView === 'settings'
              ? 'bg-[#D4AF37]/16 text-[#8C6A08] dark:text-[#E5C158] font-semibold'
              : 'text-[#525666] dark:text-[#9CA2B4] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-[#14151A] dark:hover:text-[#F4F1EA]'
          }`}
        >
          <span className="flex flex-col md:flex-row items-center gap-0.5 md:gap-2.5">
            <Settings className="w-5 h-5 shrink-0" />
            <span className="text-[10px] md:text-[13px] leading-tight whitespace-nowrap">
              Settings
            </span>
          </span>
        </button>
      </nav>
    </aside>
  );
};
