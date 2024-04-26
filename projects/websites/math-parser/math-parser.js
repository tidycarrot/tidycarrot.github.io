// Function definitons

function isWhitespace(c) {
	return c === " "
		|| c === "\n"
		|| c === "\t"
		|| c === "\r"
		|| c === "\f"
		|| c === "\v"
		|| c === "\u00a0"
		|| c === "\u1680"
		|| c === "\u2000"
		|| c === "\u200a"
		|| c === "\u2028"
		|| c === "\u2029"
		|| c === "\u202f"
		|| c === "\u205f"
		|| c === "\u3000"
		|| c === "\ufeff"
};

function isLetter(l) {
	if ((l.charCodeAt(0) >= 65 && l.charCodeAt(0) <= 90) || (l.charCodeAt(0) >= 97 && l.charCodeAt(0) <= 122)) {
		return true;
	}
	else return false;
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

function factorial(num) {
	var result = 1;
	if (num < 1 || Number.isInteger(num) == false) { return undefined; }
	for (var i = 1; i <= num; i++) {
		result *= i;
	}
	return result;
}

// Some definitions
const operators = {
	"+": {
		data: "+",
		precedence: 1,
		associativity: "left",
		opType: "binary",
	},
	"-": {
		data: "-",
		precedence: 1,
		associativity: "left",
		opType: "binary",
	},
	"/": {
		data: "/",
		precedence: 2,
		associativity: "left",
		opType: "binary",
	},
	"*": {
		data: "*",
		precedence: 2,
		associativity: "left",
		opType: "binary",
	},
	"_": {
		data: "_",
		precedence: 2.5,
		associativity: "right",
		opType: "unary",
	},
	"%": {
		data: "%",
		precedence: 2,
		associativity: "left",
		opType: "binary",
	},
	"^": {
		data: "^",
		precedence: 3,
		associativity: "right",
		opType: "binary",
	},
	"!": {
		data: "!",
		precedence: 4,
		associativity: "right",
		opType: "unary",
	},
	"(": {
		opType: "left_br",
		precedence: 0,
		associativity: "food"
	}
}

function precedence(operator) {
	return operators[operator].precedence;
}

function associativity(operator) {
	return operators[operator].associativity;
}

function opType(operator) {
	return operators[operator].opType;
}

function checkNum(tokens, num) {
	if (num != "" && num != undefined) {
		tokens.push({ type: "num", data: num });
		decimal = false;
		return "";
	}
	else {
		return num;
	}
}
// Tokenizing the equation

function tokenize(equation) {

	// Defining variable for output
	// A variable is like a container that stores numbers, words, letters, true/false ect.
	let tokens = [];

	// Defining variable that helps with checking for duplicate decimals in same number
	let decimal = false;

	// A string that temporarily stores numbers until an operator is encountered, then the number is placed on the output pile, which is the thing that is outputed.
	let num = "";

	// Loop through each character
	// A character is a single letter, number, special character or space. They are all represented 
	// by numerical values that are rendered by your device so you can read it 
	for (let i = 0; i < equation.length; i++) {

		// Defining a variable to retrieve the current character in the equation
		let curr = equation[i];

		// Checking if the character is a whitespace, characters that are empty like the space, enter and tab characters 
		// If the character is a whitespace, skip through it until some content in the equation is found
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

		// A switch in programming is basically a lot of "if" and "else" statements neatly bundled in a convenient in-built function.
		// A "if" statement is a piece of code that helps with the run of the code. It works like this: if the equation or thing inside
		// its argument (which is like a paremeter, in a way) is true, the code after the "if" statement is run. Sometimes, after this 
		// conditional code is run, there is an "else" statement which is quite self explanatory, the code below the "else" statement is
		// run when the condition of the "if" statement is not met. In the else statement, you can put another if statement in it,
		// consequently, creating a block of code that checks through things. Therefore,
		// the "switch" statement is a shorthand of this syntax instead of programming a mess.
		switch (curr) {

			// In these first few "cases", we check if the character is an operator.


			case "+": // Addition operator
			case "/": // Division operator
			case "^": // Exponent operator
			case "%": // Modulo operator
			case "*": // Multiplication operator
				num = checkNum(tokens, num);
				tokens.push({ type: "op", data: curr });
				break;

			// Factorial operator
			case "!":
				num = checkNum(tokens, num);
				tokens.push({ type: "fac", data: "!" });
				break;

			// Substraction or negative operator
			case "-":
				if (num !== "" && num !== undefined) {
					tokens.push({ type: "num", data: num });
					num = "";
					decimal = false;
					tokens.push({ type: "op", data: "-" });
				}
				else if (before === undefined) {
					tokens.push({ type: "op", data: "_" });
					break;
				}
				else if ((before.type == "op" || before.type == "left_br") && before.type != "num") {
					tokens.push({ type: "op", data: "_" });
					break;
				}
				break;

			// Next we test the character for if it is a bracket
			case ")":
				num = checkNum(tokens, num);
				tokens.push({ type: "right_br", data: curr });
				break;

			case "(":
				if (before == undefined || before.type == "op") {
					tokens.push({ type: "left_br", data: curr });
					break;
				}
				num = checkNum(tokens, num);
				tokens.push({ type: "op", data: "*" });
				tokens.push({ type: "left_br", data: curr });
				break;

			case ".":
				num += ".";
				if (!decimal) {
					decimal = true;
				}
				else if (decimal) {
					console.log(`Duplicate decimal at ${i}`)
				}
				break;

			// The default is the final "else" statement of the switch where if it goes through all the conditions
			// and not satisfy (match) any of them, it will end up here.
			default:
				if (!isNaN(curr)) { // Check if it is not a number then if it is not, it is a number
					num += curr;
				}
				else {
					console.log(`Unexpected character at ${i}`);
				}

				break;
		}
	}
	num = checkNum(tokens, num);

	return tokens;
}

function shuntingYard(tokens) {
	let output = [];
	let opstack = [];

	for (let i = 0; i < tokens.length; i++) {

		let currToken = tokens[i];

		if (currToken.type == "num") {
			output.push(currToken);
		}
		else if (currToken.type == "op") {
			while (
				opstack.length >= 1 &&
				precedence(opstack[opstack.length - 1].data) > precedence(currToken.data)
			) {
				output.push(opstack.pop());
			}
			opstack.push(currToken);
		}
		else if (currToken.type == "fac") {
			output.push({ type: "fac", data: "!" });
		}
		// Check if it is a left parentheses "("
		else if (currToken.type == "left_br") {
			opstack.push(currToken);
		}
		// Check if it is a right parentheses ")"
		else if (currToken.type == "right_br") {
			// Keep popping operators from the stack until a left parentheses is met
			while (opstack.length >= 1 && opstack[opstack.length - 1].type != "left_br") {
				output.push(opstack.pop());
			}
			if (opstack.length >= 1 && opstack[opstack.length - 1].type == "left_br")
				/* Discard the left parentheses */ opstack.pop();
			else console.log("Mismatched parentheses.");
		}
	}

	// Pop operators from stack and push them to the output queueleft
	while (opstack.length > 0) {
		if (opstack[opstack.length - 1].data == "(") {
			console.log("Mismatched parentheses.");
		}
		output.push(opstack.pop());
	}
	// Return the output queue
	return output;
}

function evaluate(rpn) {
	let output = [];
	for (let i = 0; i < rpn.length; i++) {
		// If it is a number, push it into the output stack
		if (rpn[i].type == "num") {
			output.push(rpn[i]);
		}
		// If it is an operator 
		else if (rpn[i].type == "op" || rpn[i].type == "fac") {

			if (opType(rpn[i].data) == "binary" && output.length >= 2) {
				let rhs = parseFloat(output.pop().data);
				let lhs = parseFloat(output.pop().data);

				switch (rpn[i].data) {
					case "+":
						output.push({ type: "num", data: `${lhs + rhs}` });
						break;
					case "-":
						output.push({ type: "num", data: `${lhs - rhs}` });
						break;
					case "*":
						output.push({ type: "num", data: `${lhs * rhs}` });
						break;
					case "/":
						output.push({ type: "num", data: `${lhs / rhs}` });
						break;
					case "%":
						output.push({ type: "num", data: `${lhs % rhs}` });
						break;
					case "^":
						output.push({ type: "num", data: `${Math.pow(lhs, rhs)}` });
						break;
				}
			}
			else if (opType(rpn[i].data) == "unary") {
				let num = parseFloat(output.pop().data);

				switch (rpn[i].data) {
					case "_":
						output.push({ type: "num", data: `${num * -1}` });
						break;
					case "!":
						output.push({ type: "num", data: `${factorial(num)}` })
						break;
				}
			}
		}
	}
	return output;
}

// Answer funtion
function answer() {
	let input = document.getElementById("infix").value;

	let tokenized = tokenize(input);
	let tokenized_output = "";
	for (let i = 0; i < tokenized.length - 1; i++) {
		tokenized_output += tokenized[i].data;
		tokenized_output += " ";
	} tokenized_output += tokenized[tokenized.length - 1].data;

	let rpn = shuntingYard(tokenized);
	let rpn_output = "";
	for (let i = 0; i < rpn.length - 1; i++) {
		rpn_output += rpn[i].data;
		rpn_output += " ";
	} rpn_output += rpn[rpn.length - 1].data;

	let answer = evaluate(rpn);
	let answer_output = answer[0].data;

	document.getElementById("token").innerHTML = tokenized_output;
	document.getElementById("rpn").innerHTML = rpn_output;
	document.getElementById("answer").innerHTML = answer_output
}

// Pseudocode logic (stolen from Brilliant)

// While there are tokens to be read:
//       Read a token
//       If it"s a number add it to queue
//       If it"s an operator
//              While there"s an operator on the top of the stack with greater precedence:
//                      Pop operators from the stack onto the output queue
//              Push the current operator onto the stack
//       If it"s a left bracket push it onto the stack
//       If it"s a right bracket
//             While there"s not a left bracket at the top of the stack:
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