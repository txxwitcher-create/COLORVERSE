import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogoMark: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Deep obsidian gallery emblem base */}
    <rect x="2" y="2" width="60" height="60" rx="16" fill="#0E1017" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="1.5" />
    {/* Chromatic orbital brushstroke segments */}
    <path
      d="M 15 38 A 19 19 0 0 1 32 13"
      stroke="#E0534A"
      strokeWidth="4.2"
      strokeLinecap="round"
    />
    <path
      d="M 32 13 A 19 19 0 0 1 51 32"
      stroke="#D4AF37"
      strokeWidth="4.2"
      strokeLinecap="round"
    />
    <path
      d="M 51 32 A 19 19 0 0 1 28 51"
      stroke="#38BDF8"
      strokeWidth="4.2"
      strokeLinecap="round"
    />
    <path
      d="M 28 51 A 19 19 0 0 1 15 38"
      stroke="#34D399"
      strokeWidth="4.2"
      strokeLinecap="round"
    />
    {/* Central universe prism star & brush nib */}
    <path
      d="M 32 19 L 35.8 28.2 L 45 32 L 35.8 35.8 L 32 45 L 28.2 35.8 L 19 32 L 28.2 28.2 Z"
      fill="#F4E2B0"
    />
    <circle cx="32" cy="32" r="3.4" fill="#0E1017" />
  </svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const markSize = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const titleClass =
    size === 'lg'
      ? 'text-3xl sm:text-4xl tracking-[0.22em]'
      : size === 'sm'
        ? 'text-sm tracking-[0.2em]'
        : 'text-lg tracking-[0.2em]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <BrandLogoMark className={`${markSize} shrink-0`} />
      <div className="min-w-0">
        <div className={`font-display font-semibold text-[#14151A] dark:text-[#F4F1EA] leading-none whitespace-nowrap ${titleClass}`}>
          COLORVERSE
        </div>
        {showTagline && (
          <p className="mt-1.5 text-xs sm:text-sm text-[#5C606E] dark:text-[#A4A8B8] tracking-wide">
            Every picture has a story.
          </p>
        )}
      </div>
    </div>
  );
};
