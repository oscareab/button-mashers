import "../../../../../../../node_modules/jquery/dist/jquery.min.js"

const socket = io();

let colors = ['pink', 'blue', 'green', 'purp'];

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

    $("#btn1").on('click', function () {
        socket.emit('pinkPress');
        navigator.vibrate(100);
    });

    $("#btn2").on('click', function () {
        socket.emit('bluePress');
        navigator.vibrate(100);
    });

    $("#btn3").on('click', function () {
        socket.emit('greenPress');
        navigator.vibrate(100);
    });

    $("#btn4").on('click', function () {
        socket.emit('purpPress');
        navigator.vibrate(100);
    });
})