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

  init: function () {
    const mainBoundary = document.querySelector('.mainboundary');
    // Access the numberblock node and create number button elements inside it as children
    const numberBlock = document.createElement('div');
    mainBoundary.appendChild(numberBlock);
    // numberBlock.classname = '.numberBlock';
    for (let i = 0; i < 10; i++) {
      let buttonNode = document.createElement('button');
      buttonNode.innerText = i;
      buttonNode.onclick = () => this.numInput(buttonNode.innerHTML);
      numberBlock.appendChild(buttonNode);
    }
    // Access the operatorblock node
    const operatorBlock = document.createElement('div');
    mainBoundary.appendChild(operatorBlock);

    // document.querySelector('.operatorblock');
    // Appending '=' button in operator block
    let buttonNode = document.createElement('button');
    buttonNode.innerText = '=';
    buttonNode.onclick = this.equals.bind(this);
    operatorBlock.appendChild(buttonNode);
    //Create operator button elements inside operator block
    for (let key in this.operators) {
      let buttonNode = document.createElement('button');
      buttonNode.innerText = this.operators[key];
      buttonNode.onclick = () => this.operatorInput(key);
      operatorBlock.appendChild(buttonNode);
    }
  },

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
    const a = Number(this.operands.slice(0, opIndex).join(''));
    const b = Number(this.operands.slice(opIndex + 1).join(''));
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
