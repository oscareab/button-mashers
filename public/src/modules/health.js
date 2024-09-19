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
        console.log(`New ${color} health: ${this[color]}`);
        this.drawHealth(color);
    }

    refillHealth(color) {
        const button = $(`#${color}Btn`);
        let classes = button.attr('class');
        button.attr('class', `h-1/2 w-11/12 rounded-none bg-dark${color} basis-1/2 hover:bg-dark${color}`);

        let count = 0;
        const intervalId = setInterval(() => {
            if (count < 3) {
                $(`#${color}Health`).append('<div class="bg-white w-12 h-8 mx-3"></div>');
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
            $(`#${color}Health`).append('<div class="bg-white w-12 h-8 mx-3"></div>');
        }
    }
}