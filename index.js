var calculator = {
  operators: {
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
    exponential: '^'
  },
  operands: [],
  currentOperator: "",
  inputExpression: '', // Will be used only for displaying
  result: false,

  add: function add(a, b) {
    return a + b;
  },

  subtract: function subtract(a,b) {
    return a - b;
  },

  multiply: function multiply(a,b) {
    return a * b;
  },

  divide: function divide(a,b) {
    return a / b;
  },

  exponential: function exponential(a,b) {
    return Math.pow(a, b);
  },

  execute: function execute() {
    var opIndex = this.operands.indexOf(this.currentOperator);
    const a = Number(this.operands.slice(0,opIndex).join(''));
    const b = Number(this.operands.slice(opIndex+1).join(''));
    const result = this[this.currentOperator](a, b);
    displayResult(result.toString());
    this.result = result;
  },

  equals: function equals() {
    this.inputExpression = Number(this.result).toString();
    displayExpression(this.inputExpression);
  },

  numInput: function numInput(x) {
    this.inputExpression += x.toString();
    displayExpression(this.inputExpression);
    this.operands.push(x);
    if(this.currentOperator) this.execute();
  },

  operatorInput: function operatorInput(x) {
    this.inputExpression += this.operators[x];
    displayExpression(this.inputExpression);
    this.currentOperator = x;
    if (this.result !== false) this.operands = [this.result.toString()];
    this.operands.push(x);
  }
};

function displayExpression(x) {
  document.getElementsByClassName('displayscreen')[0].innerHTML = x;
}

function displayResult(x) {
  document.getElementsByClassName('result')[0].innerHTML = `Answer = ${x}`;
}
