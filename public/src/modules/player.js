import '../../../node_modules/tone/build/Tone.js';

import { Synth } from './synth.js';
import { KickDrum } from './kick.js';
import { HighHat } from './highhat.js';
import { Snare } from './snare.js';

export class Player {
    constructor(grid) {
        this.synth = new Synth();
        this.kick = new KickDrum();
        this.hats = new HighHat();
        this.snare = new Snare();

        this.meter = new Tone.Meter();
        this.beat = [['h', 'k'], 'h', 'h', ['h', 'k'],
            's', 'h', 'h', ['h', 'k'],
            'h', ['h', 'k'], 'h', ['h', 'k'],
            's', 'h', 'h', 'h'];
        this.beatIndex = 0;

        this.grid = grid;

        this.initMeter()
    }

    initMeter() {
        this.synth.connect(this.meter);
        this.kick.connect(this.meter);
        this.hats.connect(this.meter);
        this.snare.connect(this.meter);

        this.meter.toDestination();
    }

    getLevel() { 
        return this.meter.getValue();
    }


    playSynth(index) {
        index = index - 1;

        // Check if the grid has valid dimensions
        if (!this.grid || this.grid.rows <= 0 || this.grid.cols <= 0) {
            console.error("Grid rows or columns are invalid", this.grid);
            return;
        }

        // Check if index is valid
        if (index < 0 || index >= this.grid.rows * this.grid.cols) {
            console.error("Invalid index", index);
            return;
        }

        // Calculate row and column
        let row = Math.floor(index / this.grid.cols); // Use cols instead of rows to map properly
        let col = index % this.grid.cols;

        // Calculate pan (-1 to 1)
        let pan = ((col / this.grid.cols) * 2) - 1;

        // Define the maximum frequency for the first row
        const maxFreq = 1661.22; // Change this value as needed to set the desired first row frequency

        // Calculate frequency based on row
        let freq;
        if (this.grid.rows > 1) {
            freq = maxFreq - ((maxFreq - 110) / (this.grid.rows - 1)) * row;
        } else {
            freq = maxFreq; // If there's only one row, set it to maxFreq
        }

        // Ensure frequency is valid
        if (freq <= 0) {
            console.error("Calculated frequency is invalid", freq);
            return;
        }

        // Get the closest frequency in 19-TET
        let closestFreq = this.closestFreq(freq);

        // Play the synth with the calculated frequency and pan
        this.synth.play(closestFreq, pan);
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

    closestFreq(freq) {
        let baseFreq = 110;

        let n = Math.log2(freq / baseFreq) * 19;
        let n_floor = Math.floor(n);

        return baseFreq * Math.pow(2, n_floor / 19);
    }
}