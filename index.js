var calculator = {
  // numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  // operators: ["=", "+", "*", "/", "^"],
  operators: {
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
    exponential: '^'
  },
  operands: [],
  operator: "",
  output: '',

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
    var opIndex = this.operands.indexOf(this.operator);
    const a = Number(this.operands.slice(0,opIndex).join(''));
    const b = Number(this.operands.slice(opIndex+1).join(''));
    const result = this[this.operator](a, b);
    this.output = result.toString();
    display(this.output);
    this.operands = [result];
  },

  numInput: function numInput(x) {
    this.operands.push(x);
    this.output += x.toString();
    display(this.output);
  },

  operatorInput: function operatorInput(x) {
    this.operator = x;
    this.operands.push(x);
    this.output += this.operators[x];
    display(this.output);
  },

  numberCount: function numberCount() {
    if (this.numCount < 2) this.numCount++;
    else this.numCount--;
  }
};

function display(x) {
  document.getElementsByClassName('displayscreen')[0].innerHTML = x;
}

function resultDisplay(x) {
  document.getElementsByClassName('result')[0].innerHTML = x;
}
