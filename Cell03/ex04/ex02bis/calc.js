$(document).ready(function() {
    setInterval(function() {
        alert('Please, use me...');
    }, 30000);

    $('#submit-btn').click(function() {
        const leftValue = $.trim($('#left').val());
        const rightValue = $.trim($('#right').val());
        const operator = $('#operator').val();

        if (!/^\d+$/.test(leftValue) || !/^\d+$/.test(rightValue)) {
            alert('Error :(');
            console.log('Error :(');
            return;
        }

        const leftNum = parseInt(leftValue, 10);
        const rightNum = parseInt(rightValue, 10);

        if ((operator === '/' || operator === '%') && rightNum === 0) {
            alert("It's over 9000!");
            console.log("It's over 9000!");
            return;
        }

        let result;
        switch (operator) {
            case '+': result = leftNum + rightNum; break;
            case '-': result = leftNum - rightNum; break;
            case '*': result = leftNum * rightNum; break;
            case '/': result = leftNum / rightNum; break;
            case '%': result = leftNum % rightNum; break;
        }

        alert(result);
        console.log(result);
    });
});