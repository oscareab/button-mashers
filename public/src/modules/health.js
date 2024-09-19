import "/node_modules/jquery/dist/jquery.min.js"


export class HealthManager {
    constructor() {
        this.pink = 3;
        this.blue = 3;
        this.green = 3;
        this.purp = 3;
    }

    getHealth(color) {
        return this[color];
    }

    decreaseHealth(color) {
        this[color]--;
        this.drawHealth(color);
    }

    refillHealth(color) {
        const button = $(`#${color}Btn`);
        let classes = button.attr('class');
        button.attr('class', `btn no-animation rounded-none bg-dark${color} basis-1/2 hover:bg-dark${color} h-full w-full`);

        let count = 0;
        const intervalId = setInterval(() => {
            if (count < 3) {
                $(`#${color}Health`).append('<div class="bg-white w-4 h-4 mx-3 rounded-full"></div>');
                count++;
            } else {
                clearInterval(intervalId);
                this[color] = 3;
                this.drawHealth(color);
                button.attr('class', classes);
            }
        }, 1000);

        
    }

    drawHealth(color) {
        console.log(`Drawing ${color} health ${this[color]}`);
        $(`#${color}Health`).empty();
        for (let i = 0; i < this[color]; i++) {
            $(`#${color}Health`).append('<div class="bg-white w-4 h-4 mx-3 rounded-full"></div>');
        }
    }
}