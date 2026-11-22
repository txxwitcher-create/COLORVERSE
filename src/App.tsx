/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  AppSettings,
  AppView,
  ArtworkDefinition,
  CategoryId,
  UserProgressStore,
} from './types/colorverse';
import { getArtworkById, getArtworksByCategory } from './data/catalog';
import {
  getNextLevelArtwork,
  loadStoreFromStorage,
  pushRecentArtwork,
  saveStoreToStorage,
} from './engine/coloringLogic';
import { soundEngine } from './engine/soundEngine';
import { CinematicIntro } from './components/CinematicIntro';
import { LeftCategoryNav } from './components/LeftCategoryNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoryGallery } from './components/CategoryGallery';
import { ColoringStudio } from './components/ColoringStudio';
import { SettingsScreen } from './components/SettingsScreen';

function shouldAutostart(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1';
}

export default function App() {
  const [store, setStore] = useState<UserProgressStore>(() => loadStoreFromStorage());
  const [activeView, setActiveView] = useState<AppView>(() =>
    shouldAutostart() ? 'home' : 'intro',
  );
  const [returnView, setReturnView] = useState<'home' | 'category'>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>(() => store.lastCategoryId);
  const [activeArtworkId, setActiveArtworkId] = useState<string | null>(null);

  // Persist store on every mutation
  useEffect(() => {
    saveStoreToStorage(store);
  }, [store]);

  // Sync Tailwind v4 .dark class + Android theme-color meta tag
  useEffect(() => {
    const isDark = store.settings.theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#0B0C10' : '#F6F4EF');
    }
  }, [store.settings.theme]);

  // Sync audio & haptics configuration
  useEffect(() => {
    soundEngine.configure({
      soundEnabled: store.settings.soundEnabled,
      ambientEnabled: store.settings.ambientEnabled,
      hapticsEnabled: store.settings.hapticsEnabled,
    });
  }, [
    store.settings.soundEnabled,
    store.settings.ambientEnabled,
    store.settings.hapticsEnabled,
  ]);

  // Mirror state machine to document.body.dataset.state for predictable testing & accessibility
  useEffect(() => {
    if (activeView === 'intro') {
      document.body.dataset.state = 'title';
    } else if (activeView === 'studio') {
      document.body.dataset.state = 'playing';
    } else {
      document.body.dataset.state = activeView;
    }
  }, [activeView]);

  const handleIntroComplete = useCallback(() => {
    soundEngine.playCategorySwitch();
    setStore((prev) => (prev.introSeen ? prev : { ...prev, introSeen: true }));
    setActiveView('home');
  }, []);

  const handleSelectHome = useCallback(() => {
    soundEngine.playTap();
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = useCallback((categoryId: CategoryId) => {
    soundEngine.playCategorySwitch();
    setActiveCategory(categoryId);
    setActiveView('category');
    setStore((prev) => ({ ...prev, lastCategoryId: categoryId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectSettings = useCallback(() => {
    soundEngine.playTap();
    setActiveView('settings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenArtwork = useCallback(
    (artwork: ArtworkDefinition) => {
      soundEngine.playCategorySwitch();
      if (activeView === 'home' || activeView === 'category') {
        setReturnView(activeView);
      }
      setActiveCategory(artwork.categoryId);
      setActiveArtworkId(artwork.id);
      setActiveView('studio');
      setStore((prev) => ({
        ...prev,
        lastCategoryId: artwork.categoryId,
        recentArtworkIds: pushRecentArtwork(prev.recentArtworkIds, artwork.id),
      }));
    },
    [activeView],
  );

  const handleProgressChange = useCallback(
    (filledIds: string[], isComplete: boolean, strokeDelta: number) => {
      if (!activeArtworkId) return;
      setStore((prev) => {
        const existing = prev.progressByArtwork[activeArtworkId];
        return {
          ...prev,
          progressByArtwork: {
            ...prev.progressByArtwork,
            [activeArtworkId]: {
              filledRegionIds: filledIds,
              updatedAt: Date.now(),
              completedAt: isComplete ? existing?.completedAt ?? Date.now() : undefined,
              strokeCount: (existing?.strokeCount ?? 0) + strokeDelta,
            },
          },
        };
      });
    },
    [activeArtworkId],
  );

  const handleResetProgress = useCallback(() => {
    if (!activeArtworkId) return;
    setStore((prev) => {
      const nextProgress = { ...prev.progressByArtwork };
      delete nextProgress[activeArtworkId];
      return {
        ...prev,
        progressByArtwork: nextProgress,
      };
    });
  }, [activeArtworkId]);

  const handleUpdateSettings = useCallback((patch: Partial<AppSettings>) => {
    soundEngine.playTap();
    setStore((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...patch,
      },
    }));
  }, []);

  const handleReplayIntro = useCallback(() => {
    soundEngine.playCategorySwitch();
    setActiveView('intro');
  }, []);

  const activeArtwork = useMemo(
    () => (activeArtworkId ? getArtworkById(activeArtworkId) ?? null : null),
    [activeArtworkId],
  );

  const nextLevelArtwork = useMemo(() => {
    if (!activeArtwork) return null;
    const categoryList = getArtworksByCategory(activeArtwork.categoryId);
    return getNextLevelArtwork(activeArtwork, categoryList);
  }, [activeArtwork]);

  if (activeView === 'intro') {
    return (
      <CinematicIntro
        canSkipImmediately={store.introSeen}
        onComplete={handleIntroComplete}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F6F4EF] dark:bg-[#0B0C10] text-[#14151A] dark:text-[#F4F1EA] transition-colors duration-200">
      {/* Persistent Left-Side Lower-Anchored Category Navigation */}
      <LeftCategoryNav
        activeView={activeView}
        activeCategory={activeCategory}
        progressByArtwork={store.progressByArtwork}
        onSelectHome={handleSelectHome}
        onSelectCategory={handleSelectCategory}
        onSelectSettings={handleSelectSettings}
      />

      {/* Main Content Area offset cleanly beside LeftCategoryNav */}
      <main className="pl-[68px] md:pl-[240px] min-h-screen w-full overflow-x-hidden">
        {activeView === 'home' && (
          <HomeScreen
            progressByArtwork={store.progressByArtwork}
            recentArtworkIds={store.recentArtworkIds}
            onOpenArtwork={handleOpenArtwork}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeView === 'category' && (
          <CategoryGallery
            categoryId={activeCategory}
            progressByArtwork={store.progressByArtwork}
            onOpenArtwork={handleOpenArtwork}
          />
        )}

        {activeView === 'settings' && (
          <SettingsScreen
            settings={store.settings}
            onUpdateSettings={handleUpdateSettings}
            onReplayIntro={handleReplayIntro}
          />
        )}
      </main>

      {/* Full-Screen Immersive Coloring Studio Overlay */}
      {activeView === 'studio' && activeArtwork && (
        <ColoringStudio
          artwork={activeArtwork}
          initialFilledIds={store.progressByArtwork[activeArtwork.id]?.filledRegionIds ?? []}
          nextLevelArtwork={nextLevelArtwork}
          onProgressChange={handleProgressChange}
          onResetProgress={handleResetProgress}
          onBack={() => setActiveView(returnView)}
          onOpenNextLevel={handleOpenArtwork}
        />
      )}
    </div>
  );
}
