const clearButton = document.querySelector('[data-clear]');
const numberButtons = document.querySelectorAll('[data-key]')
const equal = document.querySelector('[data-equal]');
const operation = document.form.operation;
const result = document.form.result;

function appendNumber(number) {
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
});