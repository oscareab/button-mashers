import '/node_modules/tone/build/Tone.js';

export class Percussion {
    constructor() {
        this.clickSynth = new Tone.MembraneSynth({
            pitchDecay: 0.01,
            octaves: 4,
            envelope: {
                attack: 0.001,
                decay: 0.05,
                sustain: 0,
                release: 0.01
            }
        }).toDestination();

        this.pitches = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"];
    }

    play() {
        let pitch = this.pitches[Math.floor(Math.random() * this.pitches.length)];

        this.clickSynth.triggerAttackRelease(pitch, "16n");
    }
}