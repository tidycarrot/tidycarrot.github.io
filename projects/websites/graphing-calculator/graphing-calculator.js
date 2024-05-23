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
	if (num < 1 || Number.isInteger(num) == false) return undefined;
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
		precedence: 3,
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
	},
	/*
	"sin":{
			precedence: 4,
			associativity: "right",
			opType: "unary",
			function: Math.sin,
	},
	"cos":{
			precedence: 4,
			associativity: "right",
			opType: "unary",
			function: Math.cos,
	},
	"tan":{
			precedence: 4,
			associativity: "right",
			opType: "unary",
			function: Math.tan,
	},
	"abs":{
			precedence: 4,	
			associativity: "right",
			opType: "unary",
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

function opType(operator) {
	return operators[operator].opType;
}

// Tokenizing the equation

function tokenize(equation) {

	function checkNum(tokens, num) {
		if (num != "") {
			tokens.push({ type: "num", data: num });
			decimal = false;
			before = tokens[tokens.length - 1];
			return "";
		}
		else {
			return num;
		}
	}

	// Defining variable for output
	// A variable is like a container that stores numbers, words, letters, true/false ect.
	let tokens = [];

	// Defining variable that helps with checking for duplicate decimals in same number
	let decimal = false;

	// A string that temporarily stores numbers until an operator is encountered, then the number is placed on the output pile, which is the thing that is outputed.
	let num = "";

	for (let i = 0; i < equation.length; i++) {

		// Defining a variable to retrieve the current character in the equation
		let curr = equation[i];

		// Checking if the character is a whitespace, characters that are empty like the space, enter and tab characters 
		// If the character is a whitespace, skip through it until some content in the equation is found
		if (isWhitespace(curr))
			continue;

		// // Defining a variable that is the next character in the equation
		// let next = nextCharacter(equation, i);

		// Initialising a variable that is supposed to contain the previous, non-whitespace character. Initialisation means to create the variable,
		// but not to put anything in it so it is left empty. This can be useful to leave the variable empty as it can be a way to handle errors,
		// where it is impossible to have a value, so you can check for the error.
		let before;
		if (tokens.length >= 1) {
			before = tokens[tokens.length - 1];
		} else
			before = { type: "null", data: null };

		switch (curr) {

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
				if (num != "") {
					tokens.push({ type: "num", data: num });
					num = "";
					decimal = false;
					tokens.push({ type: "op", data: "-" });
				} else if (before.type == "var") {
					tokens.push({ type: "op", data: "-" });
				}
				else {
					tokens.push({ type: "op", data: "_" });
				}
				break;

			// Next we test the character for if it is a bracket
			case ")":
				num = checkNum(tokens, num);
				tokens.push({ type: "right_br", data: curr });
				break;

			case "(":
				if (num != "") {
					tokens.push({ type: "num", data: num });
					decimal = false;
					num = "";
					tokens.push({ type: "op", data: "*" });
				}
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
				else if (isLetter(curr)) { // Check if it is a letter, right now I am only implementing single letter variables
					if (num != "") {
						tokens.push({ type: "num", data: num });
						decimal = false;
						num = "";
						tokens.push({ type: "op", data: "*" });
					}

					if (before.type != "null" && (before.type == "right_br" || before.type == "var")) {
						tokens.push({ type: "op", data: "*" });
					}
					tokens.push({ type: "var", data: curr });
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

		if (currToken.type == "num" || currToken.type == "var") {
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
			else {
				console.log("Mismatched parentheses.");
			}
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

function substitute(tokens, variable, value) {
	if (tokens.length == 0)
		return [];

	let output = [];

	for (let i = 0; i < tokens.length; i++) {
		if (tokens[i].type == "var" && tokens[i].data == variable) {
			output.push({ type: "num", data: value.toString() })
		} else {
			output.push(tokens[i])
		}
	}

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
	return output[0].data;
}

// Answer funtion
function answer() {
	let input = document.getElementById("infix").value;

	let tokenized = tokenize(input);
	let tokenized_output = "";
	for (let i = 0; i < tokenized.length; i++) {
		tokenized_output += tokenized[i].data;
		tokenized_output += " ";
	}

	let rpn = shuntingYard(tokenized);
	let rpn_output = "";
	for (let i = 0; i < rpn.length; i++) {
		rpn_output += rpn[i].data;
		rpn_output += " ";
	}

	clearCanvas();
	drawAxis();
	let dimensions = getCanvasDimensions();
	let ctx = getCanvasCtx();
	let zoom = document.getElementById('zoom').value;
	let res = document.getElementById('res').value;
	ctx.strokeStyle = "black";

	function transform(x, y) {
		return { x: x * zoom + dimensions.x / 2, y: -y * zoom + dimensions.y / 2 };
	}

	drawAxisLabels(zoom, dimensions);

	let y = evaluate(substitute(rpn, 'x', dimensions.x / -2));
	let prevPoint = transform(x, y);
	for (var x = dimensions.x / -2 / zoom + 1 / zoom; x < dimensions.x / 2 / zoom; x += 1 / (res * zoom)) {
		y = evaluate(substitute(rpn, 'x', x));
		let point = transform(x, y);

		plotLine(prevPoint, point);
		// plotPoint(point.x, point.y);

		prevPoint = point;
	}

	document.getElementById("token").innerHTML = tokenized_output;
	document.getElementById("rpn").innerHTML = rpn_output;

	console.log("\n")
	console.log(`Input: ${input}`)
	console.log(`Tokenized: ${tokenized_output}`);
	console.log(`RPN: ${rpn_output}`);
}

function plotPoint(x, y, size = 0.1, color = "black") {
	const canvas = document.getElementById("canvas-graph");
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
}

function plotLine(prevPoint, point) {
	let ctx = getCanvasCtx();
	ctx.beginPath();
	ctx.moveTo(prevPoint.x, prevPoint.y);
	ctx.lineTo(point.x, point.y);
	ctx.stroke();
	ctx.closePath();
}

function getCanvasCtx() {
	return document.getElementById("canvas-graph").getContext("2d");
	// const canvas = document.getElementById("canvas-graph");
	// const ctx = canvas.getContext("2d");
	// return ctx;
}

function getCanvasDimensions() {
	const canvas = document.getElementById("canvas-graph");
	return { x: canvas.width, y: canvas.height };
}

function clearCanvas() {
	const canvas = document.getElementById("canvas-graph");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawAxis(x = 0, y = 0) {
	let ctx = getCanvasCtx();
	ctx.beginPath();
	let dimensions = getCanvasDimensions();
	ctx.strokeStyle = "orange";
	ctx.moveTo(dimensions.x / 2, 0);
	ctx.lineTo(dimensions.x / 2, dimensions.y)
	ctx.stroke();
	ctx.moveTo(0, dimensions.y / 2);
	ctx.lineTo(dimensions.x, dimensions.y / 2)
	ctx.stroke();
	ctx.closePath();
}

function drawAxisLabels(zoom, dimensions, amount = 4) {
	let ctx = getCanvasCtx();
	for (let i = 0; i <= dimensions.x / 2; i += /*Math.round*/((dimensions.x / amount / 2) /*/ 10*/)/* * 10*/) {
		let number = i / zoom;
		if (String(number).length > 5) number = number.toExponential(4);
		ctx.fillText(`${number}`, i + dimensions.x / 2, dimensions.y / 2);
		ctx.fillText(`${-number}`, -i + dimensions.x / 2, dimensions.y / 2);
	}
	for (let i = 0; i <= dimensions.y / 2; i += /*Math.round*/((dimensions.y / amount / 2) /*/ 10*/)/* * 10*/) {
		let number = i / zoom;
		if (String(number).length > 5) number = number.toExponential(4);
		ctx.fillText(`${-number}`, dimensions.x / 2, i + dimensions.y / 2);
		ctx.fillText(`${number}`, dimensions.x / 2, -i + dimensions.y / 2);
	}
}

function resize() {
	document.getElementById("canvas-graph").width = window.innerWidth * 0.8;
	document.getElementById("canvas-graph").height = window.innerHeight * 0.6;
}
window.addEventListener("load", () => { resize(); answer(); });
window.addEventListener("resize", () => { resize(); answer(); });