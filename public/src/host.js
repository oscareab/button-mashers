import "../../../../../../../node_modules/jquery/dist/jquery.min.js"
import { Grid } from "./modules/grid.js";

const socket = io();
let grid;

$(function () {
    initQR();

    $(document).keypress(function (e) {

        if (e.which == 109) { // 'm' key
            if (document.body.style.cursor === 'none') {
                document.body.style.cursor = 'default'; // Show cursor
            } else {
                document.body.style.cursor = 'none'; // Hide cursor
            }
        }
        if (e.which == 109) {
            $('*').toggleClass('cursor-none');
        }

        // debug ONLY k to kill
        if (e.which == 107) {
            grid.killAndPlay('purp')
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

    $("#startBtn").on('click', function () {
        $("#menu").toggleClass("hidden");
        $("#grid").toggleClass("hidden");
        init();
    });
})

function init() {

    let width = Math.floor($("#grid").width() / 50) * 50;
    let height = Math.floor($("#grid").height() / 50) * 50;

    $("#grid").width(width);
    $("#grid").height(height);

    grid = new Grid(width, height);

    // let timer = 0;
    // setInterval(function () {
    //     timer += 1000;
    //     console.log(timer, grid.changeLevels);
    // }, 1000);

    // setInterval(function () {
    //     let colors = grid.levels[grid.levelIndex].slice(1);
    //     let color = colors[Math.floor(Math.random() * colors.length)];

    //     grid.killAndPlay(color);
    // }, 100)

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

    // grid.startLevels();
    grid.fillRandom();
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