$(document).ready(function() {
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }


    $('#btn').click(function() {
        $('body').css('background-color', getRandomColor());
    });
});