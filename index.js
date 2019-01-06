var calculator = {
  defaultValues: {
    operands: [],
    currentOperator: "",
    inputExpression: '&nbsp;', // Will be used only for displaying
    result: false,
  },
  whiteListConsecutiveOperators: ['+', '-'],
  operators: {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b),
  },
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
    outputContainer.appendChild(displayScreen);
    this.displayScreen = displayScreen;

    const result = document.createElement('div');
    result.className = 'dc-result';
    outputContainer.appendChild(result);
    this.resultNode = result;

    this.reset();

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

    //Appending decimal button in number block
    let decimalButtonNode = document.createElement('button');
    decimalButtonNode.innerText = '.';
    decimalButtonNode.onclick = () => this.numInput(decimalButtonNode.innerHTML);
    numberBlock.appendChild(decimalButtonNode);

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

    //Appending reset button in operator block
    let resetButtonNode = document.createElement('button');
    resetButtonNode.innerText = 'AC ';
    resetButtonNode.className = "Reset";
    resetButtonNode.onclick = this.reset.bind(this);
    operatorBlock.appendChild(resetButtonNode);


    //Create operator button elements inside operator block as children
    for (let key in this.operators) {
      let buttonNode = document.createElement('button');
      buttonNode.innerText = key;
      buttonNode.onclick = () => this.operatorInput(key);
      operatorBlock.appendChild(buttonNode);
    }
  },

  execute: function execute() {
    var opIndex = this.operands.indexOf(this.currentOperator);
    const a = Number(this.operands.slice(0, opIndex).join(''));
    const b = Number(this.operands.slice(opIndex + 1).join(''));
    if (isNaN(a) || isNaN(b)) {
      this.reset();
      this.displayResult("Invalid Input");
      this.displayExpression(this.inputExpression);
    }
    const result = this.operators[this.currentOperator](a, b);
    this.displayResult(result.toString());
    this.result = result;
  },

  equals: function equals() {
    this.inputExpression = Number(this.result).toString();
    this.displayExpression(this.inputExpression);
    this.currentOperator = this.defaultValues.currentOperator;
    this.operands = [this.result.toString()];
    this.result = false;
  },

  reset: function reset() {
    Object.assign(this, this.objectCopy(this.defaultValues));
    this.displayExpression(this.inputExpression);
    this.displayResult("0");
  },

  objectCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },

  numInput: function numInput(x) {
    if (this.inputExpression == "0") this.inputExpression = "";
    this.inputExpression += x.toString();
    this.displayExpression(this.inputExpression);
    this.operands.push(x);
    if(this.currentOperator) this.execute();
  },

  operatorInput: function operatorInput(x) {
    this.inputExpression += x;
    this.displayExpression(this.inputExpression);
    this.checkLastInput(x);
    // this.currentOperator = x;
    if (this.result !== false) this.operands = [this.result.toString()];
    this.operands.push(x);
  },

  checkLastInput: function checkLastInput(x) {
    operandLength = this.operands.length;
    if (isNaN(this.operands[operandLength-1])) return;
    this.currentOperator = x;
  },

  displayExpression: function displayExpression(x) {
    x += /\d+[\+\*-\^\/\.]\d+$/g.test(x) ? ' = ': '';
    this.displayScreen.innerHTML = x;
  },

  displayResult: function displayResult(x) {
    this.resultNode.innerHTML = x;
  }
};
