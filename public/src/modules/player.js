import '../../../node_modules/tone/build/Tone.js';

import { Synth } from './synth.js';
import { KickDrum } from './kick.js';
import { HighHat } from './highhat.js';
import { Snare } from './snare.js';

export class Player {
    constructor() {
        this.synth = new Synth();
        this.kick = new KickDrum();
        this.hats = new HighHat();
        this.snare = new Snare();
        this.beat = [['h', 'k'], 'h', 'h', ['h', 'k'],
            's', 'h', 'h', ['h', 'k'],
            'h', ['h', 'k'], 'h', ['h', 'k'],
            's', 'h', 'h', 'h'];
        this.beatIndex = 0;
    }

    playSynth(freq, pan) {
        this.synth.play(freq, pan);
    }

    playBeat() {
        let notes = this.beat[this.beatIndex % this.beat.length];

        for (const note of notes) {
            switch (note) {
                case 'k':
                    this.kick.play();
                    break;
                case 'h':
                    this.hats.play();
                    break;
                case 's':
                    this.snare.play();
                    break;
            }
        }
        this.beatIndex++;
    }
}