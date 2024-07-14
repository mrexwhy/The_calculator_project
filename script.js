// Below fuctions takes two numbers and calculates their results according to their functions.
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

// Below variables will store the respective numbers and operators to perform the calculations.
let firstNumber;
let operator;
let secondNumber;


function operate () {
let result;
[firstNumber, operator, secondNumber] = displayArray;
// This line stores values assigned to the three variables.

let num1 = Number(firstNumber);
let num2 = Number(secondNumber);
// Converts string values to numbers.

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
    // Return the result rounded to 2 decimal places if its not an integer.
}

const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const allClear = document.getElementById('clear');
const equalKey = document.getElementById('equal-key');
const negativeKey = document.getElementById('negative-key');
const screenDiv = document.getElementById('screen');
// Select buttons and other elements by their id's and classes.

let displayValue = '';
screenDiv.textContent = '0';
let displayArray = [];
// Initialise displayValue and displayArray, and set the screen to display 0.

let isEqualClicked = false; // Checks if the equal button is clicked.

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (isEqualClicked) {
            displayValue = ''; // Reset calculation if '=' was clicked
            isEqualClicked = false; // Reset the flag
        }
        
        displayValue += button.textContent;
        displayArray = displayValue.match(/(?<!\d)-?\d+(\.\d+)?|[+\-*/]/g);
        // Regex to recognise and seperate operators and numbers in the displayArray.
        
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
// Assign event to number buttons and distribute the values to displayValue and displayArray accordingly.

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
    const lastChar = displayValue[displayValue.length - 1];
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(button.textContent)) {
        return;
    }

    if (displayArray.length === 3) {
        displayValue = operate();
        screenDiv.textContent = displayValue;
        displayValue += '' + button.textContent + '';
    } else if (displayValue === '' || displayValue === '0') {
        return;
    } else {
        displayValue += '' + button.textContent + '';
    }
    })
});
// Assign event and functions to operator Buttons.

allClear.addEventListener('click', () => {
    displayValue = '';
    displayArray = [];
    screenDiv.textContent = '0';
    firstNumber = displayValue;
});
// This event clears the screen when clicked.

equalKey.addEventListener('click', () => {
    if (displayArray.length === 3) {
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
    }

    if (displayValue.includes('=')) { // Check if '=' is in displayValue
        screenDiv.textContent = displayValue.replace('=', ''); // Remove '=' from displayValue
        displayValue = screenDiv.textContent;
    }

    if (displayValue === '0') {
        screenDiv.textContent = '0';
    }
});
// When prompted, this is when the calculation is executed.

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

    if (displayValue === '0') {
        screenDiv.textContent = '0';
    }
});
// This event assigns negative signs to numbers.

const decimal = document.getElementById('decimal');
decimal.addEventListener('click', () => {
    if (isEqualClicked) {
        displayValue = '0'; // Reset calculation if '=' was clicked
        isEqualClicked = false; // Reset the flag
    }

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
// This event assigns the decimal point in numbers.

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

    if (displayArray === '0') {
        screenDiv.textContent = '0';
    }
});
// Calculates the percentage equation when prompted.

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
// Keyboard press events are assined to the displayValue and displayArray.