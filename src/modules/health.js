import '/node_modules/jquery/dist/jquery.min.js';

export class HealthManager {
    constructor() {
        this.colors = ['pink', 'blue', 'green', 'purp'];
        this.health = 100;
        this.cooling = false;

        setInterval(() => {
            this.refillHealth();
            this.drawHealth();
        }, 1500);
    }

    getHealth() {
        return this.health;
    }

    decreaseHealth() {
        this.health -= 5;
        if (this.health <= 0) {
            this.coolDown();
        }
        this.drawHealth();
        console.log(this.health);
    }

    coolDown() {
        this.cooling = true;

        for (const color of this.colors) {
            console.log(color);
            const button = $(`#${color}Btn`);
            button.attr('class', `btn no-animation rounded-none cursor-default bg-dark${color} basis-1/2 hover:bg-dark${color} h-full w-full`);
        }

        const interval = setInterval(() => {
            if (this.health < 100) {
                this.health += 20;
            } else {
                clearInterval(interval);
                for (const color of this.colors) {
                    const button = $(`#${color}Btn`);
                    button.attr('class', `btn rounded-none bg-${color} hover:bg-${color} active:bg-[#FFFFFF] h-full w-full`);
                }
                this.cooling = false;
            }
            this.drawHealth();
        }, 1500);
    }

    refillHealth() {
        if (this.health < 100 && !this.cooling) {
            this.health = Math.min(this.health + 25, 100);
            this.drawHealth();
        }
    }

    drawHealth() {
        $(`#healthDiv`).html(
            `<div class='bg-white h-full' style='width: ${this.health}%; border-radius: 5px;'></div>`
        );
    }
}
