import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ALL_ARTWORKS, GALLERY_ASSETS } from '../data/catalog';
import { ArtworkPreview } from './ArtworkPreview';
import { BrandLogoMark } from './BrandLogo';

interface CinematicIntroProps {
  canSkipImmediately: boolean;
  onComplete: () => void;
}

const TOTAL_DURATION_MS = 10500;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
}

const PARTICLE_COLORS = ['#D4AF37', '#E0534A', '#38BDF8', '#34D399', '#F4E2B0', '#A78BFA'];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  canSkipImmediately,
  onComplete,
}) => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const triggerComplete = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onCompleteRef.current();
  };

  // Keyboard Enter / Space start handshake
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        triggerComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // 10.5s master timeline + pooled 60fps Canvas2D paint particles & golden brushstroke
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    const startTime = performance.now();
    let rafId = 0;

    // Pre-allocated fixed pool of 48 pigment particles (zero GC inside RAF)
    const particles: Particle[] = Array.from({ length: 48 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: -0.00012 - Math.random() * 0.00022,
      r: 1.5 + (i % 4) * 1.1,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      alpha: 0.25 + (i % 5) * 0.14,
    }));

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastUiUpdate = 0;
    let lastFrameTime = startTime;

    const tick = (now: number) => {
      const rawDt = (now - lastFrameTime) / 1000;
      const dt = Math.min(rawDt, 0.05);
      lastFrameTime = now;

      const elapsed = now - startTime;
      if (now - lastUiUpdate >= 60 || elapsed >= TOTAL_DURATION_MS) {
        lastUiUpdate = now;
        setElapsedMs(Math.min(elapsed, TOTAL_DURATION_MS));
      }

      if (ctx && canvas) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);

        // Phase progress for particles
        const convergePhase = Math.max(0, Math.min(1, (elapsed - 7800) / 1800));

        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i];
          if (convergePhase > 0) {
            p.x += (0.5 - p.x) * dt * 2.4;
            p.y += (0.45 - p.y) * dt * 2.4;
          } else {
            p.x += p.vx * (dt * 1000);
            p.y += p.vy * (dt * 1000);
            if (p.y < -0.05) p.y = 1.05;
            if (p.x < -0.05) p.x = 1.05;
            if (p.x > 1.05) p.x = -0.05;
          }

          ctx.globalAlpha = p.alpha * (1 - convergePhase * 0.65);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // 0-2.5s sweeping golden brushstroke curve across obsidian stage
        if (elapsed < 4500) {
          const strokeT = Math.min(1, elapsed / 1900);
          const fadeOut = elapsed > 2600 ? Math.max(0, 1 - (elapsed - 2600) / 1400) : 1;
          ctx.save();
          ctx.globalAlpha = 0.78 * fadeOut;
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          const steps = 40;
          const maxStep = Math.floor(steps * strokeT);
          for (let s = 0; s <= maxStep; s += 1) {
            const u = s / steps;
            const px = w * (0.14 + u * 0.72);
            const py = h * (0.58 - Math.sin(u * Math.PI * 1.2) * 0.2);
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      }

      if (elapsed >= TOTAL_DURATION_MS) {
        triggerComplete();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Determine active narrative phase (0..10.5s)
  const sec = elapsedMs / 1000;
  const phase =
    sec < 2
      ? 1 // 0-2s: Dark obsidian, paint particles, brushstroke
      : sec < 4
        ? 2 // 2-4s: Sketch line-art forming
        : sec < 6
          ? 3 // 4-6s: Six artwork styles montage
          : sec < 8
            ? 4 // 6-8s: Sketch transforms into vivid colour
            : 5; // 8-10.5s: Converge into COLORVERSE logo

  const ironMan = ALL_ARTWORKS[0]; // Marvel
  const heisenberg = ALL_ARTWORKS[5]; // Movies
  const castle = ALL_ARTWORKS[10]; // Disney
  const rocket = ALL_ARTWORKS[15]; // Kids
  const heart = ALL_ARTWORKS[20]; // Study
  const shiba = ALL_ARTWORKS[26]; // Memes

  const progressPct = Math.min(100, Math.round((elapsedMs / TOTAL_DURATION_MS) * 100));

  return (
    <div
      data-testid="cinematic-intro"
      className="fixed inset-0 z-50 bg-[#090A0E] text-[#F4F1EA] overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Subtle atmospheric gallery backdrop visible softly from phase 4+ */}
      <img
        src={GALLERY_ASSETS.heroAtelier}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          phase >= 4 ? 'opacity-25' : 'opacity-0'
        }`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#090A0E]/85 via-[#090A0E]/60 to-[#090A0E]/95 pointer-events-none"
        aria-hidden="true"
      />

      {/* 60fps pigment particle & brushstroke canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Center Stage Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center min-h-[420px]">
        {/* Phase 1 (0-2s): First Brushstroke Opening */}
        {phase === 1 && (
          <div className="text-center transition-opacity duration-500">
            <p className="font-display text-lg sm:text-2xl tracking-[0.28em] text-[#E5C158] uppercase">
              A Blank Canvas Awaits
            </p>
            <p className="mt-3 text-sm text-[#9CA2B4] tracking-wide">
              Six worlds · Handcrafted lines · Living pigment
            </p>
          </div>
        )}

        {/* Phase 2 (2-4s): Crisp Sketch Line-Art Forming */}
        {phase === 2 && (
          <div className="flex flex-col items-center">
            <div className="w-56 sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#FAF8F3] p-1">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <ArtworkPreview artwork={ironMan} mode="sketch" />
              </div>
            </div>
            <p className="mt-5 font-display text-base sm:text-lg tracking-[0.22em] text-[#F4F1EA]">
              EVERY LINE TELLS A STORY
            </p>
          </div>
        )}

        {/* Phase 3 (4-6s): Six Artwork Styles Montage */}
        {phase === 3 && (
          <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3.5 w-full max-w-4xl">
              {[
                { label: 'Disney', art: castle },
                { label: 'Marvel', art: ironMan },
                { label: 'Cinema', art: heisenberg },
                { label: 'Kids Art', art: rocket },
                { label: 'Study Art', art: heart },
                { label: 'Viral Memes', art: shiba },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 transition-transform duration-500"
                >
                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/15 bg-[#141720] shadow-lg">
                    <ArtworkPreview artwork={item.art} mode="sketch" />
                  </div>
                  <span className="text-[11px] tracking-[0.14em] text-[#C8CDD9] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 font-display text-sm sm:text-base tracking-[0.22em] text-[#E5C158]">
              SIX CURATED UNIVERSES
            </p>
          </div>
        )}

        {/* Phase 4 (6-8s): Sketch Transforms into Vivid Colour + Editorial Showcase */}
        {phase === 4 && (
          <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
                <img
                  src={GALLERY_ASSETS.introFantasy}
                  alt="Enchanted fairy-tale castle illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
                <ArtworkPreview artwork={ironMan} mode="completed" />
              </div>
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
                <img
                  src={GALLERY_ASSETS.introCinema}
                  alt="Viking voyager cinematic illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
                <ArtworkPreview artwork={heart} mode="completed" />
              </div>
            </div>
            <p className="mt-6 font-display text-base sm:text-xl tracking-[0.22em] text-[#F4F1EA]">
              SKETCH TO LIVING COLOUR
            </p>
          </div>
        )}

        {/* Phase 5 (8-10.5s): Converge into COLORVERSE Brand Emblem */}
        {phase === 5 && (
          <div className="flex flex-col items-center text-center">
            <BrandLogoMark className="w-20 h-20 sm:w-24 sm:h-24 mb-5 drop-shadow-[0_12px_36px_rgba(212,175,55,0.28)]" />
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-[0.26em] text-[#F4F1EA]">
              COLORVERSE
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#D4AF37] tracking-[0.18em]">
              Every picture has a story.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Timeline & Controls */}
      <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between max-w-5xl mx-auto z-20">
        <div className="flex items-center gap-3">
          <div className="w-28 sm:w-40 h-1 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-100"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-[#8F96AA]">
            {Math.min(10, Math.floor(sec))}s / 10s
          </span>
        </div>

        <button
          type="button"
          data-start="true"
          onClick={triggerComplete}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-sm font-medium text-[#F4F1EA] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <span>{canSkipImmediately || phase === 5 ? 'Enter Gallery' : 'Skip Intro'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
