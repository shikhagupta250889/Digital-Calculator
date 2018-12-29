var calculator = {
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  operators: ["=", "+", "*", "/", "^"],
  num: 0,
  numCount: 0,
  op: "",
  displayOutput: "",

  add: function add(a) {
    if (this.numCount === 2) {
      this.num+= a;
      resultDisplay(this.num)
    }
    else display(this.num,op);
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

  numInput: function numInput(x) {
    this.num = x;
    this.numberCount()
    display(this.num);
  },

  opInput: function opInput(x) {
    this.op = x;
    display(this.op);
    this.add()
  },

  numberCount: function numberCount() {
    if (this.numCount < 2) this.numCount++;
    else this.numCount--;
  }
}

function display(x) {
  // if (numCount <= 1) displayOutput = num + op;
  // else
  calculator.displayOutput = calculator.displayOutput.concat(x);
  document.getElementsByClassName('displayscreen')[0].innerHTML = calculator.displayOutput;
}

function resultDisplay(x) {
  document.getElementsByClassName('result')[0].innerHTML = x;
}
