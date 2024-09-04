
class Synth {
    constructor() {
        this.panner = new Tone.PanVol().toDestination();

        this.synth = new Tone.Synth({
            oscillator: {
                type: 'sine'
            },
            envelope: {
                attack: 0.005,
                decay: 0.6,
                sustain: 0.01,
                release: 1.4,
            }
            
        }).connect(this.panner);
    }

    play(row, col, rows, cols) {
        let pan = ((col / cols) * 2) - 1;
        this.panner.pan.value = pan;
        let freq = (1 - (row / rows)) * 500 + 200;

        this.synth.triggerAttackRelease(freq, "8n");
    }
}
