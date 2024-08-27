let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll("button");

window.addEventListener("keydown", function (e) {
  const key = document.querySelector(`button[data-key='${e.code}']`);
  if (key) key.click();
});

function updateDisplay() {
  const display = document.getElementById("display");
  display.innerText = displayValue;
  if (displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9);
  }
}

updateDisplay();

function clickButton() {
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (button.classList.contains("operand")) {
        inputOperand(button.value);
      } else if (button.classList.contains("operator")) {
        inputOperator(button.value);
      } else if (button.classList.contains("equals")) {
        inputEquals();
      } else if (button.classList.contains("decimal")) {
        inputDecimal(button.value);
      } else if (button.classList.contains("percent")) {
        inputPercent();
      } else if (button.classList.contains("sign")) {
        inputSign();
      } else if (button.classList.contains("clear")) {
        clearDisplay();
      }
      updateDisplay();
    });
  });
}

clickButton();

function inputOperand(operand) {
  if (firstOperator === null) {
    if (displayValue === "0") {
      displayValue = operand;
    } else if (displayValue === firstOperand) {
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  } else {
    if (displayValue === firstOperand) {
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  }
}

function inputOperator(operator) {
  if (firstOperator && !secondOperator) {
    secondOperator = operator;
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      firstOperator
    );
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = null;
  } else if (firstOperator && secondOperator) {
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      secondOperator
    );
    secondOperator = operator;
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = null;
  } else {
    firstOperator = operator;
    firstOperand = displayValue;
  }
}

function inputEquals() {
  if (firstOperator === null) return;

  secondOperand = displayValue;
  result = operate(
    Number(firstOperand),
    Number(secondOperand),
    secondOperator || firstOperator
  );
  displayValue =
    result === "Error" ? "Error" : roundAccurately(result, 15).toString();
  firstOperand = displayValue;
  secondOperand = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}

function inputDecimal(dot) {
  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

function inputPercent() {
  displayValue = (parseFloat(displayValue) / 100).toString();
}

function inputSign() {
  displayValue = (parseFloat(displayValue) * -1).toString();
}

function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}

function inputBackspace() {
  displayValue = displayValue.slice(0, -1) || "0";
  updateDisplay();
}

function operate(x, y, op) {
  if (op === "+") return x + y;
  if (op === "-") return x - y;
  if (op === "*") return x * y;
  if (op === "/") return y === 0 ? "lmao" : x / y;
}

function roundAccurately(num, places) {
  return parseFloat(num.toFixed(places));
}
