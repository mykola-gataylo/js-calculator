class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString();
        return this.currentOperand;
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        switch (this.operation) {
            case '+':
                computation = parseFloat(eval(prev + current).toPrecision(12));
                break;
            case '-':
                computation = parseFloat(eval(prev - current).toPrecision(12));
                break;
            case '*':
                computation = parseFloat(eval(prev * current).toPrecision(12));
                break;
            case '/':
                computation = parseFloat(eval(prev / current).toPrecision(12));
                if (computation === Infinity || computation === -Infinity) {
                    computation = '';
                }
                break;
            case '%':
                computation = parseFloat(eval(prev % current).toPrecision(12));
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits;
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (currentOperandDisplay.value.length > 6 && currentOperandDisplay.value.length <= 13) {
            currentOperandDisplay.style.fontSize = '30px';
        } else if (currentOperandDisplay.value.length > 13) {
            currentOperandDisplay.style.fontSize = '20px';
        } else {
            currentOperandDisplay.style.fontSize = '50px';
        }

        this.currentOperandDisplay.value =
            this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandDisplay.value =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandDisplay.value = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandDisplay = document.form.operation;
const currentOperandDisplay = document.form.result;

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
