
const socket = io();

const snare = new Snare();
const hats = new HighHat();
const kick = new KickDrum();
const synth = new Synth();

let beat = [['h', 'k'], 'h', 'h', ['h', 'k'],
    's', 'h', 'h', ['h', 'k'],
    'h', ['h', 'k'], 'h', ['h', 'k'],
    's', 'h', 'h', 'h'];
let beatIndex = 0;

let colors = ['pink', 'blue', 'green', 'purp'];
let colorsLeft = [0, 0, 0, 0]

let numSquares = 0;
let rows = 0;
let cols = 0;

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

    rows = Math.floor(height / 50);
    cols = Math.floor(width / 50);
    numSquares = rows * cols;

    for (let i = 0; i < numSquares; i++) {
        let index = Math.floor(Math.random() * colors.length);
        let color = colors[index]
        colorsLeft[index]++;

        $("#grid").append(`<div class="bg-${color} btn hover:bg-${color} active:bg-white w-[50px] h-[50px]"></div>`)
    }
}


function playMelody(index) {
    index = index - 1;

    let row = Math.floor(index / rows);
    let col = index % cols;

    synth.play(row, col, rows, cols);
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
        const button = $('#grid').children().eq(index - 1);
        let classes = button.attr('class').split(/\s+/);

        if (classes[0] == `bg-${color}`) {
            button.attr('class', `btn bg-transparent border-0 hover:bg-transparent w-[50px] h-[50px] cursor-none `)

            colorsLeft[colors.indexOf(color)]--;
            killed = true;

            switch (color) {
                case 'pink':
                    playMelody(index);
                    break;
                case 'green':
                    playBeat();
                    break;
            }
        }
    }
}

function initQR() {
    let url = window.location.href;
    url = url.substring(0, url.lastIndexOf('/'));

    let qrcode = new QRCode('qr');
    qrcode.makeCode(url);
}