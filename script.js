let operand1 = null;
let operand2 = null;
let operator = null;
let glitchMode = false;
let log = [];

let wrongResults = {};

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.num, .op');
const logDisplay = document.querySelector('.log');

const VALID_RESULT_DURATION = 1 * 60 * 1000;

const clearCache = () => {
  const now = new Date().getTime();
  for (const key in wrongResults) {
    if (now - wrongResults[key].time > VALID_RESULT_DURATION || key === operator) {
      delete wrongResults[key];
    }
  }
};
const currentDate = new Date(Date.now());
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('num')) {
      if (operator === null) {
        operand1 = (operand1 === null) ? button.textContent : operand1 + button.textContent;
        display.value = '';
        display.value = operand1;
      } else {
        operand2 = (operand2 === null) ? button.textContent : operand2 + button.textContent;
        display.value = '';
        display.value = operand2;
      }
    } else if (button.classList.contains('op')) {
      if (button.textContent === 'C') {
        operand1 = null;
        operand2 = null;
        operator = null;
        display.value = null;
      } else if (button.textContent === '=') {
        if (operand1 !== null && operand2 !== null && operator !== null) {
          let result = null;
          let res = null;
          let mathr = glitchMode;
          const key = `${operand1}${operator}${operand2}`;
          const randomError = Math.random() < 0.3 ? Math.floor(Math.random() * 10) - 5 : 0;
          if (operator === '+') {
            if (wrongResults[key] && (new Date().getTime() - wrongResults[key].time.getTime()) <= VALID_RESULT_DURATION) {
              res = wrongResults[key].result;
              log.push(`${new Date().toLocaleString()} ${operand1} + ${operand2} = ${res}`);
            } else {
              result = Number(operand1) + Number(operand2) + randomError;              
              res = result;
              wrongResults[key] = { result: res, time: new Date() };
              log.push(`${new Date().toLocaleString()} ${operand1} + ${operand2} = ${res} `);

            }
          } else if (operator === '-') {
            if (wrongResults[key] && (new Date().getTime() - wrongResults[key].time.getTime()) <= VALID_RESULT_DURATION) {
              res = wrongResults[key].result;
              log.push(`${new Date().toLocaleString()} ${operand1} - ${operand2} = ${res}`);
            } else {
              result = Number(operand1) - Number(operand2) + randomError;              
              res = result;
              wrongResults[key] = { result: res, time: new Date() };
              log.push(`${new Date().toLocaleString()} ${operand1} - ${operand2} = ${res} `);
            }
          } else if (operator === '*') {
            if (wrongResults[key] && (new Date().getTime() - wrongResults[key].time.getTime()) <= VALID_RESULT_DURATION) {
              res = wrongResults[key].result;
              log.push(`${new Date().toLocaleString()} ${operand1} * ${operand2} = ${res}`);
            } else {
              result = Number(operand1) * Number(operand2) + randomError;              
              res = result;
              wrongResults[key] = { result: res, time: new Date() };
              log.push(`${new Date().toLocaleString()} ${operand1} * ${operand2} = ${res} `);
            }
          } else if (operator === '/') {
            if (wrongResults[key] && (new Date().getTime() - wrongResults[key].time.getTime()) <= VALID_RESULT_DURATION) {
              res = wrongResults[key].result;
              log.push(`${new Date().toLocaleString()} ${operand1} / ${operand2} = ${res}`);
            } else {
              result = Number(operand1) / Number(operand2) + randomError;
              res = result;
              wrongResults[key] = { result: res, time: new Date() };
              log.push(`${new Date().toLocaleString()} ${operand1} / ${operand2} = ${res} `);
            }
          }
          display.value = res;
          operand1 = null;
          operand2 = null;
          operator = null
          // console.log(res);

          logDisplay.innerHTML = log.map((entry) => `<div> ${entry} </div>`).join('');

          console.log(new Date() + '\n' + log.join('\n'));


        } else {
          display.value = '';
        }
      } else {
        operator = button.textContent;
        display.value = operator;
      }

    }
  });
});