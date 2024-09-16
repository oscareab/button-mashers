import '/node_modules/tone/build/Tone.js';
export class Bass {
    constructor() {
        this.autoPan = new Tone.AutoPanner(3).toDestination().start();
        this.verb = new Tone.Reverb(2).connect(this.autoPan);

        this.bass = new Tone.MonoSynth({
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.01, 
                decay: 0.01,
                sustain: 1,
                release: 0.5
            }, 
            filter: {
                Q: 25,
                type: "lowpass"
            },
        }).connect(this.verb);
    }

    play() {
        let freq = Math.random() * (100) + 100;
        console.log(freq);
        this.bass.triggerAttackRelease(freq, "4n");
    }

    connect(destination) {
        this.autoPan.connect(destination);
    }
}