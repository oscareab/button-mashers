import '/node_modules/tone/build/Tone.js';
export class Bass {
    constructor() {
        this.volume = new Tone.Volume(1).toDestination();
        this.delay = new Tone.FeedbackDelay("16n", 0.5).connect(this.volume);
        this.panner = new Tone.PanVol().connect(this.delay);
        this.bass = new Tone.Synth({
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.05,
                decay: 0.1,
                sustain: 0,
                release: 1
            },
            filter: {
                Q: 2,
                type: "lowpass",
                frequency: 2000,
            },
        }).connect(this.panner);
    }

    play(pitch, pan) {
        this.panner.pan.value = pan;
        this.bass.triggerAttackRelease(pitch, "4n");
    }

    connect(destination) {
        this.autoPan.connect(destination);
    }
}