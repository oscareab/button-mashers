import "../../../../../../../node_modules/jquery/dist/jquery.min.js"
import { Grid } from "./modules/grid.js";

const socket = io();
let grid;
let startScreenColorChanger;

$(function () {
    $(document).keypress(function (e) {

        // m to toggle cursor
        if (e.which == 109) {
            if (document.body.style.cursor === 'none') {
                document.body.style.cursor = 'default';
            } else {
                document.body.style.cursor = 'none';
            }
        }

        // f to toggle fullscreen
        if (e.which == 102) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else if (document.exitFullscreen) {
                document.exitFullscreen();
              }
        }

        // debug ONLY k to kill
        if (e.which == 107) {
            grid.killAndPlay('blue');
        }

        // debug ONLY l to kill
        if (e.which == 108) {
            grid.killAndPlay('pink');
        }

        // debug ONLY s to test drums
        if (e.which == 115) {
            grid.killAndPlay('green');
        }
    });

    $("#startText").on('animationend', function () {
        animateStartScreen();
    });

    $("#startScreen").on('click', function () {
        initQR();
        $("#menu").toggleClass("hidden");
        $("#startScreen").toggleClass("hidden");
    });

    $("#startBtn").on('click', function () {
        $("#menuContainer").toggleClass("hidden");
        $("#gridContainer").toggleClass("hidden");
        clearInterval(startScreenColorChanger);
        init();
    });
})

function animateStartScreen() {
    let colors = ['pink', 'blue', 'green', 'purp'];
    let text = "Button Mashers"

    $("#startText").html("");
        for (const element of text) {
            let index = Math.floor(Math.random() * colors.length);
            let color = colors[index];
            $("#startText").append(`<span class="text-${color}">${element}</span>`);
        }
    
    startScreenColorChanger = setInterval(() => {
        $("#startText").html("");
        for (const element of text) {
            let index = Math.floor(Math.random() * colors.length);
            let color = colors[index];
            $("#startText").append(`<span class="text-${color}">${element}</span>`);
        }
    }, 500);

    $("#continueText").toggleClass("opacity-0 fade-in");
}

function init() {
    let width = Math.floor($("#grid").width() / 50) * 50;
    let height = Math.floor($("#grid").height() / 50) * 50;

    $("#grid").width(width);
    $("#grid").height(height);

    grid = new Grid(width, height);

    // setInterval(function () {
    //     let colors = grid.levels[grid.levelIndex].slice(1);
    //     let color = colors[Math.floor(Math.random() * colors.length)];

    //     grid.killAndPlay(color);
    // }, 100)

    setInterval(function () {
        let colors = grid.colors;
        let color = colors[Math.floor(Math.random() * colors.length)];

        grid.killAndPlay(color);
    }, 100)

    socket.on('killPink', function () {
        grid.killAndPlay('pink');
    });

    socket.on('killBlue', function () {
        grid.killAndPlay('blue');
    });

    socket.on('killGreen', function () {
        grid.killAndPlay('green');
    });

    socket.on('killPurp', function () {
        grid.killAndPlay('purp');
    });

    grid.startLevels();
    // grid.fillColor('purp');
}

function initQR() {
    let url = window.location.href;
    url = url + '/client.html';

    let qrcode = new QRCode('qr', {
        text: url,
        width: 512,
        height: 512
    });
    qrcode.makeCode(url);
}