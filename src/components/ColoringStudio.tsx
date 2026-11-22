import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Crown,
  Lightbulb,
  Maximize2,
  RotateCcw,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { ArtworkDefinition } from '../types/colorverse';
import {
  applyRegionFill,
  computeArtworkStats,
  findHintTarget,
  findNextIncompleteColorId,
} from '../engine/coloringLogic';
import { soundEngine } from '../engine/soundEngine';

interface ColoringStudioProps {
  artwork: ArtworkDefinition;
  initialFilledIds: readonly string[];
  nextLevelArtwork: ArtworkDefinition | null;
  onProgressChange: (filledIds: string[], isComplete: boolean, strokeDelta: number) => void;
  onResetProgress: () => void;
  onBack: () => void;
  onOpenNextLevel: (artwork: ArtworkDefinition) => void;
}

interface BloomFx {
  key: number;
  regionId: string;
  cx: number;
  cy: number;
  hex: string;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export const ColoringStudio: React.FC<ColoringStudioProps> = ({
  artwork,
  initialFilledIds,
  nextLevelArtwork,
  onProgressChange,
  onResetProgress,
  onBack,
  onOpenNextLevel,
}) => {
  const [filledIds, setFilledIds] = useState<string[]>(() => [...initialFilledIds]);
  const [undoStack, setUndoStack] = useState<string[][]>([]);
  const [selectedColorId, setSelectedColorId] = useState<number>(() =>
    findNextIncompleteColorId(artwork, initialFilledIds, artwork.palette[0]?.id ?? 1),
  );
  const [shakeRegionId, setShakeRegionId] = useState<string | null>(null);
  const [hintRegionId, setHintRegionId] = useState<string | null>(null);
  const [feedbackTip, setFeedbackTip] = useState<{ text: string; suggestedColorId?: number } | null>(
    null,
  );
  const [showResetModal, setShowResetModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [blooms, setBlooms] = useState<BloomFx[]>([]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [strokeCount, setStrokeCount] = useState(initialFilledIds.length);

  // Sync when switching directly to Next Level inside Studio
  useEffect(() => {
    setFilledIds([...initialFilledIds]);
    setUndoStack([]);
    setSelectedColorId(
      findNextIncompleteColorId(artwork, initialFilledIds, artwork.palette[0]?.id ?? 1),
    );
    setShakeRegionId(null);
    setHintRegionId(null);
    setFeedbackTip(null);
    setShowResetModal(false);
    setShowVictoryModal(false);
    setBlooms([]);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setStrokeCount(initialFilledIds.length);
  }, [artwork.id]);

  // Drag / Pan & Tap disambiguation refs
  const stageRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const pointerStateRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origPanX: number;
    origPanY: number;
    moved: boolean;
  }>({ active: false, startX: 0, startY: 0, origPanX: 0, origPanY: 0, moved: false });
  const bloomCounterRef = useRef(0);

  const stats = useMemo(() => computeArtworkStats(artwork, filledIds), [artwork, filledIds]);
  const filledSet = useMemo(() => new Set(filledIds), [filledIds]);
  const paletteMap = useMemo(() => {
    const map = new Map<number, { name: string; hex: string }>();
    for (const p of artwork.palette) {
      map.set(p.id, { name: p.name, hex: p.hex });
    }
    return map;
  }, [artwork.palette]);

  // Lightweight on-demand Canvas2D sparkle burst overlay (runs only while particles are alive)
  const rafRef = useRef<number | null>(null);
  const startParticleLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const canvas = fxCanvasRef.current;
      const ctx = canvas ? canvas.getContext('2d') : null;
      const list = particlesRef.current;

      if (ctx && canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetW = Math.floor(canvas.clientWidth * dpr);
        const targetH = Math.floor(canvas.clientHeight * dpr);
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        let alive = 0;
        for (let i = 0; i < list.length; i += 1) {
          const p = list[i];
          p.life -= dt;
          if (p.life <= 0) continue;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 120 * dt;
          const alpha = Math.max(0, p.life / p.maxLife);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (0.4 + alpha * 0.6), 0, Math.PI * 2);
          ctx.fill();
          list[alive] = p;
          alive += 1;
        }
        list.length = alive;
        ctx.globalAlpha = 1;
      }

      if (list.length > 0) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const spawnBurst = useCallback(
    (clientX: number, clientY: number, hex: string, count = 14) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 55 + Math.random() * 140;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 35,
          life: 0.45 + Math.random() * 0.25,
          maxLife: 0.7,
          size: 2.5 + Math.random() * 3.5,
          color: i % 3 === 0 ? '#E5C158' : hex,
        });
      }
      startParticleLoop();
    },
    [startParticleLoop],
  );

  // Keyboard shortcuts: Escape for back/modal close, Z for undo, H for hint, 1-9 for swatch selection
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showResetModal || showVictoryModal) {
        if (e.key === 'Escape') {
          setShowResetModal(false);
          setShowVictoryModal(false);
        }
        return;
      }

      if (e.key === 'Escape') {
        onBack();
      } else if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey || !e.shiftKey)) {
        if (undoStack.length > 0) {
          handleUndo();
        }
      } else if (e.key === 'h' || e.key === 'H') {
        handleHint();
      } else if (/^[1-9]$/.test(e.key)) {
        const num = Number(e.key);
        if (artwork.palette.some((p) => p.id === num)) {
          setSelectedColorId(num);
          soundEngine.playSwatchSelect(num);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showResetModal, showVictoryModal, undoStack.length, artwork.palette]);

  const handleRegionTap = (
    regionId: string,
    clientX?: number,
    clientY?: number,
  ) => {
    if (pointerStateRef.current.moved) return;

    const result = applyRegionFill(artwork, filledIds, regionId, selectedColorId);

    if (!result.ok) {
      if (result.reason === 'wrong-color' && result.expectedColorId !== null) {
        soundEngine.playWrongRegion();
        setShakeRegionId(regionId);
        const expectedSwatch = paletteMap.get(result.expectedColorId);
        setFeedbackTip({
          text: `Select Color #${result.expectedColorId}${expectedSwatch ? ` (${expectedSwatch.name})` : ''} for this region`,
          suggestedColorId: result.expectedColorId,
        });
        window.setTimeout(() => setShakeRegionId((curr) => (curr === regionId ? null : curr)), 260);
      }
      return;
    }

    // Successful paint fill!
    setFeedbackTip(null);
    setHintRegionId(null);
    setUndoStack((prev) => [...prev.slice(-39), filledIds]);
    setFilledIds(result.nextFilledIds);
    setStrokeCount((s) => s + 1);
    onProgressChange(result.nextFilledIds, result.isArtworkComplete, 1);

    const region = artwork.regions.find((r) => r.id === regionId);
    const fillHex = paletteMap.get(selectedColorId)?.hex ?? '#D4AF37';

    // Convert tap point into SVG viewBox coordinates for radial paint bloom
    let bloomCx = region?.labelX ?? 400;
    let bloomCy = region?.labelY ?? 500;
    if (svgRef.current && clientX !== undefined && clientY !== undefined) {
      const rect = svgRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        bloomCx = ((clientX - rect.left) / rect.width) * 800;
        bloomCy = ((clientY - rect.top) / rect.height) * 1000;
      }
      spawnBurst(clientX, clientY, fillHex, result.isArtworkComplete ? 36 : 12);
    }

    const bloomKey = ++bloomCounterRef.current;
    setBlooms((prev) => [...prev.slice(-4), { key: bloomKey, regionId, cx: bloomCx, cy: bloomCy, hex: fillHex }]);
    window.setTimeout(() => {
      setBlooms((prev) => prev.filter((b) => b.key !== bloomKey));
    }, 360);

    if (result.isArtworkComplete) {
      soundEngine.playLevelComplete();
      if (nextLevelArtwork) {
        window.setTimeout(() => soundEngine.playUnlock(), 650);
      }
      setZoom(1);
      setPan({ x: 0, y: 0 });
      window.setTimeout(() => setShowVictoryModal(true), 520);
    } else if (result.completedColorId !== null) {
      soundEngine.playColorComplete();
      const nextColor = findNextIncompleteColorId(artwork, result.nextFilledIds, selectedColorId);
      setSelectedColorId(nextColor);
    } else {
      const ratio = result.nextFilledIds.length / artwork.regions.length;
      soundEngine.playPaintFill(ratio);
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setFilledIds(previous);
    setShowVictoryModal(false);
    soundEngine.playUndo();
    onProgressChange(previous, false, 0);
  };

  const handleConfirmReset = () => {
    setFilledIds([]);
    setUndoStack([]);
    setSelectedColorId(artwork.palette[0]?.id ?? 1);
    setHintRegionId(null);
    setFeedbackTip(null);
    setShowResetModal(false);
    setShowVictoryModal(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setStrokeCount(0);
    soundEngine.playUndo();
    onResetProgress();
  };

  const handleHint = () => {
    const target = findHintTarget(artwork, filledIds, selectedColorId);
    if (!target) return;
    soundEngine.playTap();
    setSelectedColorId(target.colorId);
    setHintRegionId(target.regionId);
    const swatch = paletteMap.get(target.colorId);
    setFeedbackTip({
      text: `Highlighted Color #${target.colorId}${swatch ? ` · ${swatch.name}` : ''}`,
    });
  };

  const handleZoomDelta = (delta: number) => {
    soundEngine.playTap();
    setZoom((z) => {
      const next = Math.max(1, Math.min(2.75, Number((z + delta).toFixed(2))));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetView = () => {
    soundEngine.playTap();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pointer drag-to-pan (only active when zoomed > 1x; crisp tap always works at any zoom)
  const onStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStateRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origPanX: pan.x,
      origPanY: pan.y,
      moved: false,
    };
  };

  const onStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = pointerStateRef.current;
    if (!st.active) return;
    const dx = e.clientX - st.startX;
    const dy = e.clientY - st.startY;
    if (Math.hypot(dx, dy) > 8) {
      st.moved = true;
      if (zoom > 1) {
        const limit = (zoom - 1) * 260;
        setPan({
          x: Math.max(-limit, Math.min(limit, st.origPanX + dx)),
          y: Math.max(-limit, Math.min(limit, st.origPanY + dy)),
        });
      }
    }
  };

  const onStagePointerUp = () => {
    pointerStateRef.current.active = false;
    window.setTimeout(() => {
      pointerStateRef.current.moved = false;
    }, 0);
  };

  const selectedSwatch = paletteMap.get(selectedColorId);

  return (
    <div
      data-testid="coloring-studio"
      className="fixed inset-0 z-40 flex flex-col bg-[#F3F0E9] dark:bg-[#0B0C10] text-[#14151A] dark:text-[#F4F1EA] select-none overflow-hidden"
    >
      {/* Top Studio Bar — Compact, unobtrusive, touch-friendly >=44px targets */}
      <header className="shrink-0 h-14 sm:h-16 px-3 sm:px-5 flex items-center justify-between gap-2 bg-[#FFFFFF] dark:bg-[#11131B] border-b border-[#E2DDD2] dark:border-white/[0.07]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => {
              soundEngine.playTap();
              onBack();
            }}
            aria-label="Back to gallery"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="font-display text-sm sm:text-base font-semibold truncate leading-tight">
              {artwork.title}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-[#6B7080] dark:text-[#9CA2B4] tabular-nums">
              <span>LVL {String(artwork.levelNumber).padStart(2, '0')}</span>
              <span aria-hidden="true">·</span>
              <span data-testid="studio-progress-text">
                {stats.filledCount}/{stats.totalRegions} ({stats.percent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Center progress bar on wider screens */}
        <div className="hidden md:flex items-center gap-3 w-48 lg:w-64">
          <div className="h-1.5 flex-1 rounded-full bg-[#E5E0D5] dark:bg-white/[0.08] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#D4AF37] transition-all duration-300"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
          <span className="text-xs font-semibold tabular-nums text-[#8C6A08] dark:text-[#E5C158] w-9 text-right">
            {stats.percent}%
          </span>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleHint}
            disabled={stats.isComplete}
            aria-label="Highlight next region hint"
            title="Hint (H)"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.07] disabled:opacity-35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Lightbulb className="w-5 h-5 text-[#B48A18] dark:text-[#E5C158]" />
          </button>

          <button
            type="button"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            aria-label="Undo last fill"
            title="Undo (Z)"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.07] disabled:opacity-35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Undo2 className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playTap();
              setShowResetModal(true);
            }}
            disabled={filledIds.length === 0}
            aria-label="Reset artwork"
            title="Reset artwork"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.07] disabled:opacity-35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile thin progress hairline */}
      <div className="md:hidden h-1 w-full bg-[#E5E0D5] dark:bg-white/[0.07] shrink-0">
        <div
          className="h-full bg-[#D4AF37] transition-all duration-300"
          style={{ width: `${stats.percent}%` }}
        />
      </div>

      {/* Main Unobstructed Interactive Canvas Stage */}
      <main
        ref={stageRef}
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={onStagePointerUp}
        onPointerCancel={onStagePointerUp}
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > 10) {
            handleZoomDelta(e.deltaY < 0 ? 0.25 : -0.25);
          }
        }}
        className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden p-3 sm:p-5 touch-none"
      >
        {/* Artwork Interactive SVG Sheet */}
        <div
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          }}
          className="relative h-full max-h-full aspect-[4/5] max-w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.38)] border border-black/15 dark:border-white/[0.12] bg-[#FAF8F3] transition-transform duration-150 ease-out"
        >
          <svg
            ref={svgRef}
            data-testid="coloring-canvas-svg"
            viewBox={artwork.viewBox}
            className="w-full h-full block"
            preserveAspectRatio="xMidYMid meet"
            role="application"
            aria-label={`Coloring canvas for ${artwork.title}`}
          >
            <defs>
              {/* Subtle architectural cross-hatch highlighting uncoloured regions matching selected color */}
              <pattern
                id="selected-color-hatch"
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="14" height="14" fill="#F2ECE0" />
                <line x1="0" y1="0" x2="0" y2="14" stroke="#C5B9A0" strokeWidth="3.2" />
              </pattern>

              {/* Radial clip paths for silky paint-bloom transitions */}
              {blooms.map((b) => (
                <clipPath key={b.key} id={`bloom-clip-${b.key}`}>
                  <circle cx={b.cx} cy={b.cy} r="520">
                    <animate
                      attributeName="r"
                      from="12"
                      to="620"
                      dur="0.32s"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.16 1 0.3 1"
                    />
                  </circle>
                </clipPath>
              ))}
            </defs>

            <rect
              x="0"
              y="0"
              width="800"
              height="1000"
              fill={stats.isComplete ? artwork.backgroundHex : '#FAF8F3'}
            />

            {/* Colourable Regions */}
            {artwork.regions.map((region) => {
              const isFilled = filledSet.has(region.id);
              const isTargetForSelected = !isFilled && region.colorId === selectedColorId;
              const isShaking = shakeRegionId === region.id;
              const isHinted = hintRegionId === region.id && !isFilled;
              const swatch = paletteMap.get(region.colorId);

              const activeBloom = blooms.find((b) => b.regionId === region.id);

              const fillValue = isFilled
                ? activeBloom
                  ? '#FAF8F3'
                  : swatch?.hex ?? '#D4AF37'
                : isTargetForSelected
                  ? 'url(#selected-color-hatch)'
                  : '#FAF8F3';

              const strokeColor = stats.isComplete
                ? 'rgba(15, 16, 22, 0.38)'
                : isHinted
                  ? '#D4AF37'
                  : '#1E202B';

              const strokeWidth = isHinted ? 6 : stats.isComplete ? 2.2 : 3.2;

              return (
                <g
                  key={region.id}
                  className={isShaking ? 'animate-region-shake' : undefined}
                >
                  <path
                    data-region-id={region.id}
                    data-color-id={region.colorId}
                    data-filled={isFilled ? 'true' : 'false'}
                    d={region.d}
                    fill={fillValue}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className={!isFilled ? 'cursor-pointer' : 'cursor-default'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegionTap(region.id, e.clientX, e.clientY);
                    }}
                  />

                  {/* Expanding paint bloom layer when newly painted */}
                  {activeBloom && (
                    <path
                      d={region.d}
                      fill={activeBloom.hex}
                      clipPath={`url(#bloom-clip-${activeBloom.key})`}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      pointerEvents="none"
                    />
                  )}

                  {/* Hint luminous pulse ring */}
                  {isHinted && (
                    <circle
                      cx={region.labelX}
                      cy={region.labelY}
                      r={28}
                      fill="rgba(212, 175, 55, 0.25)"
                      stroke="#D4AF37"
                      strokeWidth={4}
                      className="animate-hint-pulse"
                      pointerEvents="none"
                    />
                  )}

                  {/* Crisp region palette number when uncoloured */}
                  {!isFilled && (
                    <text
                      x={region.labelX}
                      y={region.labelY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={region.labelSize ?? 18}
                      fontWeight={isTargetForSelected ? 700 : 600}
                      fill={isTargetForSelected ? '#11131A' : '#585D6E'}
                      pointerEvents="none"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      {region.colorId}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Crisp Non-Fillable Ink Detail Linework on Top */}
            {artwork.detailStrokes &&
              artwork.detailStrokes.map((d, idx) => (
                <path
                  key={idx}
                  d={d}
                  fill="none"
                  stroke={stats.isComplete ? 'rgba(14, 15, 22, 0.72)' : '#1E202B'}
                  strokeWidth={3.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pointerEvents="none"
                />
              ))}
          </svg>

          {/* Celebratory gold shimmer sweep on completion */}
          {stats.isComplete && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#E5C158]/35 to-transparent animate-gold-shimmer" />
            </div>
          )}
        </div>

        {/* Pooled Canvas2D Sparkle Particle Overlay (pointer-events-none) */}
        <canvas
          ref={fxCanvasRef}
          className="pointer-events-none absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Compact Zoom Controls — Pinned neatly in bottom-right corner without blocking art */}
        <div className="absolute right-3 sm:right-5 bottom-3 sm:bottom-5 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={() => handleZoomDelta(0.35)}
            disabled={zoom >= 2.75}
            aria-label="Zoom in"
            className="w-11 h-11 rounded-xl bg-[#FFFFFF]/95 dark:bg-[#161923]/95 border border-[#DCD7CC] dark:border-white/[0.1] flex items-center justify-center shadow-md disabled:opacity-35 hover:border-[#D4AF37] transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleZoomDelta(-0.35)}
            disabled={zoom <= 1}
            aria-label="Zoom out"
            className="w-11 h-11 rounded-xl bg-[#FFFFFF]/95 dark:bg-[#161923]/95 border border-[#DCD7CC] dark:border-white/[0.1] flex items-center justify-center shadow-md disabled:opacity-35 hover:border-[#D4AF37] transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          {zoom > 1 && (
            <button
              type="button"
              onClick={handleResetView}
              aria-label="Reset zoom"
              className="w-11 h-11 rounded-xl bg-[#FFFFFF]/95 dark:bg-[#161923]/95 border border-[#DCD7CC] dark:border-white/[0.1] flex items-center justify-center shadow-md hover:border-[#D4AF37] transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quiet Non-Blocking Guidance Toast at Top of Stage */}
        {feedbackTip && (
          <div
            role="status"
            className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2 rounded-xl bg-[#14161E] text-[#F4F1EA] border border-[#D4AF37]/40 shadow-lg text-xs sm:text-sm max-w-[90%]"
          >
            <span className="truncate">{feedbackTip.text}</span>
            {feedbackTip.suggestedColorId !== undefined && (
              <button
                type="button"
                onClick={() => {
                  const cid = feedbackTip.suggestedColorId!;
                  setSelectedColorId(cid);
                  setFeedbackTip(null);
                  soundEngine.playSwatchSelect(cid);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#0B0C10] text-xs font-semibold whitespace-nowrap shrink-0"
              >
                Use #{feedbackTip.suggestedColorId}
              </button>
            )}
          </div>
        )}
      </main>

      {/* Bottom Colour Palette Bar — Ergonomic thumb-accessible pigment trays */}
      <footer className="shrink-0 bg-[#FFFFFF] dark:bg-[#11131B] border-t border-[#E2DDD2] dark:border-white/[0.07] px-3 sm:px-6 pt-2.5 pb-3.5 sm:pb-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs mb-2 px-1">
            <span className="font-medium text-[#14151A] dark:text-[#F4F1EA] truncate">
              {selectedSwatch
                ? `#${selectedColorId} · ${selectedSwatch.name}`
                : 'Select a pigment'}
            </span>
            <span className="text-[#6B7080] dark:text-[#9CA2B4] tabular-nums whitespace-nowrap">
              {stats.remainingByColor[selectedColorId] ?? 0} remaining for #{selectedColorId}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label="Colour palette"
            className="flex items-center sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1 px-1"
          >
            {artwork.palette.map((swatch) => {
              const isSelected = swatch.id === selectedColorId;
              const totalForColor = stats.totalByColor[swatch.id] ?? 0;
              const remaining = stats.remainingByColor[swatch.id] ?? 0;
              const isDone = totalForColor > 0 && remaining === 0;
              const pct =
                totalForColor === 0 ? 1 : (totalForColor - remaining) / totalForColor;
              const circumference = 2 * Math.PI * 23;
              const dashOffset = circumference * (1 - pct);

              // Pick high-contrast ink for the number inside the pigment swatch
              const r = parseInt(swatch.hex.slice(1, 3), 16);
              const g = parseInt(swatch.hex.slice(3, 5), 16);
              const b = parseInt(swatch.hex.slice(5, 7), 16);
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              const labelColor = luminance > 0.62 ? '#14151A' : '#F8FAFC';

              return (
                <button
                  key={swatch.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Color ${swatch.id}: ${swatch.name}${isDone ? ', completed' : `, ${remaining} left`}`}
                  onClick={() => {
                    setSelectedColorId(swatch.id);
                    setFeedbackTip(null);
                    soundEngine.playSwatchSelect(swatch.id);
                  }}
                  className={`relative w-[52px] h-[52px] shrink-0 rounded-full flex items-center justify-center transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isSelected ? 'scale-110 -translate-y-0.5' : 'hover:scale-105'
                  } ${isDone ? 'opacity-55' : ''}`}
                >
                  {/* Circular remaining progress track */}
                  <svg
                    viewBox="0 0 52 52"
                    className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="26"
                      cy="26"
                      r="23"
                      fill="none"
                      stroke={isSelected ? '#D4AF37' : 'rgba(148,163,184,0.28)'}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <circle
                      cx="26"
                      cy="26"
                      r="23"
                      fill="none"
                      stroke={isDone ? '#10B981' : '#D4AF37'}
                      strokeWidth="3"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Pigment Fill Core */}
                  <span
                    className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-semibold text-sm tabular-nums shadow-inner border border-black/15"
                    style={{ backgroundColor: swatch.hex, color: labelColor }}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[2.8]" /> : swatch.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </footer>

      {/* Reset Confirmation Dialog */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        >
          <div className="w-full max-w-sm rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#E2DDD2] dark:border-white/[0.1] p-6 shadow-2xl">
            <h2
              id="reset-dialog-title"
              className="font-display text-xl font-semibold text-[#14151A] dark:text-[#F4F1EA]"
            >
              Reset Artwork?
            </h2>
            <p className="mt-2 text-sm text-[#5C606E] dark:text-[#9CA2B4] leading-relaxed">
              This will clear all painted regions on “{artwork.title}” and return it to its original black-and-white sketch.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-[#5C606E] dark:text-[#C4C9D6] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-semibold transition-colors"
              >
                Reset Sketch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Level Complete Celebration Modal */}
      {showVictoryModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="victory-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] dark:bg-[#14161E] border border-[#D4AF37]/40 p-6 sm:p-7 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] mb-3">
              <Crown className="w-6 h-6" />
            </div>

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8C6A08] dark:text-[#E5C158]">
              Masterpiece Complete · Level {String(artwork.levelNumber).padStart(2, '0')}
            </p>
            <h2
              id="victory-dialog-title"
              className="mt-1.5 font-display text-2xl font-semibold text-[#14151A] dark:text-[#F4F1EA]"
            >
              {artwork.title}
            </h2>
            <p className="mt-1.5 text-sm text-[#5C606E] dark:text-[#9CA2B4] italic">
              “{artwork.punchline}”
            </p>

            {/* Mastery Stats */}
            <div className="mt-5 grid grid-cols-3 gap-3 py-3.5 px-3 rounded-xl bg-[#F6F4EF] dark:bg-white/[0.04] border border-[#E6E2D9] dark:border-white/[0.06] tabular-nums">
              <div>
                <div className="text-[11px] text-[#6B7080] dark:text-[#8A90A2]">Regions</div>
                <div className="mt-0.5 text-base font-semibold">{artwork.regions.length}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6B7080] dark:text-[#8A90A2]">Pigments</div>
                <div className="mt-0.5 text-base font-semibold">{artwork.palette.length}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6B7080] dark:text-[#8A90A2]">Strokes</div>
                <div className="mt-0.5 text-base font-semibold">{Math.max(strokeCount, artwork.regions.length)}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              {nextLevelArtwork && (
                <button
                  type="button"
                  data-start="true"
                  onClick={() => {
                    soundEngine.playTap();
                    onOpenNextLevel(nextLevelArtwork);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E2BF4E] text-[#0B0C10] font-semibold text-sm transition-colors"
                >
                  <span>Next Level: {nextLevelArtwork.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowVictoryModal(false);
                    setShowResetModal(true);
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-[#DCD7CC] dark:border-white/[0.12] text-sm font-medium hover:border-[#D4AF37] transition-colors"
                >
                  Repaint
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTap();
                    onBack();
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#14161E] dark:bg-white/[0.1] text-[#F4F1EA] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
