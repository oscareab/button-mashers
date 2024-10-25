import '/node_modules/tone/build/Tone.js';

export class Snare {
    constructor() {
        this.snareDist = new Tone.BitCrusher(16).toDestination();

        this.noise = new Tone.NoiseSynth({
            noise: {
                type: "white",
            },
            envelope: {
                attack: 0.001,
                decay: 0.2,
                sustain: 0,
                release: 0.1
            }
        }).connect(this.snareDist);

        this.metal = new Tone.MetalSynth({
            frequency: 200,
            envelope: {
                attack: 0.001,
                decay: 0.2,
                release: 0.2
            },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).connect(this.snareDist);

        this.membrane = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 4,
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.001,
                decay: 0.4,
                sustain: 0.01,
                release: 1.4,
                attackCurve: "exponential"
            }
        }).connect(this.snareDist);
    }

    play() {
        this.noise.triggerAttackRelease("16n");
        this.metal.triggerAttackRelease("16n");
        this.membrane.triggerAttackRelease("C2", "16n");
    }

    connect(destination) {
        this.snareDist.connect(destination);
    }
}
