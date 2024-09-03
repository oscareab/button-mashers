
class Synth {
    constructor() {
        this.panner = new Tone.PanVol().toDestination();

        this.synth = new Tone.Synth({
            oscillator: {
                type: 'sine'
            },
            
        }).connect(this.panner);
    }

    play(row, col) {
        let pan = (col / cols) * 2 - 1;
        let freq = row * 100 + 100;
        this.panner.pan = pan;

        this.synth.triggerAttackRelease(freq, "8n");
    }
}
