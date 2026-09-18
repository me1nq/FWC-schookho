setInterval(function() {
    alert('Please, use me...');
}, 30000);

const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', function() {
    const leftValue = document.getElementById('left').value.trim();
    const rightValue = document.getElementById('right').value.trim();
    const operator = document.getElementById('operator').value;

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
        case '+':
            result = leftNum + rightNum;
            break;
        case '-':
            result = leftNum - rightNum;
            break;
        case '*':
            result = leftNum * rightNum;
            break;
        case '/':
            result = leftNum / rightNum;
            break;
        case '%':
            result = leftNum % rightNum;
            break;
    }

    alert(result);
    console.log(result);
});