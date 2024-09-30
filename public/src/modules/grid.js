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

        this.levels = [
            [30000, "pink"], 
            [30000, "pink", "green"], 
            [30000, "purp"], 
            [30000, "purp", 'green'], 
            [30000, 'pink', 'green', 'purp'], 
            [30000, 'blue'], 
            [30000, 'blue', 'purp'], 
            [30000, 'blue', 'pink', 'purp'],
            [20000, 'green']
            [40000, 'blue', 'pink', 'purp', 'green']
            [20000, 'pink', 'purp', 'green']
            [20000, 'pink', 'green']
            [20000, 'pink']
        ];
        this.levelIndex = 0;
        this.changeLevels = false;
    }

    fillRandom() {
        for (let i = 0; i < this.numSquares; i++) {
            let index = Math.floor(Math.random() * this.colors.length);
            let color = this.colors[index]
            this.colorsLeft[index]++;

            $("#grid").append(`<div class="bg-${color} w-[50px] h-[50px] m-0 border-black border-2"></div>`)
        }
    }

    fillColor(color) {
        for (let i = 0; i < this.numSquares; i++) {
            let index = this.colors.indexOf(color);
            this.colorsLeft[index]++;

            $("#grid").append(`<div class="bg-${color} w-[50px] h-[50px] m-0 border-black border-2"></div>`)
        }
    }

    fillRandomSelection(colors) {
        for (let i = 0; i < this.numSquares; i++) {
            let index = Math.floor(Math.random() * colors.length);
            let color = colors[index]
            this.colorsLeft[this.colors.indexOf(color)]++;

            $("#grid").append(`<div class="bg-${color} w-[50px] h-[50px] m-0 border-black border-2"></div>`)
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
        if (this.levelIndex > this.levels.length) {
            return;
        }

        this.playNextLevelSound();
        this.drawLevel(this.levels[this.levelIndex]);

        setTimeout(() => {
            this.changeLevels = true;
            console.log('changed to: ', this.changeLevels);
        }, this.levels[this.levelIndex][0]);

        this.playNextLevelSound();
    }

    drawLevel() {
        $("#grid").empty();

        if (this.levels[this.levelIndex].length == 2) {
            this.fillColor(this.levels[this.levelIndex][1]);
        } else if (this.levels[this.levelIndex].length > 2 && this.levels[this.levelIndex].length < 5) {
            let currLevel = this.levels[this.levelIndex].slice(1);
            this.fillRandomSelection(currLevel);
        } else {
            this.fillRandom();
        }
    }

    playNextLevelSound() {
        this.player.playNextLevelSound();
    }
}