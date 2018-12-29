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
  currentOperator: "",
  output: '',
  result: 0,

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
    resultDisplay(result.toString());
    this.result = result;
    // this.operands = [result];
  },

  equals: function equals() {
    this.output = this.result.toString();
    display(this.output);
  },

  numInput: function numInput(x) {
    this.output += x.toString();
    display(this.output);
    this.operands.push(x);
    if(this.currentOperator) this.execute();
  },

  operatorInput: function operatorInput(x) {
    this.output += this.operators[x];
    display(this.output);
    this.currentOperator = x;
    if (this.result) this.operands = [this.result.toString()];
    this.operands.push(x);
  }
};

function display(x) {
  document.getElementsByClassName('displayscreen')[0].innerHTML = x;
}

function resultDisplay(x) {
  document.getElementsByClassName('result')[0].innerHTML = `Answer = ${x}`;
}
