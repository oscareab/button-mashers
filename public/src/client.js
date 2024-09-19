import { HealthManager } from "./modules/health.js";
import "/node_modules/jquery/dist/jquery.min.js"

const socket = io();
const health = new HealthManager();

$(function () {
    $('*').css('touch-action', 'manipulation');
    
    $('.btn').on('touchstart mousedown', function () {
        $(this).addClass('active');
    });

    $('.btn').on('touchend mouseup', function () {
        const button = $(this);
        setTimeout(function () {
            button.removeClass('active');
        }, 200);
    });

    $("#pinkBtn").on('click', function () {
        handlePress('pink');
    });

    $("#blueBtn").on('click', function () {
        handlePress('blue');
    });

    $("#greenBtn").on('click', function () {
        handlePress('green');
    });

    $("#purpBtn").on('click', function () {
        handlePress('purp');
    });
})

function handlePress(color) {
    if(health.getHealth(color) > 1) {
        health.decreaseHealth(color);
        sendPress(color);
    } else  if(health.getHealth(color) === 1) {
        health.decreaseHealth(color);
        sendPress(color);
        health.refillHealth(color);
    }
}

function sendPress(color) {
    socket.emit(`${color}Press`);
}