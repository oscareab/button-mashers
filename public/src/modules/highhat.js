import '/node_modules/tone/build/Tone.js';
export class HighHat {
    constructor() {
        this.hatDist = new Tone.BitCrusher(13).toDestination();

        this.hatNoise = new Tone.NoiseSynth({
            noise: {
                type: "white",
            },
            envelope: {
                attack: 0.001,
                decay: 0.05,
                sustain: 0,
                release: 0.01
            }
        }).connect(this.hatDist);

        this.hatMetal = new Tone.MetalSynth({
            frequency: 1600,
            envelope: {
                attack: 0.001,
                decay: 0.1,
                release: 0.01
            },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 8000,
            octaves: 1.5
        }).connect(this.hatDist);
    }

    play() {
        this.hatNoise.triggerAttackRelease("16n");
        this.hatMetal.triggerAttackRelease("16n");
    }

    connect(destination) {
        this.hatDist.connect(destination);
    }
}