import "../../../node_modules/jquery/dist/jquery.min.js"
import { Player } from './player.js'

export class Grid {
    constructor(width, height) {
        this.rows = Math.floor(height / 50);;
        this.cols = Math.floor(width / 50);;
        this.numSquares = this.rows * this.cols;

        this.colors = ['pink', 'blue', 'green', 'purp'];
        this.colorsLeft = [0, 0, 0, 0];

        this.player = new Player();
    }

    fillRandom() {
        for (let i = 0; i < this.numSquares; i++) {
            let index = Math.floor(Math.random() * this.colors.length);
            let color = this.colors[index]
            this.colorsLeft[index]++;

            $("#grid").append(`<div class="bg-${color} btn hover:bg-${color} active:bg-white w-[50px] h-[50px]"></div>`)
        }
    }

    fillColor(color) {
        for (let i = 0; i < this.numSquares; i++) {
            let index = this.colors.indexOf(color);
            this.colorsLeft[index]++;

            $("#grid").append(`<div class="bg-${color} btn hover:bg-${color} active:bg-white w-[50px] h-[50px]"></div>`)
        }
    }

    fillRandomSelection(colors) {
        for (let i = 0; i < this.numSquares; i++) {
            let index = Math.floor(Math.random() * colors.length);
            let color = colors[index]
            this.colorsLeft[this.colors.indexOf(color)]++;

            $("#grid").append(`<div class="bg-${color} btn hover:bg-${color} active:bg-white w-[50px] h-[50px]"></div>`)
        }
    }

    killAndPlay(color) {
        if (this.colorsLeft[this.colors.indexOf(color)] <= 0) {
            return;
        }

        let killed = false;
        while (!killed) {
            let index = Math.floor(Math.random() * this.numSquares);
            const button = $('#grid').children().eq(index - 1);
            let classes = button.attr('class').split(/\s+/);

            if (classes[0] == `bg-${color}`) {
                button.attr('class', `btn bg-transparent border-0 hover:bg-transparent w-[50px] h-[50px]`)

                this.colorsLeft[this.colors.indexOf(color)]--;
                killed = true;

                switch(color) {
                    case 'pink':
                        this.playSynth(index);
                        break;
                    case 'green':
                        this.playBeat();
                        break;
                }
            }
        }
    }

    playSynth(index) {
        index = index - 1;
        let row = Math.floor(index / this.rows);
        let col = index % this.cols;

        let pan = ((col / this.cols) * 2) - 1;
        let freq = (1 - (row / this.rows)) * 500 + 600;

        this.player.playSynth(freq, pan);
    }

    playBeat() {
        this.player.playBeat(); 
    }

    getTotalSquaresLeft() {
        return this.colorsLeft.reduce((total, count) => total + count, 0);
    }
}