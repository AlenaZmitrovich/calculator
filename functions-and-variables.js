const resultField = document.querySelector("div.button.result.darkgray")
  .children[0];

let result = "0";
let memory = "";
let arrayOfNumbers;
let isCalculationFinished = false;

// округлить дробное число

function roundNumber(number) {
  result = Math.round(number * 1e7) / 1e7;
  return result;
}

//  поменять размер шрифта

function checkSize(result) {
  if (result.toString().length > 10) {
    resultField.classList.add("smaller");
  } else {
    resultField.classList.remove("smaller");
  }
}

// отобразить результат вычисления

function showResult() {
  resultField.textContent = result;
}

// занести в массив элементы вычисления

function createArrayOfNumbers(operator) {
  arrayOfNumbers = memory.split(operator);
}

// запомнить оператор

function addAccion(sign) {
  memory = result + sign;
  return memory;
}
