import '/node_modules/tone/build/Tone.js';

export class Twinkle {
    constructor() {
        this.synth = new Tone.Synth({
            oscillator: {
                type: 'triangle',
            },
            envelope: {
                attack: 0.05,
                decay: 0.2,
                sustain: 0.3,
                release: 1
            }, 
            volume: -10
        }).toDestination();

        this.reverb = new Tone.Reverb({
            decay: 2, 
            wet: 0.5  
        }).toDestination();

        this.delay = new Tone.FeedbackDelay({
            delayTime: '16n',
            feedback: 0.2,
            wet: 0.5         
        }).toDestination();

        this.synth.chain(this.reverb, this.delay);

        this.pitches = ['A5', 'E6', 'G6', 'F#6', 'A6']
    }

    play() {
        let pitch = this.pitches[Math.floor(Math.random() * this.pitches.length)];
        this.synth.triggerAttackRelease(pitch, '8n');
    }
}
