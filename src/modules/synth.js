import '/node_modules/tone/build/Tone.js';

export class Synth {
    constructor(grid) {
        this.grid = grid;
        const dist = new Tone.Distortion(0.8).toDestination();
        this.panner = new Tone.PanVol().connect(dist);   
        this.synth = new Tone.Synth({
            oscillator: {
                type: 'triangle'
            },
            envelope: {
                attack: 0.005,
                decay: 0.6,
                sustain: 0.01,
                release: 1.4,
            }, 
            
            
        }).connect(this.panner);
    }

    play(freq, pan) {
        const freqMod = Math.random() * 50;

        this.panner.pan.value = pan;
        this.synth.triggerAttackRelease(freq + freqMod, "8n");
    }

    connect(destination) {
        this.verb.connect(destination);
    }
}
