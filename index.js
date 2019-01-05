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

  init: function (calculatorContainer) {
    // Create the below two commented nodes inside mainBoundary in javascript below.
    // <div class="dc-displayscreen">0</div>
    // <div class="dc-result"></div>
    const mainBoundary = document.createElement('div');
    mainBoundary.className = 'main-boundary';
    calculatorContainer.appendChild(mainBoundary);

    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-container';
    mainBoundary.appendChild(outputContainer);

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    mainBoundary.appendChild(inputContainer);

    const displayScreen = document.createElement('div');
    displayScreen.className = 'dc-displayscreen';
    displayScreen.innerHTML = '&nbsp;';
    outputContainer.appendChild(displayScreen);
    this.displayScreen = displayScreen;

    const result = document.createElement('div');
    result.className = 'dc-result';
    result.innerText = '0';
    outputContainer.appendChild(result);
    this.resultNode = result;

    // Create the numberblock node and append it to main boundary node
    const numberBlock = document.createElement('div');
    numberBlock.className = 'number-block';
    inputContainer.appendChild(numberBlock);

    // create number button elements inside numberBlock as children
    for (let i = 0; i < 10; i++) {
      let buttonNode = document.createElement('button');
      buttonNode.innerText = i;
      buttonNode.onclick = () => this.numInput(buttonNode.innerHTML);
      numberBlock.appendChild(buttonNode);
    }

    // Create the operatorblock node and append it to main boundary node
    const operatorBlock = document.createElement('div');
    operatorBlock.className = 'operator-block';
    inputContainer.appendChild(operatorBlock);

    // document.querySelector('.operatorblock');
    // Appending '=' button in operator block
    let buttonNode = document.createElement('button');
    buttonNode.innerText = '=';
    buttonNode.onclick = this.equals.bind(this);
    operatorBlock.appendChild(buttonNode);

    //Create operator button elements inside operator block as children
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
    this.displayResult(result.toString());
    this.result = result;
  },

  equals: function equals() {
    this.inputExpression = Number(this.result).toString();
    this.displayExpression(this.inputExpression);
    this.currentOperator = "";
    this.operands = [this.result.toString()];
    this.result = false;
  },

  numInput: function numInput(x) {
    if (this.inputExpression == "0") this.inputExpression = "";
    this.inputExpression += x.toString();
    this.displayExpression(this.inputExpression);
    this.operands.push(x);
    if(this.currentOperator) this.execute();
  },

  operatorInput: function operatorInput(x) {
    this.inputExpression += this.operators[x];
    this.displayExpression(this.inputExpression);
    this.currentOperator = x;
    if (this.result !== false) this.operands = [this.result.toString()];
    this.operands.push(x);
  },

  displayExpression: function displayExpression(x) {
    x += /\d+[\+\*-\^\/]\d+$/g.test(x) ? ' = ': '';
    this.displayScreen.innerHTML = x;
  },

  displayResult: function displayResult(x) {
    this.resultNode.innerHTML = x;
  }
};
