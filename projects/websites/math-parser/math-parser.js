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

/*
function isLetter(l) {
	if (l.charCodeAt(0)>=65 && l.charCodeAt(0)<=122){
		return true;
	}
	else return false;
}
*/

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
		type: 'op',
		data: '+',
		precedence: 1,
		associativity: "left",
		type: "binary",
	},
	'-': {
		type: 'op',
		data: '-',
		precedence: 1,
		associativity: "left",
		type: "binary",
	},
	'/': {
		type: 'op',
		data: '/',
		precedence: 2,
		associativity: "left",
		type: "binary",
	},
	'*': {
		type: 'op',
		data: '*',
		precedence: 2,
		associativity: "left",
		type: "binary",
	},
	'_': {
		type: 'op',
		data: '_',
		precedence: 1,
		associativity: "right",
		type: "unary",
	}
	/*
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
}

function precedence(operator) {
	return operators[operator].precedence;
}

function associativity(operator) {
	return operators[operator].associativity;
}

// Tokenizing the equation

function tokenize(equation) {

	// Defining variable for output
	// A variable is like a container that stores numbers, words, letters, true/false ect.
	let tokens = [];

	// Defining variable that helps with checking for duplicate decimals in same number
	let decimal = false;

	// A string that temporarily stores numbers until an operator is encountered, then the number is placed on the output pile, which is the thing that is supposed to be outputed.
	let num = "";

	// Loop through each character
	// A character is a single letter, number, special character or space. They are all represented 
	// by numerical values that are rendered by your device so you can read it 
	for (let i = 0; i < equation.length; i++) {

		// Defining a variable to retrieve the current character in the equation
		let curr = equation[i];

		// Checking if the character is a whitespace, characters that are empty like the space, enter and tab characters 
		// (yes, they are indeed considered a character) If the character is a whitespace, skip through it until some content in the equation is found
		if (isWhitespace(curr))
			continue;

		// Defining a variable that is the next character in the equation
		let next = nextCharacter(equation, i);

		// Initialising a variable that is supposed to contain the previous, non-whitespace character. Initialisation means to create the variable,
		// but not to put anything in it so it is left empty. This can be useful to leave the variable empty as it can be a way to handle errors,
		// where it is impossible to have a value, so you can check for the error.
		let before;
		if (tokens.length >= 1) {
			before = tokens[tokens.length - 1];
		}

		// A switch in programming is basically a lot of 'if' and 'else' statements neatly bundled in a convenient in-built function.
		// A 'if' statement is a piece of code that helps with the run of the code. It works like this: if the equation or thing inside
		// its argument (which is like a paremeter, in a way) is true, the code after the 'if' statement is run. Sometimes, after this 
		// conditional code is run, there is an 'else' statement which is quite self explanatory, the code below the 'else' statement is
		// run when the condition of the 'if' statement is not met. In the else statement, you can put another if statement in it,
		// consequently, creating a block of code that checks through things. (e.g. You have a banana. You check if it is a apple, if it
		// is, you bite it. If it is a blueberry, you eat the whole thing. Lastly, if it is a banana, you peel it and eat it.) Therefore,
		// the 'switch' statement is a shorthand of this syntax instead of programming this mess of code.
		switch (curr) {

			// In these first few 'cases', we check if the character is an operator.
			case '+':
				if (num !== "" && num !== undefined) {
					tokens.push({ type: 'num', data: num });
					num = "";
				}
				tokens.push({ type: 'op', data: '+' });
				decimal = false;
				break;
			case '/':
			case '÷':
				if (num !== "" && num !== undefined) {
					tokens.push({ type: 'num', data: num });
					num = "";
				}
				tokens.push({ type: 'op', data: '/' });
				decimal = false;
				break;
			case '*':
			case '×':
				if (num !== "" && num !== undefined) {
					tokens.push({ type: 'num', data: num });
					num = "";
				}
				else if (before === undefined) {
					console.log(`Operator error at ${i}`)
					break;
				}
				else if ((before.type === 'op' || before.type === 'left_br') && before.type != 'num') {
					console.log(`Operator error at ${i}`)
					break;
				}
				tokens.push({ type: 'op', data: '*' });
				decimal = false;
				break;
			case '-':
				if (num !== "" && num !== undefined) {
					tokens.push({ type: 'num', data: num });
					num = "";
					decimal = false;
					tokens.push({ type: 'op', data: '-' });
				}
				else if (before === undefined) {
					tokens.push({ type: 'op', data: '_' });
				}
				else if ((before.type === 'op' || before.type === 'left_br') && before.type != 'num') {
					tokens.push({ type: 'op', data: '_' });
				}
				break;

			// Next we test the character for if it is a bracket
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

			// The default is the final 'else' statement of the switch where if it goes through all the conditions
			// and not satisfy (match) any of them, it will end up here.
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

				if (i == equation.length - 1) {
					tokens.push({ type: 'num', data: num });
					num = "";
					decimal = false;
				}
				break;
		}
	}

	return tokens;
}

function shuntingYard(tokens) {
	let output = [];
	let opstack = [];
	// While there are tokens
	for (let i = 0; i <= tokens.length; i++) {
		// Check if the token is a number, if so, push to the output queue 
		if (tokens[i].type == "num") {
			output.push(tokens[i]);
		}
		// Check if the token is an operator
		else if (tokens[i].type == "op") {

			while (/* Operator stack is not empty */(opstack.length >= 1) && 
			/* Compare precedence of current operator and operator at top of stack */precedence(opstack[opstack.length - 1].data >= precedence(tokens[i].data)) && 
			/* Check if left associative */(associativity(tokens[i].data) == "left")) 
			{
				output.push(opstack.pop());
			}
			while (/* Operator stack is not empty */(opstack.length >= 1) && 
			/* Compare precedence of current operator and operator at top of stack */precedence(opstack[opstack.length - 1].data > precedence(tokens[i].data)) && 
			/* Check if right associative */(associativity(tokens[i].data) == "left")) 
			{
				output.push(opstack.pop());
			}
			opstack.push(tokens[i]);
		}
		// Check if it is a left parentheses '('
		else if (tokens.type == "left_br") 
		{
			opstack.push(tokens[i]);
		}
		// Check if it is a right parentheses ')'
		else if (tokens.type == "right_br"){
			while (opstack[opstack.length - 1].type != "left_br"){
				
			}
		}
	}
}

