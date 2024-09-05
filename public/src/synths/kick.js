import '/node_modules/tone/build/Tone.js';
export class KickDrum {
    constructor() {
        this.filter = new Tone.Filter({
            type: 'lowpass',
            frequency: 500,
            Q: 10
        }).toDestination();

        this.kickDist = new Tone.BitCrusher(14).connect(this.filter);

        this.membrane = new Tone.MembraneSynth({
            frequency: 50,
            pitchDecay: 0.05,
            octaves: 7,
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
        }).connect(this.kickDist);
    }

    play() {
        this.membrane.triggerAttackRelease("C2", "16n");
    }
}
