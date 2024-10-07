import "../../../node_modules/jquery/dist/jquery.min.js"
import { Player } from './player.js'
import  Levels  from './levels.js'

export class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rows = Math.floor(this.height / 50);
        this.cols = Math.floor(this.width / 50);
        this.numSquares = this.rows * this.cols;

        this.colors = ['pink', 'blue', 'green', 'purp'];
        this.colorsLeft = [0, 0, 0, 0];
        this.levels = Levels;

        this.player = new Player(this);
        this.levelIndex = 0;
        this.changeLevels = false;
    }

    halveWidth() {
        this.width = this.width / 2;
        $('#grid').width(this.width); 

        this.cols = Math.floor(this.width / 50);
        this.numSquares = this.rows * this.cols;

        $("#grid").empty();
    }

    halveHeight() {
        this.height = this.height / 2;
        $('#grid').height(this.height); 

        this.rows = Math.floor(this.height / 50);
        this.numSquares = this.rows * this.cols;
        
        $("#grid").empty();
    }

    fillRandom() {
        for (let i = 0; i < this.numSquares; i++) {
            let index = Math.floor(Math.random() * this.colors.length);
            let color = this.colors[index]
            this.colorsLeft[index]++;

            $("#grid").append(`<div class="bg-${color} w-[50px] h-[50px] m-0 border-black border-2"></div>`);
        }
    }

    fillColor(color) {
        for (let i = 0; i < this.numSquares; i++) {
            let index = this.colors.indexOf(color);
            this.colorsLeft[index]++;

            $("#grid").append(`<div class="bg-${color} w-[50px] h-[50px] m-0 border-black border-2"></div>`);
        }
    }

    fillRandomSelection(colors) {
        for (let i = 0; i < this.numSquares; i++) {
            let index = Math.floor(Math.random() * colors.length);
            let color = colors[index]
            this.colorsLeft[this.colors.indexOf(color)]++;

            $("#grid").append(`<div class="bg-${color} w-[50px] h-[50px] m-0 border-black border-2"></div>`);
        }
    }

    killAndPlay(color) {
        if (this.colorsLeft.reduce((total, count) => total + count, 0) == 0) {
            if (this.changeLevels) {
                this.changeLevels = false;
                this.levelIndex++;
                this.nextLevel();
                return;
            } else {
                this.drawLevel();
                return;
            }
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
                button.attr('class', `w-[50px] h-[50px] killed`);

                this.colorsLeft[this.colors.indexOf(color)]--;
                killed = true;

                switch (color) {
                    case 'pink':
                        this.player.playSynth(index);
                        break;
                    case 'green':
                        this.player.playBeat();
                        break;
                    case 'purp':
                        this.player.playBass(index);
                        break;
                    case 'blue':
                        this.player.playTwinkle();
                        break;
                }
            }
        }
    }

    startLevels() {
        this.nextLevel();
    }

    nextLevel() {
        if (this.levelIndex > this.levels.length - 1) {
            return;
        }

        this.playNextLevelSound();
        this.drawLevel(this.levels[this.levelIndex]);

        setTimeout(() => {
            this.changeLevels = true;
        }, this.levels[this.levelIndex].time);

        this.playNextLevelSound();
    }

    drawLevel() {
        $("#grid").empty();

        let level = this.levels[this.levelIndex];
        let colors = level.colors;
        let sizeChange = level.sizeChange;
 
        if(sizeChange) {
            if(sizeChange == 'halveWidth') {
                this.halveWidth();
            } else {
                this.halveHeight();
            }
        }

        if(colors.length == 1) {
            this.fillColor(level.colors[0]);
        } else if (colors.length < 4) {
            this.fillRandomSelection(colors);
        } else {
            this.fillRandom();
        }
    }

    playNextLevelSound() {
        this.player.playNextLevelSound();
    }
}