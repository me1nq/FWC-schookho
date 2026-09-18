$(document).ready(function() {
    let currentSize = 200;
    const colors = ['red', 'green', 'blue'];
    let colorIndex = 0;

    function updateBalloon() {
        $('#balloon').css({
            'width': currentSize + 'px',
            'height': currentSize + 'px',
            'background-color': colors[colorIndex]
        });
    }

    $('#balloon').click(function() {
        currentSize += 10;
        if (currentSize > 420) {
            currentSize = 200;
            colorIndex = 0;
        } else {
            colorIndex = (colorIndex + 1) % 3;
        }
        updateBalloon();
    });

    $('#balloon').mouseleave(function() {
        currentSize -= 5;
        if (currentSize < 200) {
            currentSize = 200;
        }
        colorIndex = (colorIndex - 1 + 3) % 3;
        updateBalloon();
    });
});