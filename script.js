const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");
const tipsBtns = document.querySelectorAll(".tip");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;
let tipsValue = 0;

function sendNumberValue(number) {
  //replace current display if first entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //if current display value is 0,replace it or add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}
//add decimal
function addDecimal() {
  //if operator pressed ,don't add decimal
  if (awaitingNextValue) return;
  //if no add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}
//calculate first and second values
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

//operatore
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //addign firstvalue if no
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    console.log("calculation", calculation);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //ready for next value
  awaitingNextValue = true;
  operatorValue = operator;
}

//add event listener
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});
//reset display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}
//calculate tips
function calculateTips(percentage) {
  tipsValue = (Number(calculatorDisplay.textContent) * (1 + percentage)) / 100;
  calculatorDisplay.textContent = tipsValue;
}

//event listener
clearBtn.addEventListener("click", resetAll);
tipsBtns.forEach((tipsBtn) => {
  tipsBtn.addEventListener("click", () => calculateTips(tipsBtn.value));
});
