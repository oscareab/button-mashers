import "/node_modules/jquery/dist/jquery.js";

import { Player } from './player.js'
import { Levels } from './levels.js'

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

        if (this.levels[this.levelIndex].reverse) {
            this.killReverse(color);
            return;
        }

        this.kill(color);
    }

    kill(color) {
        let killed = false;
        while (!killed) {
            let index = Math.floor(Math.random() * this.numSquares);
            const button = $('#grid').children().eq(index - 1);
            let classes = button.attr('class').split(/\s+/);

            if (classes[0] == `bg-${color}`) {
                button.attr('class', `w-[50px] h-[50px] killed`);

                this.colorsLeft[this.colors.indexOf(color)]--;
                killed = true;

                this.play(color, index);
            }
        }
    }

    killReverse(color) {
        let killed = false;
        while (!killed) {
            let index = Math.floor(Math.random() * this.numSquares);
            const button = $('#grid').children().eq(index - 1);
            let classes = button.attr('class').split(/\s+/);

            if (classes[0] == color) {
                button.replaceWith(`<div id="replaced-${index}" class="bg-${color} w-[50px] h-[50px] m-0 border-black border-2 killed"></div>`);
                const replacedButton = $(`#replaced-${index}`);

                this.colorsLeft[this.colors.indexOf(color)]--;
                killed = true;

                this.play(color, index);
                setTimeout(() => {
                    replacedButton.toggleClass('killed');
                }, 1000);
            }
        }
    }

    play(color, index) {
        switch (color) {
            case 'pink':
                this.player.playSynth(index);
                break;
            case 'green':
                this.player.playPerc();
                break;
            case 'purp':
                this.player.playBass(index);
                break;
            case 'blue':
                this.player.playTwinkle();
                break;
        }
    }

    reverseLevel() {
        for (let i = 0; i < this.numSquares; i++) {
            let index = Math.floor(Math.random() * this.colors.length);
            let color = this.colors[index]
            this.colorsLeft[this.colors.indexOf(color)]++;
            $('#grid').append(`<div class="${color} w-[50px] h-[50px]"></div>`);
        }
    }

    afterReverseLevel() {
        let children = $("#grid").children()

        for (const child of children) {
            let classes = $(child).attr('class').split(/\s+/);
            let color = classes[0].substring(3);
            this.colorsLeft[this.colors.indexOf(color)]++;
        }
    }

    startLevels() {
        this.nextLevel();
    }

    nextLevel() {
        if (this.levelIndex > this.levels.length - 1) {
            return;
        }

        setTimeout(() => {
            this.changeLevels = true;
        }, this.levels[this.levelIndex].time);

        this.drawLevel(this.levels[this.levelIndex]);
    }

    drawLevel() {
        let level = this.levels[this.levelIndex];
        let colors = level.colors;
        let sizeChange = level.sizeChange;
        let reverse = level.reverse;
        let afterReverse = level.afterReverse;

        if (sizeChange) {
            if (sizeChange == 'halveWidth') {
                this.halveWidth();
            } else {
                this.halveHeight();
            }
        }

        if (afterReverse) {
            this.afterReverseLevel();
            level.afterReverse = false;
            return;
        }

        $("#grid").empty();

        if (reverse) {
            this.reverseLevel();
            return;
        }

        if (colors.length == 1) {
            this.fillColor(level.colors[0]);
        } else if (colors.length < 4) {
            this.fillRandomSelection(colors);
        } else {
            this.fillRandom();
        }
    }
}