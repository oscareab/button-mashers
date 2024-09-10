import "../../../../../../../node_modules/jquery/dist/jquery.min.js"
import { Grid } from "./modules/grid.js";

const socket = io();
let grid;

$(function () {
    initQR();

    $(document).keypress(function (e) {
        if (e.which == 109) {
            $('*').toggleClass('cursor-none');
        }

        // debug ONLY k to kill
        if (e.which == 107) {
            grid.killAndPlay('pink')
        }

        // debug ONLY s to test drums
        if (e.which == 115) {
            grid.killAndPlay('green');
        }
    });

    $("#startBtn").on('click', function () {
        $("#menu").toggleClass("hidden");
        $("#grid").toggleClass("hidden");
        init();
    })
})

function init() {
    let width = $("#grid").width();
    let height = $("#grid").height();

    grid = new Grid(width, height);
    
    // grid.fillColor("pink")
    grid.fillRandomSelection(["pink", "green"]);
    // grid.fillRandom();   
    socket.on('killPink', function () {
        grid.kill('pink');
    });

    socket.on('killBlue', function () {
        grid.kill('blue');
    });

    socket.on('killGreen', function () {
        grid.kill('green');
    });

    socket.on('killPurp', function () {
        grid.kill('purp');
    });
}

function playSound(color) { 
    switch (color) {
        case 'pink':
            break;
        case 'blue':
            break;
        case 'green':
            playBeat();
            break;
        case 'purp':
            break;
    }
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

function initQR() {
    let url = window.location.href;
    url = url.substring(0, url.lastIndexOf('/'));

    let qrcode = new QRCode('qr', {
        text: url,
        width: 512,
        height: 512
    });
    qrcode.makeCode(url);
}