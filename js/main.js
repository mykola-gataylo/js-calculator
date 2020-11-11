const clearButton = document.querySelector('[data-clear]');
const numberButtons = document.querySelectorAll('[data-key]')
const equal = document.querySelector('[data-equal]');
const operation = document.form.operation;
const result = document.form.result;

function appendNumber(number) {
    if (operation.value.length > 15) {
        operation.style.fontSize = '15px';
    }

    if (operation.value.length < 15) {
        operation.style.fontSize = '25px';
    }

    operation.value += number;
}

clearButton.addEventListener('click', () => {
    operation.value = "";
    result.value = "";
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

equal.addEventListener('click', () => {
    if (operation.value) {
        result.value = parseFloat(eval(operation.value).toPrecision(12));
    }

    if (result.value == Infinity || result.value == -Infinity) {
        result.value = 'Divide by zero';
        operation.value = '';
    }

    if (result.value.length > 8) {
        result.style.fontSize = '30px';
    } else {
        result.style.fontSize = '50px';
    }

    // result.value.length < 8 ? result.style.fontSize = '50px' :  result.style.fontSize = '30px';
});