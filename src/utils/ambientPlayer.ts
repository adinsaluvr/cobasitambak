/**
 * Ambient Tambak Soundscape & Background Music Synthesizer
 * Uses Web Audio API to generate realistic looping ambient environmental sounds
 * of Sidoarjo brackish-water tambak:
 * 1. Gentle water ripples and pond lap waves (bandeng & udang movement)
 * 2. Soft coastal / mangrove breeze
 * 3. Occasional playful water drops and bubbles
 * 4. Harmonious, soothing game background melody in Pentatonic / Gamalan-inspired scale
 */

class AmbientPlayer {
  private ctx: AudioContext | null = null;
  public isPlaying: boolean = false;
  public ambientMode: 'full' | 'ambient-only' = 'full';
  private masterGain: GainNode | null = null;
  private timerIds: number[] = [];
  private activeNodes: (AudioNode | { stop: () => void })[] = [];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public start() {
    if (this.isPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.isPlaying = true;
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
    // Smooth fade in
    this.masterGain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 1.5);
    this.masterGain.connect(ctx.destination);

    // 1. Start continuous gentle breeze and water flow
    this.startWaterAndWind(ctx, this.masterGain);

    // 2. Start gentle water ripples and splashes (looping interval)
    this.startRandomPondRipples(ctx, this.masterGain);

    // 3. Start calming acoustic melodic loop (xylophone / marimba / gamelan chime feel)
    this.startCalmMelodyLoop(ctx, this.masterGain);
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    // Clear all interval timers
    this.timerIds.forEach(id => window.clearTimeout(id));
    this.timerIds = [];

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        this.activeNodes.forEach(node => {
          try {
            if ('stop' in node && typeof node.stop === 'function') {
              node.stop();
            }
          } catch {
            // Ignore already stopped nodes
          }
        });
        this.activeNodes = [];
        this.masterGain = null;
      }, 850);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  /**
   * Generates pink/brown noise filtered to mimic gentle coastal tambak wind & water movement
   */
  private startWaterAndWind(ctx: AudioContext, destination: AudioNode) {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Brown noise for smooth water murmur
      lastOut = output[i];
      output[i] *= 2.5;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass filter for gentle water current
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 320;
    filter.Q.value = 1.2;

    // LFO to modulate filter frequency like rolling pond waves
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.25; // 4 seconds wave cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 150;
    lfo.connect(filter.frequency);

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.12; // Gentle backdrop level

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);

    whiteNoise.start();
    lfo.start();

    this.activeNodes.push(whiteNoise, lfo);
  }

  /**
   * Intermittent gentle water bubbles and fish jumps in the tambak
   */
  private startRandomPondRipples(ctx: AudioContext, destination: AudioNode) {
    const scheduleNextRipple = () => {
      if (!this.isPlaying) return;

      const now = ctx.currentTime;
      // Play a tiny water drop or soft bubble
      const osc = ctx.createOscillator();
      const dropGain = ctx.createGain();

      const freqStart = 350 + Math.random() * 300;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, now);
      osc.frequency.exponentialRampToValueAtTime(freqStart * 1.8, now + 0.08);

      dropGain.gain.setValueAtTime(0.06, now);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(dropGain);
      dropGain.connect(destination);

      osc.start(now);
      osc.stop(now + 0.13);

      // Schedule next ripple in 1.5 - 3.8 seconds
      const nextDelay = 1500 + Math.random() * 2300;
      const timer = window.setTimeout(scheduleNextRipple, nextDelay);
      this.timerIds.push(timer);
    };

    scheduleNextRipple();
  }

  /**
   * Soothing, joyful game melody loop matching peaceful morning at Sidoarjo tambak
   * Notes: G4, A4, B4, D5, E5 (Pentatonic warmth)
   */
  private startCalmMelodyLoop(ctx: AudioContext, destination: AudioNode) {
    // Frequencies: G4 (392), A4 (440), B4 (493.88), D5 (587.33), E5 (659.25), G5 (783.99)
    const melodyPattern = [
      { note: 392.00, dur: 0.6, rest: 0.2 }, // G4
      { note: 440.00, dur: 0.4, rest: 0.2 }, // A4
      { note: 493.88, dur: 0.6, rest: 0.4 }, // B4
      { note: 587.33, dur: 0.8, rest: 0.3 }, // D5
      { note: 493.88, dur: 0.4, rest: 0.2 }, // B4
      { note: 659.25, dur: 0.7, rest: 0.5 }, // E5
      { note: 587.33, dur: 0.6, rest: 0.4 }, // D5
      { note: 392.00, dur: 1.0, rest: 1.2 }, // G4 resolve
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlaying) return;

      const item = melodyPattern[noteIdx];
      const now = ctx.currentTime;

      // Soft marimba-like bell tone
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.note, now);

      // Subtle upper harmonic
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(item.note * 2, now);

      noteGain.gain.setValueAtTime(0.07, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + item.dur);

      osc.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + item.dur);
      osc2.stop(now + item.dur);

      noteIdx = (noteIdx + 1) % melodyPattern.length;
      const nextDelayMs = (item.dur + item.rest) * 1000;
      const timer = window.setTimeout(playNextNote, nextDelayMs);
      this.timerIds.push(timer);
    };

    playNextNote();
  }
}

export const ambientPlayer = new AmbientPlayer();
