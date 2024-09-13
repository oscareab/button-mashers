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
    });
})

function init() {
    // setInterval(function () {
    //     let level = grid.getMeter();
    //     console.log(level);
    // }, 100);

    let width = $("#grid").width();
    let height = $("#grid").height();

    grid = new Grid(width, height);

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

    //grid.startLevels();
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