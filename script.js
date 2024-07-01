const addition = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const division = function (a, b) {
    if (b === 0) {
        return 0;
    }
    return a / b;
};

let firstNumber;
let operator;
let secondNumber;

function operate () {
let result;
[firstNumber, operator, secondNumber] = displayArray;

let num1 = Number(firstNumber);
let num2 = Number(secondNumber);

    switch(operator) {
        case '+':
            result = addition(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = division(num1, num2);
            break;            
        default:
            result = 'Invalid Operation';    
    }
    if (Number.isInteger(result)) {
        return result;
    } else {
        return result.toFixed(2);
    }
}

const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const allClear = document.getElementById('clear');
const equalKey = document.getElementById('equal-key');
const negativeKey = document.getElementById('negative-key');
const screenDiv = document.getElementById('screen');

let displayValue = '';
screenDiv.textContent = '0';
let displayArray = [];

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayValue += button.textContent;
        displayArray = displayValue.match(/(?<!\d)-?\d+(\.\d+)?|[+\-*/]/g);
        
        [firstNumber, operator, secondNumber] = displayArray;
        
        if (displayArray.length === 3) {
                screenDiv.textContent = secondNumber;
            } else {
                screenDiv.textContent = firstNumber;
            }
        
        if (firstNumber === '0') {
                displayValue = '';
            }
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
    const lastChar = displayValue[displayValue.length - 1];
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(button.textContent)) {
        return;
    }

    if (displayArray.length === 3) {
        displayValue = operate();
        screenDiv.textContent = displayValue;
        displayValue += button.textContent;
    } else {
        displayValue += '' + button.textContent + '';
       }
    })
});

allClear.addEventListener('click', () => {
    screenDiv.textContent = '0';
    displayValue = '';
    displayArray = displayValue;
});

let isEqualClicked = false;
equalKey.addEventListener('click', () => {
    if (!isEqualClicked) {
        displayValue = operate();
        displayArray = [Number(displayValue)];
        screenDiv.textContent = displayValue;

        if (displayValue === 'Invalid Operation') {
            screenDiv.textContent = '0';
            displayValue = '';
        }

        isEqualClicked = true;
    }
});

negativeKey.addEventListener('click', () => {
    displayValue = displayValue.toString();
    let numbers = displayValue.match(/(?:^|(?<=[+\-*/]))-?\d+(\.\d+)?/g);

    if (numbers) {
        let currentValue = numbers[numbers.length - 1];

        if (!isNaN(currentValue)) {
            if (currentValue.startsWith('-')) {
                currentValue = currentValue.slice(1);
            } else {
                currentValue = '-' + currentValue;
            }

            
            displayValue = displayValue.slice(0, displayValue.lastIndexOf(numbers[numbers.length - 1])) + currentValue;
        }

        displayArray = displayValue.match(/-?\d+(\.\d+)?|[+\-*/]/g);
        screenDiv.textContent = currentValue;
    }
});

const decimal = document.getElementById('decimal');
decimal.addEventListener('click', () => {
    const parts = displayValue.split(/[\+\-\*\/]/);
    const currentPart = parts[parts.length - 1];

    if (!currentPart.includes('.')) {
        if (currentPart === '') {
            displayValue += '0.';
        } else {
            displayValue += decimal.textContent;
        }
    }
});

const percentageButton = document.getElementById('percentage');
percentageButton.addEventListener('click', () => {
    if (firstNumber !== undefined) { 
        if (secondNumber !== undefined) { 
            secondNumber /= 100;
            displayValue = secondNumber,toString();
            displayArray[2] = secondNumber.toString();
            screenDiv.textContent = secondNumber.toFixed(3);
        } else {
            firstNumber /= 100;
            displayValue = firstNumber.toString();;
            screenDiv.textContent = firstNumber.toFixed(3);
        }
    }
});

function handleKeyDown(event) {
    if (event.key >= '0' && event.key <= '9') {
        displayValue += event.key;
        screenDiv.textContent = displayValue;
    } else if (event.key === 'Backspace') {
        displayValue = displayValue.slice(0, -1);
        screenDiv.textContent = displayValue || '0';
    }
    displayArray = displayValue.match(/(?<!\d)-?\d+(\.\d+)?|[+\-*/]/g);
    [firstNumber, operator, secondNumber] = displayArray;

    if (displayArray.length === 3) {
        screenDiv.textContent = secondNumber;
    } else {
        screenDiv.textContent = firstNumber;
    }
}
document.addEventListener('keydown', handleKeyDown);