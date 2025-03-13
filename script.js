let firstNumber = "";
let secondNumber = "";
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".decimal");

numberButtons.forEach(button => 
    button.addEventListener("click", () => appendNumber(button.dataset.num))
);

operatorButtons.forEach(button => 
    button.addEventListener("click", () => setOperator(button.dataset.op))
);

equalButton.addEventListener("click", evaluate);
decimalButton.addEventListener("click", appendDecimal);

function appendNumber(num) {
    if (display.textContent === "0" || shouldResetDisplay) resetDisplay();
    display.textContent += num;
}

function setOperator(op) {
    if (operator !== null) evaluate();
    firstNumber = display.textContent;
    operator = op;
    shouldResetDisplay = true;
}

function evaluate() {
    if (operator === null || shouldResetDisplay) return;
    if (operator === "divide" && display.textContent === "0") {
        display.textContent = "Error!";
        return;
    }
    secondNumber = display.textContent;
    display.textContent = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    operator = null;
}

function operate(operator, a, b) {
    switch (operator) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            return b === 0 ? "Error" : a / b;
        default:
            return b;
    }
}

function resetDisplay() {
    display.textContent = "";
    shouldResetDisplay = false;
}

function appendDecimal() {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}
