import React from 'react';
import { ExternalLink, Moon, Play, Smartphone, Sun, Volume2, VolumeX } from 'lucide-react';
import type { AppSettings, ThemeMode } from '../types/colorverse';
import { BrandLogo } from './BrandLogo';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onReplayIntro: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onReplayIntro,
}) => {
  const setTheme = (theme: ThemeMode) => {
    onUpdateSettings({ theme });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-6">
      <header className="pb-5 border-b border-[#E2DDD2] dark:border-white/[0.08]">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8C6A08] dark:text-[#E5C158]">
          Preferences
        </p>
        <h1 className="mt-1.5 font-display text-3xl font-semibold text-[#14151A] dark:text-[#F4F1EA]">
          Settings
        </h1>
      </header>

      {/* Strictly four primary settings options (Requirement 16 & 17) */}
      <div className="space-y-4">
        {/* 1. Sound */}
        <section
          aria-labelledby="setting-sound-heading"
          className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07] space-y-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/12 text-[#8C6A08] dark:text-[#E5C158] flex items-center justify-center shrink-0">
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </div>
              <div>
                <h2
                  id="setting-sound-heading"
                  className="text-base font-semibold text-[#14151A] dark:text-[#F4F1EA]"
                >
                  Sound
                </h2>
                <p className="mt-0.5 text-sm text-[#5C606E] dark:text-[#9CA2B4]">
                  Brush strokes, palette chimes, and completion acoustics.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.soundEnabled}
              aria-label="Toggle sound effects"
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                settings.soundEnabled
                  ? 'bg-[#D4AF37]'
                  : 'bg-[#D5D0C5] dark:bg-white/[0.15]'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                  settings.soundEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.soundEnabled && (
            <div className="pt-3 border-t border-[#ECE8DF] dark:border-white/[0.06] flex items-center justify-between gap-4 pl-[54px]">
              <div>
                <div className="text-sm font-medium text-[#14151A] dark:text-[#E8E5DE]">
                  Studio Ambience
                </div>
                <div className="text-xs text-[#6B7080] dark:text-[#8A90A2]">
                  Soft warm harmonic drone while painting.
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.ambientEnabled}
                aria-label="Toggle studio ambience"
                onClick={() => onUpdateSettings({ ambientEnabled: !settings.ambientEnabled })}
                className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  settings.ambientEnabled
                    ? 'bg-[#D4AF37]'
                    : 'bg-[#D5D0C5] dark:bg-white/[0.15]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    settings.ambientEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )}
        </section>

        {/* 2. Haptic Feedback */}
        <section
          aria-labelledby="setting-haptics-heading"
          className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07]"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/12 text-[#8C6A08] dark:text-[#E5C158] flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="setting-haptics-heading"
                  className="text-base font-semibold text-[#14151A] dark:text-[#F4F1EA]"
                >
                  Haptic Feedback
                </h2>
                <p className="mt-0.5 text-sm text-[#5C606E] dark:text-[#9CA2B4]">
                  Subtle tactile pulses on region fills, unlocks, and taps.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.hapticsEnabled}
              aria-label="Toggle haptic feedback"
              onClick={() => onUpdateSettings({ hapticsEnabled: !settings.hapticsEnabled })}
              className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                settings.hapticsEnabled
                  ? 'bg-[#D4AF37]'
                  : 'bg-[#D5D0C5] dark:bg-white/[0.15]'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                  settings.hapticsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* 3. Appearance */}
        <section
          aria-labelledby="setting-appearance-heading"
          className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/12 text-[#8C6A08] dark:text-[#E5C158] flex items-center justify-center shrink-0">
                {settings.theme === 'dark' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </div>
              <div>
                <h2
                  id="setting-appearance-heading"
                  className="text-base font-semibold text-[#14151A] dark:text-[#F4F1EA]"
                >
                  Appearance
                </h2>
                <p className="mt-0.5 text-sm text-[#5C606E] dark:text-[#9CA2B4]">
                  Choose between cinematic dark gallery or sunlit paper studio.
                </p>
              </div>
            </div>

            <div
              role="radiogroup"
              aria-label="Theme selection"
              className="inline-flex p-1 rounded-xl bg-[#EFECE5] dark:bg-white/[0.06] shrink-0"
            >
              <button
                type="button"
                role="radio"
                aria-checked={settings.theme === 'dark'}
                onClick={() => setTheme('dark')}
                className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  settings.theme === 'dark'
                    ? 'bg-[#14161E] text-[#F4F1EA] shadow-sm'
                    : 'text-[#5C606E] dark:text-[#9CA2B4] hover:text-[#14151A] dark:hover:text-[#F4F1EA]'
                }`}
              >
                Dark Gallery
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={settings.theme === 'light'}
                onClick={() => setTheme('light')}
                className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  settings.theme === 'light'
                    ? 'bg-[#FFFFFF] text-[#14151A] shadow-sm'
                    : 'text-[#5C606E] dark:text-[#9CA2B4] hover:text-[#14151A] dark:hover:text-[#F4F1EA]'
                }`}
              >
                Light Atelier
              </button>
            </div>
          </div>
        </section>

        {/* 4. About & Tasteful Creator Information */}
        <section
          aria-labelledby="setting-about-heading"
          className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.07] space-y-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="setting-about-heading" className="sr-only">
                About COLORVERSE
              </h2>
              <BrandLogo size="sm" showTagline />
            </div>
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#EFECE5] dark:bg-white/[0.07] hover:bg-[#E4DFD3] dark:hover:bg-white/[0.12] text-xs font-medium text-[#14151A] dark:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Replay Intro</span>
            </button>
          </div>

          <div className="pt-3.5 border-t border-[#ECE8DF] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <span className="text-[#5C606E] dark:text-[#A4A8B8]">
              Created by <strong className="font-semibold text-[#14151A] dark:text-[#F4F1EA]">Amir</strong>
            </span>

            <a
              href="https://instagram.com/unfiltered.java"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[40px] text-[#8C6A08] dark:text-[#E5C158] hover:underline underline-offset-4 font-medium"
            >
              <span>Instagram: @unfiltered.java</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
