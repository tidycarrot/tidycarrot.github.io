// This is a math parser using a LR algorithm called the Shunting Yard algorithm.

// Function definitons

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

// Answer funtion
function answer() {
		let input = document.getElementById("input").value;
		let output_token = document.querySelector("#output_token").innerHTML;
		let output_rpn = document.querySelector("#output_rpn");
		let output_answer = document.querySelector("#output_answer");
		let tokenized = tokenize(input);
		let tokenized_output = "";
		tokenized_output += tokenized[4].data;
		output_token = tokenized_output;
}

// Some definitions
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
		},
		'*'/*
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
		let num = "";

		for (let i = 0; i < equation.length; i++) {

				let curr = equation[i];
				if (isWhitespace(curr))
						continue;
				let next = nextCharacter(equation, i);

				let before;
				if (tokens.length >= 1) {
						before = tokens[tokens.length - 1];
				}

				switch (curr) {

						case '+':
                 if (num !== "" && num !== undefined) {
										tokens.push({ type: 'num', data: num });
										num = "";
								}
                if (before.type == 'op') break;
								tokens.push({ type: 'op', data: curr });
								decimal = false;
								break;
						case '/':
								if (num !== "" && num !== undefined) {
										tokens.push({ type: 'num', data: num });
										num = "";
								}
								tokens.push({ type: 'op', data: curr });
								decimal = false;
								break;
						case '*':
						case '×':
								if (num !== "" && num !== undefined) {
										tokens.push({ type: 'num', data: num });
										num = "";
								}
								tokens.push({ type: 'op', data: '*' });
								decimal = false;
								break;
						case '-':
								if (before == undefined || before.type == 'op' || before.type == 'left_br') {
										tokens.push({ type: 'op', data: '_' });
								} else {
										if (num !== "" && num !== undefined) {
												tokens.push({ type: 'num', data: num });
												num = "";
										}
										tokens.push({ type: 'op', data: '-' });
								}
								break;

						case ')':
								if (num !== "" && num !== undefined) {
										tokens.push({ type: 'num', data: num });
										num = "";
								}
								tokens.push({ type: 'right_br', data: curr });
								decimal = false;
								break;
						case '(':
								if (num !== "" && num !== undefined) {
										tokens.push({ type: 'num', data: num });
										tokens.push({ type: 'op', data: '*' });
										tokens.push({ type: 'left_br', data: curr });
										num = "";
										decimal = false;
								} else {
										tokens.push({ type: 'left_br', data: curr });
										decimal = false;
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
												console.log(`Duplicate decimal at ${i}`)
										}
								} else {
										console.log(`Unexpected character at ${i}`);
								}
								break;
				}
		}

		return tokens;
}

function evaluate (){
    
}