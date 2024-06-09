const addition = function (a, b) {
    return a + b;
};

const substract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const division = function (a, b) {
    return a / b;
};

let firstNumber;
let operator;
let secondNumber;

function operate (num1, op, num2) {
    let result;
    switch(op) {
        case '+':
            result = addition(num1, num2);
            break;
        case '-':
            result = substract(num1, num2);
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
    return result;
}