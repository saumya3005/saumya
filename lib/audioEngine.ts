'use client';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private oscGain: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private initialized = false;

  constructor() {}

  public init() {
    if (this.initialized) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.015, this.ctx.currentTime); // keep it very subtle

      // Resonant Lowpass Filter for cinematic deep hum
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(80, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      // Deep Hum Oscillator
      this.osc = this.ctx.createOscillator();
      this.osc.type = 'triangle';
      this.osc.frequency.setValueAtTime(45, this.ctx.currentTime); // 45Hz sub bass rumble

      this.oscGain = this.ctx.createGain();
      this.oscGain.gain.setValueAtTime(0.6, this.ctx.currentTime);

      // Connect Hum
      this.osc.connect(this.oscGain);
      this.oscGain.connect(this.filter);

      // Procedural Space Noise (ScriptProcessor as fallback for simplicity & 100% compatibility)
      const bufferSize = 4096;
      if (this.ctx.createScriptProcessor) {
        this.noiseNode = this.ctx.createScriptProcessor(bufferSize, 1, 1);
        let lastOut = 0.0;
        this.noiseNode.onaudioprocess = (e) => {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            // Brownian/Red Noise generation for a deep wind effect
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // Amplify slightly before filtering
          }
        };

        this.noiseGain = this.ctx.createGain();
        this.noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

        this.noiseNode.connect(this.noiseGain);
        this.noiseGain.connect(this.filter);
      }

      // Final chain
      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.osc.start(0);
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public update(velocity: number) {
    if (!this.initialized || !this.ctx || !this.filter || !this.masterGain) return;

    const targetFreq = 80 + Math.min(250, Math.abs(velocity) * 800);
    const targetQ = 4.0 + Math.min(6, Math.abs(velocity) * 12);
    const targetGain = 0.015 + Math.min(0.035, Math.abs(velocity) * 0.1);

    const now = this.ctx.currentTime;
    
    // Smooth transition to prevent clicks
    this.filter.frequency.setTargetAtTime(targetFreq, now, 0.15);
    this.filter.Q.setTargetAtTime(targetQ, now, 0.2);
    this.masterGain.gain.setTargetAtTime(targetGain, now, 0.25);

    if (this.osc) {
      // Modulate sub frequency slightly based on motion intensity
      const targetOscFreq = 45 + Math.min(15, Math.abs(velocity) * 45);
      this.osc.frequency.setTargetAtTime(targetOscFreq, now, 0.25);
    }
  }

  public stop() {
    if (!this.initialized || !this.ctx || !this.masterGain) return;
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
  }
}

export const audioEngine = new AudioEngine();
