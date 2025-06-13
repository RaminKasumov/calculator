let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const btnClear = document.getElementById('btnClear');
const btnSign = document.getElementById('btnSign');
const btnDelete = document.getElementById('btnDelete');
const btnPoint = document.getElementById('btnPoint');
const btnEquals = document.getElementById('btnEquals');
const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');

window.addEventListener('keydown', handleKeyboardInput);
btnClear.addEventListener('click', clear);
btnSign.addEventListener('click', changeSign);
btnDelete.addEventListener('click', deleteNumber);
btnPoint.addEventListener('click', appendPoint);
btnEquals.addEventListener('click', evaluate);

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function changeSign() {
    if (currentOperationScreen.textContent === '0') return;
    if (currentOperationScreen.textContent.startsWith('-')) {
        currentOperationScreen.textContent = currentOperationScreen.textContent.slice(1);
    }
    else {
        currentOperationScreen.textContent = '-' + currentOperationScreen.textContent;
    }
}

function appendPoint() {
    if (currentOperationScreen.textContent.includes('.')) return;
    if (shouldResetScreen) {
        resetScreen();
    }
    if (currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
    else {
        currentOperationScreen.textContent += '.';
    }
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
    if (currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
}

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate();
    }
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '%' || e.key === '/' || e.key === '*' || e.key === '-' || e.key === '+') setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '%') return '%';
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '−';
    if (keyboardOperator === '+') return '+';
}

function modulo(a, b) {
    return a % b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function add(a, b) {
    return a + b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '%':
            return modulo(a, b);
        case '÷':
            if (b === 0) {
                return null;
            }
            else {
                return divide(a, b);
            }
        case '×':
            return multiply(a, b);
        case '−':
            return subtract(a, b);
        case '+':
            return add(a, b);
        default:
            return null;
    }
}