// Pseudocode logic (stolen from Brilliant)

// While there are tokens to be read:
//       Read a token
//       If it's a number add it to queue
//       If it's an operator
//              While there's an operator on the top of the stack with greater precedence:
//                      Pop operators from the stack onto the output queue
//              Push the current operator onto the stack
//       If it's a left bracket push it onto the stack
//       If it's a right bracket
//             While there's not a left bracket at the top of the stack:
//                     Pop operators from the stack onto the output queue.
//             Pop the left bracket from the stack and discard it
// While there are operators on the stack, pop them to the queue



// Pseudocode logic (stolen from Wikipedia)
//
// /* The functions referred to in this algorithm are simple single argument functions such as sine, inverse or factorial. */
// /* This implementation does not implement composite functions, functions with a variable number of arguments, or unary operators. */
//
// while there are tokens to be read:
//     read a token
// if the token is:
// - a number:
//         put it into the output queue
// 	- a function:
// 	push it onto the operator stack
// 		- an operator o1:
// while (
// 	there is an operator o2 at the top of the operator stack which is not a left parenthesis,
// 		and(o2 has greater precedence than o1 or(o1 and o2 have the same precedence and o1 is left - associative))
//         ):
//             pop o2 from the operator stack into the output queue
//         push o1 onto the operator stack
// 	- a ",":
// while the operator at the top of the operator stack is not a left parenthesis:
//              pop the operator from the operator stack into the output queue
// 	- a left parenthesis(i.e. "("):
//         push it onto the operator stack
// 	- a right parenthesis(i.e. ")"):
// while the operator at the top of the operator stack is not a left parenthesis:
// {assert the operator stack is not empty }
//             /* If the stack runs out without finding a left parenthesis, then there are mismatched parentheses. */
//             pop the operator from the operator stack into the output queue
// {assert there is a left parenthesis at the top of the operator stack }
//         pop the left parenthesis from the operator stack and discard it
// if there is a function token at the top of the operator stack, then:
//             pop the function from the operator stack into the output queue
// /* After the while loop, pop the remaining items from the operator stack into the output queue. */
// while there are tokens on the operator stack:
// /* If the operator token on the top of the stack is a parenthesis, then there are mismatched parentheses. */
// {assert the operator on top of the stack is not a(left) parenthesis }
//     pop the operator from the operator stack onto the output queue
//