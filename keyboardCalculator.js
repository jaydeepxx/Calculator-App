const inputValue = document.getElementById("user-input");

const number = document.querySelectorAll(".number").forEach(function (item) {
    item.addEventListener("click", function (e) {
        // console.log(e);
        handleInput(e.target.innerHTML.trim());

    });
});

const calculate = document.querySelectorAll(".operation").forEach(function (item) {
    item.addEventListener("click", function (e) {
        // console.log(e.target.innerHTML)
        handleOperation(e.target.innerHTML.trim());
    });
});


document.addEventListener("keydown", function (e) {
    // console.log(e);
    const key = e.key;

    if (!isNaN(key) || key === ".") {
        handleInput(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperation(key);
    } else if (key === "Enter") {
        handleOperation("=");
    } else if (key === "Backspace") {
        handleBackspace();
    } else if (key.toLowerCase() === "c") {
        handleOperation("AC");
    }
});

function handleInput(input) {
    console.log(input);
    if (inputValue.innerText === "NaN") {
        inputValue.innerText = "";
    }
    if (inputValue.innerText === "0") {
        inputValue.innerText = "";
    }
    inputValue.innerText += input;
}

function handleOperation(op) {
    console.log(op);
    let lastValue = inputValue.innerText.slice(-1);
    console.log("last value",lastValue);
    console.log(isNaN("+"));

    if (!isNaN(lastValue) && op === "=") {
        inputValue.innerText = eval(inputValue.innerText);
    } else if (op === "AC") {
        inputValue.innerText = "0";
    } else {
        if (op === "x" || op === "*") {
            op = "*";
        } else if (op === "÷" || op === "/") {
            op = "/";
        }

        if (!isNaN(lastValue)) {
            inputValue.innerText += op;
        }
    }
}

function handleBackspace() {
    inputValue.innerText = inputValue.innerText.slice(0, -1) || "0";
}