// Procedural Web Audio API synthesizer and subtle haptics controller for COLORVERSE.
// Works 100% offline with zero external audio dependencies and soft envelope limiting.

const PENTATONIC_HZ = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled = true;
  private hapticsEnabled = true;
  private ambientEnabled = false;
  private ambientNodes: { oscA: OscillatorNode; oscB: OscillatorNode; gain: GainNode } | null = null;
  private lastSoundTime = 0;

  public configure(opts: { soundEnabled: boolean; ambientEnabled: boolean; hapticsEnabled: boolean }) {
    this.soundEnabled = opts.soundEnabled;
    this.hapticsEnabled = opts.hapticsEnabled;
    this.ambientEnabled = opts.ambientEnabled;

    if (!this.soundEnabled || !this.ambientEnabled) {
      this.stopAmbient();
    } else if (this.ctx && this.ctx.state === 'running') {
      this.startAmbient();
    }
  }

  private ensureContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    if (typeof window === 'undefined') return null;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      try {
        this.ctx = new AudioCtx();
      } catch {
        return null;
      }
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.ambientEnabled && !this.ambientNodes) {
      this.startAmbient();
    }

    return this.ctx;
  }

  private canTrigger(minGapMs = 28): boolean {
    const now = performance.now();
    if (now - this.lastSoundTime < minGapMs) return false;
    this.lastSoundTime = now;
    return true;
  }

  public vibrate(pattern: number | number[]) {
    if (!this.hapticsEnabled) return;
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(pattern);
      }
    } catch {
      // Haptics unsupported on this browser/device
    }
  }

  public startAmbient() {
    if (!this.soundEnabled || !this.ambientEnabled || this.ambientNodes) return;
    const ctx = this.ctx;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 1.8);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, now);

      const oscA = ctx.createOscillator();
      oscA.type = 'sine';
      oscA.frequency.setValueAtTime(130.81, now); // C3

      const oscB = ctx.createOscillator();
      oscB.type = 'triangle';
      oscB.frequency.setValueAtTime(196.0, now); // G3

      oscA.connect(filter);
      oscB.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      oscA.start(now);
      oscB.start(now);

      this.ambientNodes = { oscA, oscB, gain };
    } catch {
      // Ignore audio errors
    }
  }

  public stopAmbient() {
    if (!this.ambientNodes || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const { oscA, oscB, gain } = this.ambientNodes;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      oscA.stop(now + 0.4);
      oscB.stop(now + 0.4);
    } catch {
      // Ignore cleanup errors
    }
    this.ambientNodes = null;
  }

  public playTap() {
    this.vibrate(8);
    if (!this.canTrigger(25)) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.045);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  }

  public playCategorySwitch() {
    this.vibrate(10);
    if (!this.canTrigger(40)) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.exponentialRampToValueAtTime(495, now + 0.08);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playSwatchSelect(colorId: number) {
    this.vibrate(10);
    if (!this.canTrigger(30)) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freq = PENTATONIC_HZ[(colorId - 1) % PENTATONIC_HZ.length];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.085, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.19);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playPaintFill(progressRatio: number) {
    this.vibrate(14);
    if (!this.canTrigger(25)) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Soft watercolor brush swish (filtered noise burst)
    const bufferSize = Math.floor(ctx.sampleRate * 0.075);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400 + progressRatio * 900, now);
    filter.Q.setValueAtTime(1.4, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.045, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 2. Ascending resonant droplet tone mapped to completion progress
    const noteIndex = Math.min(
      PENTATONIC_HZ.length - 1,
      Math.floor(progressRatio * PENTATONIC_HZ.length),
    );
    const baseFreq = PENTATONIC_HZ[noteIndex];
    const pitchJitter = 0.98 + Math.random() * 0.04;

    const osc = ctx.createOscillator();
    const toneGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 0.85 * pitchJitter, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * pitchJitter, now + 0.06);

    toneGain.gain.setValueAtTime(0.001, now);
    toneGain.gain.linearRampToValueAtTime(0.095, now + 0.015);
    toneGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.24);

    osc.connect(toneGain);
    toneGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playWrongRegion() {
    this.vibrate([12, 30, 12]);
    if (!this.canTrigger(80)) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(135, now + 0.09);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playColorComplete() {
    this.vibrate([14, 24, 18]);
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 783.99]; // C5 -> G5 sparkling fifth
    notes.forEach((hz, idx) => {
      const start = now + idx * 0.075;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(hz, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.085, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.34);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.36);
    });
  }

  public playUndo() {
    this.vibrate(10);
    if (!this.canTrigger(40)) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.11);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  public playLevelComplete() {
    this.vibrate([20, 45, 25, 45, 45]);
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Warm cinematic C major 9 arpeggio
    const chord = [261.63, 329.63, 392.0, 493.88, 587.33, 783.99];
    chord.forEach((hz, idx) => {
      const start = now + idx * 0.085;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(hz, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.08, start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.95);
    });
  }

  public playUnlock() {
    this.vibrate([15, 30, 22]);
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25];
    notes.forEach((hz, idx) => {
      const start = now + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(hz, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.07, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.38);
    });
  }
}

export const soundEngine = new SoundEngine();
