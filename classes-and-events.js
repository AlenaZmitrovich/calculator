function startCalculator() {
  class Button {
    constructor(element, backgroundColor) {
      this.element = element;
      this.backgroundColor = backgroundColor;

      this.element.addEventListener('mousedown', () =>
        showMousedownBackground(event, this.backgroundColor)
      );
      this.element.addEventListener('mouseup', () =>
        showMouseupBackground(event, this.backgroundColor)
      );

      function showMousedownBackground(event, backgroundColor) {
        event.target.classList.add(backgroundColor);
      }

      function showMouseupBackground(event, backgroundColor) {
        event.target.classList.remove(backgroundColor);
      }
    }
  }

  class LightgrayButton extends Button {
    constructor(element) {
      super(element, 'lightgray-pressed');
      this.element = element;
    }
  }

  class NumberButton extends LightgrayButton {
    constructor(element, number) {
      super(element);
      this.element = element;
      this.number = number;
      this.element.addEventListener('click', () => pressNumberButton(number));

      function pressNumberButton(number) {
        if (
          result === '0' ||
          memory[memory.length - 1] === '/' ||
          memory[memory.length - 1] === '*' ||
          memory[memory.length - 1] === '-' ||
          memory[memory.length - 1] === '+' ||
          isCalculationFinished
        ) {
          result = number;
          memory = memory + result;
          isCalculationFinished = false;
        } else if (result <= Number.MAX_SAFE_INTEGER) {
          result = result + number;
          memory = memory + number;
        }

        if (result.includes('.')) {
          roundNumber(result);
        }

        checkSize(result);

        showResult();
        cleanButton.element.textContent = 'C';
      }
    }
  }

  class OrangeButton extends Button {
    constructor(element) {
      super(element, 'orange-pressed');
    }
  }

  class OperationButton extends OrangeButton {
    constructor(element, operation) {
      super(element);
      this.element = element;
      this.operation = operation;

      this.element.addEventListener('click', () =>
        pressOperationButton(operation)
      );

      function pressOperationButton() {
        calculateResult();
        addAccion(operation);
      }
    }
  }

  class GrayButton extends Button {
    constructor(element) {
      super(element, 'gray-pressed');
    }
  }

  const oneButton = new NumberButton(
    document.querySelector('div.button.one.lightgray'),
    '1'
  );
  const twoButton = new NumberButton(
    document.querySelector('div.button.two.lightgray'),
    '2'
  );
  const threeButton = new NumberButton(
    document.querySelector('div.button.three.lightgray'),
    '3'
  );
  const fourButton = new NumberButton(
    document.querySelector('div.button.four.lightgray'),
    '4'
  );
  const fiveButton = new NumberButton(
    document.querySelector('div.button.five.lightgray'),
    '5'
  );
  const sixButton = new NumberButton(
    document.querySelector('div.button.six.lightgray'),
    '6'
  );
  const sevenButton = new NumberButton(
    document.querySelector('div.button.seven.lightgray'),
    '7'
  );
  const eightButton = new NumberButton(
    document.querySelector('div.button.eight.lightgray'),
    '8'
  );
  const nineButton = new NumberButton(
    document.querySelector('div.button.nine.lightgray'),
    '9'
  );
  const zeroButton = new NumberButton(
    document.querySelector('div.button.zero.lightgray'),
    '0'
  );

  const pointButton = new LightgrayButton(
    document.querySelector('div.button.point.lightgray')
  );
  pointButton.element.addEventListener('click', pressPointButton);

  const divisionButton = new OperationButton(
    document.querySelector('div.button.division.orange'),
    '/'
  );
  const multiplicationButton = new OperationButton(
    document.querySelector('div.button.multiplication.orange'),
    '*'
  );
  const substarctionButton = new OperationButton(
    document.querySelector('div.button.subtraction.orange'),
    '-'
  );
  const additionButtom = new OperationButton(
    document.querySelector('div.button.addition.orange'),
    '+'
  );

  const equalButton = new OrangeButton(
    document.querySelector('div.button.equal.orange')
  );
  equalButton.element.addEventListener('click', calculateResult);

  const cleanButton = new GrayButton(
    document.querySelector('div.button.clean.gray')
  );
  cleanButton.element.addEventListener('click', pressCleanButton);

  const moduleButton = new GrayButton(
    document.querySelector('div.button.module.gray')
  );
  moduleButton.element.addEventListener('click', pressModuleButton);

  const percentageButton = new GrayButton(
    document.querySelector('div.button.percentage.gray')
  );
  percentageButton.element.addEventListener('click', pressPercentageButton);

  // событие на точку

  function pressPointButton() {
    result = result.toString();
    if (!result.includes('.') && result.length < 10) {
      result = result + '.';
      memory = memory + '.';
    }
    showResult();
  }

  // событие на модуль

  function pressModuleButton() {
    calculateResult();
    if (result !== 0) {
      result = result * -1;
    }
    memory = String(result);
    showResult();
  }

  // событие на проценты

  function pressPercentageButton() {
    calculateResult();
    result = result / 100;
    memory = String(result);
    showResult();
  }

  // событие на очистить

  function pressCleanButton() {
    cleanButton.element.textContent = 'AC';
    result = '0';
    memory = '';
    resultField.classList.remove('smaller');
    showResult();
  }

  // событие на равно

  function calculateResult() {
    if (memory.includes('/')) {
      createArrayOfNumbers('/');
      result = arrayOfNumbers[0] / arrayOfNumbers[1];
      roundNumber(result);

      checkSize(result);

      showResult();
    } else if (memory.includes('*')) {
      createArrayOfNumbers('*');
      result = arrayOfNumbers[0] * arrayOfNumbers[1];
      roundNumber(result);

      checkSize(result);
      showResult();
    } else if (memory.includes('-')) {
      createArrayOfNumbers('-');
      result = arrayOfNumbers[0] - arrayOfNumbers[1];
      roundNumber(result);

      checkSize(result);

      showResult();
    } else if (memory.includes('+')) {
      createArrayOfNumbers('+');
      result = +arrayOfNumbers[0] + +arrayOfNumbers[1];
      roundNumber(result);

      checkSize(result);

      showResult();
    }
    isCalculationFinished = true;
  }
}
