document.addEventListener("DOMContentLoaded", function () {
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

// Get reference to the display screens
const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');

// Get references to all buttons
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equalsBtn');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const pointButton = document.getElementById('pointBtn');

// Add click event listeners to all number buttons
numberButtons.forEach((button) => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

// Add click event listeners to all operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => setOperation(button.textContent));
});

// Add click event listener to the equals button
equalsButton.addEventListener('click', evaluate);

// Add click event listener to the clear button
clearButton.addEventListener('click', clear);

// Add click event listener to the delete button
deleteButton.addEventListener('click', deleteNumber);

// Add click event listener to the point button
pointButton.addEventListener('click', appendPoint);

// Function to append a number to the current operation screen
function appendNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }
  currentOperationScreen.textContent += number;
}

// Function to reset the current operation screen
function resetScreen() {
  currentOperationScreen.textContent = '';
  shouldResetScreen = false;
}

// Function to handle the clear button click
function clear() {
  currentOperationScreen.textContent = '0';
  lastOperationScreen.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}

// Function to append a decimal point
function appendPoint() {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (currentOperationScreen.textContent === '') {
    currentOperationScreen.textContent = '0';
  }
  if (currentOperationScreen.textContent.includes('.')) {
    return;
  }
  currentOperationScreen.textContent += '.';
}

// Function to delete the last digit from the current operation screen
function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1);
}

// Function to set the operation
function setOperation(operator) {
  if (currentOperation !== null) {
    evaluate();
  }
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

// Function to evaluate the current operation
function evaluate() {
  if (currentOperation === null || shouldResetScreen) {
    return;
  }
  if (currentOperation === '/' && currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  const result = roundResult(operate(currentOperation, parseFloat(firstOperand), parseFloat(secondOperand)));
  currentOperationScreen.textContent = result;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  // Update firstOperand to the result for chaining operations
  firstOperand = result.toString();
  currentOperation = null;
}

// Function to round the result
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

// Function to perform the operation
function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      if (b === 0) {
        return null;
      } else {
        return divide(a, b);
      }
    default:
      return null;
  }
}
});