import '/node_modules/jquery/dist/jquery.min.js';

export class HealthManager {
    constructor() {
        this.health = { pink: 100, blue: 100, green: 100, purp: 100 };
        this.cooling = new Set();

        setInterval(() => {
            this.refillHealth();
            this.drawAllHealth();
        }, 1500);
    }

    getHealth(color) {
        return this.health[color];
    }

    decreaseHealth(color) {
        this.health[color] -= 5;
        if (this.health[color] <= 0) {
            this.coolDown(color);
        }
        this.drawHealth(color);
    }

    coolDown(color) {
        this.cooling.add(color);
        const button = $(`#${color}Btn`);
        const originalClasses = button.attr('class');

        button.attr('class', `btn no-animation rounded-none cursor-default bg-dark${color} basis-1/2 hover:bg-dark${color} h-full w-full`);

        const intervalId = setInterval(() => {
            if (this.health[color] < 100) {
                this.health[color] += 20;
            } else {
                clearInterval(intervalId);
                button.attr('class', originalClasses);
                this.cooling.delete(color);
            }
            this.drawHealth(color);
        }, 1000);
    }

    refillHealth() {
        for (const color of Object.keys(this.health)) {
            if (this.health[color] < 100 && !this.cooling.has(color)) {
                this.health[color] = Math.min(this.health[color] + 20, 100);
                this.drawHealth(color);
            }
        }
    }

    drawHealth(color) {
        $(`#${color}Health`).html(
            `<div class='bg-white ' style='width: ${this.health[color]}%; height: 10px; border-radius: 5px;'></div>`
        );
    }

    drawAllHealth() {
        for (const color of Object.keys(this.health)) {
            this.drawHealth(color);
        }
    }
}
