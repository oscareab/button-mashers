import "/node_modules/jquery/dist/jquery.min.js"

export class HealthManager {
    constructor() {
        this.pink = 100;
        this.blue = 100;
        this.green = 100;
        this.purp = 100;

        setInterval(() => {
            this.refillHealth();
            this.drawHealth('pink');
        }, 200);
    }

    getHealth(color) {
        return this[color];
    }

    decreaseHealth(color) {
        if (this[color] >= 10) {
            this[color] -= 10;
        } else {
            this[color] = 0;
        }
        this.drawHealth(color);
    }

    refillHealth() {
        for (const color of ['pink', 'blue', 'green', 'purp']) {
            if (this[color] < 100) {
                this[color] += 10;
                this.drawHealth(color);
            }
        }
    }

    // refillHealth(color) {
    //     const button = $(`#${color}Btn`);
    //     let classes = button.attr('class');
    //     button.attr('class', `btn no-animation rounded-none bg-dark${color} basis-1/2 hover:bg-dark${color} h-full w-full`);

    //     let count = 0;
    //     const intervalId = setInterval(() => {
    //         if (count < 3) {
    //             $(`#${color}Health`).append('<div class="bg-white w-4 h-4 mx-3 rounded-full"></div>');
    //             count++;
    //         } else {
    //             clearInterval(intervalId);
    //             this[color] = 3;
    //             this.drawHealth(color);
    //             button.attr('class', classes);
    //         }
    //     }, 1000);
    // }

    drawHealth() {
        for (const color of ['pink', 'blue', 'green', 'purp']) {
            $(`#${color}Health`).empty();
            $(`#${color}Health`).html(`${this[color]}`);
        }
    }
}