document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (previousInput && operator) {
                        currentInput = evaluate(previousInput, currentInput, operator);
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                    display.textContent = `${previousInput} ${operator}`;
                }
            } else {
                currentInput += value;
                display.textContent = `${previousInput} ${operator} ${currentInput}`.trim();
            }
        });
    });

    function evaluate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            default: return '';
        }
    }
});
