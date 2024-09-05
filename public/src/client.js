
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
    });

    $("#btn2").on('click', function () {
        socket.emit('bluePress');
    });

    $("#btn3").on('click', function () {
        socket.emit('greenPress');
    });

    $("#btn4").on('click', function () {
        socket.emit('purpPress');
    });
})