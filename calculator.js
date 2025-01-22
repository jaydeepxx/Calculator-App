const inputValue = document.getElementById("user-input");
// console.log(typeof inputValue);
console.log(inputValue);

function initEventListeners() {
    document.addEventListener("click", handleButtonClick);
    document.addEventListener("keydown", handleKeyboardInput);
}

function handleButtonClick(event) {
    console.log(event);
    // console.log(event.target.classList[0])
    // console.log(typeof event.target.classList[0]);
    // const target = event.target.classList.value;
    const target = event.target.classList[0];
    const text = event.target.textContent;

    // if (target.classList.contains("number")) {
    //     handleInput(target.textContent.trim());
    // } else if (target.classList.contains("operation")) {
    //     handleOperation(target.textContent.trim());
    // }

    if (target === "number") {
        handleInput(text.trim());
    } else if (target === "operation") {
        handleOperation(text.trim());
    }
}

function handleKeyboardInput(event) {
    const key = event.key;
    // console.log(key);
    if (!isNaN(key) || key === ".") {              // here isNaN is for invalid inputs
        handleInput(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperation(key);
    } else if (key === "Enter") {
        handleOperation("=");
    } else if (key === "Backspace") {
        handleBackspace();
    } else if (key.toLowerCase() === "c") {
        handleOperation("AC");
    }
}

function handleInput(input) {
    if (inputValue.textContent === "NaN" || inputValue.textContent === "0") {
        inputValue.textContent = "";
    }

    const currentNumber = getLastNumber();      // multiple "." handel ke liye
    if (input === "." && currentNumber.includes(".")) return;

    inputValue.textContent += input;
}

function handleOperation(op) {
    let lastValue = inputValue.textContent.slice(-1);

    if (op === "=") {
        evaluateExpression();
    } else if (op === "AC") {
        resetCalculator();
    } else {
        op = mapOperation(op);
        if (!isNaN(lastValue)) {          // this one is for multiple operation
            inputValue.textContent += op;
        } else {
            replaceLastOperator(op);
        }
    }
}

function handleBackspace() {
    inputValue.textContent = inputValue.textContent.slice(0, -1) || "0";
}

function getLastNumber() {
    return inputValue.textContent.split(/[\+\-\*\/]/).pop();       //i have used split here to handel these cases 533.5 + 534.2 + 6
}

function mapOperation(op) {
    if (op === "x") return "*";
    if (op === "÷") return "/";
    return op;
}

function replaceLastOperator(op) {
    inputValue.textContent = inputValue.textContent.slice(0, -1) + op; // (0,-1) starts from 0 and goes to just previous element of last element
}

function resetCalculator() {
    inputValue.textContent = "0";
}

function evaluateExpression() {
    try {
        inputValue.textContent = eval(inputValue.textContent);
    } catch(e) {
        alert(e);
        inputValue.textContent = "0";
    }
}

initEventListeners();