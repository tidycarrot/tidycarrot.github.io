// This is just the parser, not the graphing calculator

let input = document.getElementById('input');
let output = document.getElementById('output');

function isWhitespace(c) {
    return c === ' '
        || c === '\n'
        || c === '\t'
        || c === '\r'
        || c === '\f'
        || c === '\v'
        || c === '\u00a0'
        || c === '\u1680'
        || c === '\u2000'
        || c === '\u200a'
        || c === '\u2028'
        || c === '\u2029'
        || c === '\u202f'
        || c === '\u205f'
        || c === '\u3000'
        || c === '\ufeff'
}

const op_precedence = {
    '+': 1,

};

function tokenize(equation) {
    let tokens = [];
    let decimal = false;
    let num;

    for (let i = 0; i < equation.length; i++) {

        let curr = equation[i];
        if (isWhitespace(curr))
            continue;
        let next;

        if (curr < equation.length) next = equation[i + 1];
        else next = null;

        switch (curr) {
            case '^':
            case '+':
            case '-':
            case '/':
            case '*':
            case '%':
            case '!':
            case ')':
                tokens.push({ type: 'op', data: curr });
                decimal = false;
                break;
            case '(':
                if (!isNaN(equation[i]))
            default:
                if (!isNaN(curr)) {
                    num += curr;
                } else if (curr === '.') {
                    num += '.';
                    if (!decimal) {
                        decimal = true;
                    }
                    else if (decimal) {
                        console.log(`Unexpected at ${i}`)
                    }
                }
                break;
        }
    }

    return tokens;
}