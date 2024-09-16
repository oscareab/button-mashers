import "../../../node_modules/jquery/dist/jquery.min.js"
import { Player } from './player.js'

export class Grid {
    constructor(width, height) {
        this.rows = Math.floor(height / 50);
        this.cols = Math.floor(width / 50);
        this.numSquares = this.rows * this.cols;

        this.colors = ['pink', 'blue', 'green', 'purp'];
        this.colorsLeft = [0, 0, 0, 0];

        this.player = new Player(this);
        
        this.levels = [["pink"], ["pink"], ["pink", "green"], ["pink", "green"], ["purp", "green"],];
        this.levelIndex = 0;
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

        if(this.colorsLeft.reduce((total, count) => total + count, 0) == 0) {
            // this.nextLevel();
            // console.log("next level");

            $("#grid").empty();
            this.fillRandom();
            return;
        }

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
                        this.player.playSynth(index);
                        break;
                    case 'green':
                        this.player.playBeat();
                        break;
                    case 'purp':
                        this.player.playBass();
                }
            }
        }
    }

    startLevels() {
        this.nextLevel();
    }

    nextLevel() {
        $("#grid").empty();

        if(this.levelIndex > this.levels.length) {
            return;
        }

        if(this.levels[this.levelIndex].length == 1) {
            this.fillColor(this.levels[this.levelIndex][0]);
        } else if(this.levels[this.levelIndex].length > 1 && this.levels[this.levelIndex].length < 4) {
            this.fillRandomSelection(this.levels[this.levelIndex]);
        } else {
            this.fillRandom();
        }

        this.levelIndex++;
    }

    getTotalSquaresLeft() {
        return this.colorsLeft.reduce((total, count) => total + count, 0);
    }
}