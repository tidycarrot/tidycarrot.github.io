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

// Returns next non-whitespace after array[current], or null if none
function nextCharacter(array, current) {
    for (let i = current; i < array.length; i++) {
        if (isWhitespace(array[i]))
            continue;
        return array[i];
    }
    return null;
}

const operators = {
    '+': {
        precedence: 1,
        associativity: "left",
        type: "binary",
    },
    '-': {
        precedence: 1,
        associativity: "left",
        type: "binary",
    },
    '/': {
        precedence: 2,
        associativity: "left",
        type: "binary",
    },
    '*': {
        precedence: 2,
        associativity: "left",
        type: "binary",
    },/*
    '%':{
        precendence: 2,
        associativity: "left",
        type: "binary",
    },
    '^':{
        precendence: 3,
        associativity: "right",
        type: "binary",
    },
    '!':{
        precendence: 4,
        associativity: "left",
        type: "unary",
    },
    'sin':{
        precendence: 4,
        associativity: "right",
        type: "unary",
        function: Math.sin,
    },
    'cos':{
        precendence: 4,
        associativity: "right",
        type: "unary",
        function: Math.cos,
    },
    'tan':{
        precendence: 4,
        associativity: "right",
        type: "unary",
        function: Math.tan,
    },
    'abs':{
        precedence: 4,
        associativity: "right",
        type: "unary",
        function: Math.abs,
    }
    */


};

function tokenize(equation) {
    let tokens = [];
    let decimal = false;
    let num;

    for (let i = 0; i <= equation.length; i++) {

        let curr = equation[i];
        if (isWhitespace(curr))
            continue;
        let next = nextCharacter(equation, i);

        switch (curr) {

            case '+':
            case '-':
            case '/':
            case '*':
            case ')':
                tokens.push({ type: 'op', data: curr });
                decimal = false;
                break;
            case '(':
                if (!isNaNtokens[-1]) {
                    tokens.push({ type: 'num', data: curr });
                    decimal = false;
                    break;
                } else {
                    tokens.push({ type: 'op', data: curr });
                    decimal = false;
                    break;
                }
                break;
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