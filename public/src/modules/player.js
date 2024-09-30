import '../../../node_modules/tone/build/Tone.js';

import { Synth } from './synth.js';
import { KickDrum } from './kick.js';
import { HighHat } from './highhat.js';
import { Snare } from './snare.js';
import { Bass } from './bass.js';
import { Twinkle } from './twinkle.js';

export class Player {
    constructor(grid) {
        this.synth = new Synth();
        this.kick = new KickDrum();
        this.hats = new HighHat();
        this.snare = new Snare();
        this.bass = new Bass();
        this.twinkle = new Twinkle();
        this.player = new Tone.Player().toDestination();

        this.beat = [
            ['h', 'k'], 'h',['h', 'k'], 'h', ['h', 'k', 's'], 'h', 'h', 's', ['h', 'k'], 's', ['h', 'k'], 'h', ['h', 'k', 's'], 'h', 'h', 'h']
        this.beatIndex = 0;

        this.grid = grid;
    }

    getLevel() { 
        return this.meter.getValue();
    }


    playSynth(index) {
        index = index - 1;

        if (!this.grid || this.grid.rows <= 0 || this.grid.cols <= 0) {
            console.error("Grid rows or columns are invalid", this.grid);
            return;
        }

        if (index < 0 || index >= this.grid.rows * this.grid.cols) {
            console.error("Invalid index", index);
            return;
        }

        let row = Math.floor(index / this.grid.cols); 
        let col = index % this.grid.cols;

        let pan = ((col / this.grid.cols) * 2) - 1;

        const maxFreq = 1661.22; 

        let freq;
        if (this.grid.rows > 1) {
            freq = maxFreq - ((maxFreq - 110) / (this.grid.rows - 1)) * row;
        } else {
            freq = maxFreq;
        }

        if (freq <= 0) {
            console.error("Calculated frequency is invalid", freq);
            return;
        }

        let closestFreq = this.closestSynthFreq(freq);
        this.synth.play(closestFreq, pan);
    }

    closestSynthFreq(freq) {
        let baseFreq = 440;

        let n = Math.log2(freq / baseFreq) * 19;
        let n_floor = Math.floor(n);

        return baseFreq * Math.pow(2, n_floor / 19);
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

    playBass(index) {
        index = index - 1;

        if (!this.grid || this.grid.rows <= 0 || this.grid.cols <= 0) {
            console.error("Grid rows or columns are invalid", this.grid);
            return;
        }

        if (index < 0 || index >= this.grid.rows * this.grid.cols) {
            console.error("Invalid index", index);
            return;
        }

        let row = Math.floor(index / this.grid.cols); 
        row = this.grid.rows - 1 - row;
        let col = index % this.grid.cols;

        let pan = ((col / this.grid.cols) * 2) - 1;

        let pitches = ["G", "A", "B", "D", "E"];
        let pitch = pitches[row % pitches.length];

        let octave = Math.floor(row / pitches.length);
        if(pitch == "G" || pitch == "A") {
            octave += 1;
        } else {
            octave += 2;
        }

        
        this.bass.play(pitch + octave, pan);
    }

    playTwinkle() {
        this.twinkle.play();
    }

    playNextLevelSound() {
        const player = this.player;
        player.load("assets/cassette.mp3").then(() => {
            player.start();
        })
    }
}