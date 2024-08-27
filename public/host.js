
const socket = io();

const snare = new Snare();
const hats = new HighHat();
const kick = new KickDrum();

const synth = new Tone.Synth().toDestination();

let beat = [['h', 'k'], 'h', 'h', ['h', 'k'],
    's', 'h', 'h', ['h', 'k'],
    'h', ['h', 'k'], 'h', ['h', 'k'],
    's', 'h', 'h', 'h'];
let beatIndex = 0;

let melody = ['G4', 'B4', 'C5', 'D5', 'F#5', "A5", 'B5', 'D5'];
let melodyIndex = 0;

let colors = ['pink', 'blue', 'green', 'purp'];
let colorsLeft = [0, 0, 0, 0]
let numSquares = 0;

$(document).ready(function () {
    initQR();

    $(document).keypress(function (e) {
        if (e.which == 109) {
            $('*').toggleClass('cursor-none');
        }

        // debug ONLY k to kill
        if (e.which == 107) {
            kill('pink')

        }

        // debug ONLY s to test drums
        if (e.which == 115) {
            kill('green');
            //playSnare();
        }

        // debug ONLY enter to start
        if (e.which == 13) {
            $("#grid").toggleClass("hidden");
            $("#menu").toggleClass("hidden");

            init();
        }
    });

    $("#startBtn").on('click', function () {
        $("#grid").toggleClass("hidden");
        $("#menu").toggleClass("hidden");

        init();
    })
})

function init() {
    Tone.start();
    populateGrid();

    $('.btn, #grid').toggleClass('cursor-none');

    socket.on('killPink', function () {
        kill('pink');
    });

    socket.on('killBlue', function () {
        kill('blue');
    });

    socket.on('killGreen', function () {
        kill('green');
    });

    socket.on('killPurp', function () {
        kill('purp');
    });
}

function populateGrid() {
    let width = $("#grid").width();
    let height = $("#grid").height();

    let rows = Math.floor(width / 50);
    let cols = Math.floor(height / 50);
    numSquares = rows * cols;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let index = Math.floor(Math.random() * colors.length);
            let color = colors[index]
            colorsLeft[index]++;
            $("#grid").append(`<div class="bg-${color} btn hover:bg-${color} active:bg-white w-[50px] h-[50px]"></div>`)
        }
    }
}

function playSound(color) {
    switch (color) {
        case 'pink':
            playMelody();
            break;
        case 'green':
            playBeat();
            break;
    }
}

function playMelody() {
    let note = melody[melodyIndex % 8];

    synth.triggerAttackRelease(note, '16n');
    melodyIndex++;
}

function playBeat() {
    let notes = beat[beatIndex % beat.length];

    for (const note of notes) {
        switch (note) {
            case 'k':
                kick.play();
                break;
            case 'h':
                hats.play();
                break;
            case 's':
                snare.play();
                break;
        }
    }

    beatIndex++;
}

function kill(color) {
    if (colorsLeft[colors.indexOf(color)] <= 0) {
        return;
    }

    let killed = false;
    while (!killed) {
        let index = Math.floor(Math.random() * numSquares);
        let classes = $('#grid').children().eq(index - 1).attr('class').split(/\s+/);

        if (classes[0] == `bg-${color}`) {
            $('#grid').children().eq(index - 1).attr('class', `btn bg-transparent border-0 hover:bg-transparent w-[50px] h-[50px] cursor-none `)

            colorsLeft[colors.indexOf(color)]--;
            killed = true;
            playSound(color);
        }
    }
}

function initQR() {
    let url = window.location.href;
    let qrcode = new QRCode('qr');
    qrcode.makeCode(window.location.href);
}