import React, { useMemo } from 'react';
import type { ArtworkDefinition } from '../types/colorverse';

interface ArtworkPreviewProps {
  artwork: ArtworkDefinition;
  mode: 'completed' | 'sketch' | 'progress';
  filledRegionIds?: readonly string[];
  className?: string;
}

export const ArtworkPreview: React.FC<ArtworkPreviewProps> = React.memo(
  ({ artwork, mode, filledRegionIds = [], className = 'w-full h-full' }) => {
    const paletteMap = useMemo(() => {
      const map = new Map<number, string>();
      for (const p of artwork.palette) {
        map.set(p.id, p.hex);
      }
      return map;
    }, [artwork.palette]);

    const filledSet = useMemo(() => new Set(filledRegionIds), [filledRegionIds]);

    const bgFill = mode === 'sketch' ? '#FAF8F3' : artwork.backgroundHex;

    return (
      <svg
        viewBox={artwork.viewBox}
        className={className}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`${artwork.title} — ${artwork.character}`}
      >
        <rect x="0" y="0" width="800" height="1000" fill={bgFill} />
        {artwork.regions.map((region) => {
          const isFilled =
            mode === 'completed' || (mode === 'progress' && filledSet.has(region.id));
          const fillHex = isFilled ? paletteMap.get(region.colorId) ?? '#FAF8F3' : '#F7F4EC';
          const strokeHex = isFilled
            ? mode === 'completed'
              ? 'rgba(12, 13, 18, 0.45)'
              : 'rgba(18, 19, 24, 0.65)'
            : '#232632';
          const strokeW = isFilled && mode === 'completed' ? 2.2 : 2.8;

          return (
            <path
              key={region.id}
              d={region.d}
              fill={fillHex}
              stroke={strokeHex}
              strokeWidth={strokeW}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}

        {artwork.detailStrokes &&
          artwork.detailStrokes.map((d, idx) => (
            <path
              key={idx}
              d={d}
              fill="none"
              stroke={mode === 'sketch' ? '#1E202B' : 'rgba(14, 15, 22, 0.72)'}
              strokeWidth={3.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
      </svg>
    );
  },
);

ArtworkPreview.displayName = 'ArtworkPreview';
