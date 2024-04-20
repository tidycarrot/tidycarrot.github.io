let num1 = "0";
let num2 = "";
let operator = "";
let output = "0";
let decimalplace = false;
let afterevaluate = false;

function display() {

    output = num1;

    if (operator != "") {

        switch (operator) {

            case 1: output += "+"; break;
            case 2: output += "-"; break;
            case 3: output += "×"; break;
            case 4: output += "÷"; break;
            case 5: output += "^"; break;
            case 6: output += "%"; break;

        }

    }
    if (num2 != "") {
        output += num2;
    }

    //##############################################################

    document.querySelector("#output").innerHTML = output;
}

function operators(op) {

    if (num2 != "") {
        let val1 = parseFloat(num1);
        let val2 = parseFloat(num2);

        switch (operator) {

            case 1: val1 += val2; break;
            case 2: val1 -= val2; break;
            case 3: val1 *= val2; break;
            case 4: val1 /= val2; break;
            case 5: val1 **= val2; break;
            case 6: val1 %= val2; break;

        }

        // Round to 8 decimal places :)
        num1 = Math.round((val1 + Number.EPSILON) * (10 ** 8)) / (10 ** 8);
        num1 = num1.toString();

    }

    operator = op;
    num2 = "";

    decimalplace = false;

    display();

}

function changesign() {

    if (operator == "") {
        if (num1[0] != "-")
            num1 = "-" + num1;
        else num1 = num1.slice(1);
    }
    if (operator != "" && num2 == "") {
        num2 = "-";
    }
    else if (operator != "" && num2 != "" && num2 == "-") {
        num2 = "";
    }
    if (operator != "" && num2 != "" && num2 != "-") {
        if (num2[0] != "-")
            num2 = "-" + num2;
        else num2 = num2.slice(1);
    }

    display();

}

function adddecimal() {

    if (num2 == "" && operator != "") {
        num2 = "0.";
        decimalplace = true;
    }

    if (operator == "" && num2 == "" && afterevaluate == false) {
        if (decimalplace == false) {
            num1 += ".";
            decimalplace = true;
        }
    }

    if (operator == "" && num2 == "" && afterevaluate == true) {
        if (decimalplace == false) {
            num1 = "0.";
            decimalplace = true;
            afterevaluate = false;
        }
    }

    else if (operator != "" && num2 != "") {
        if (decimalplace == false) {
            num2 += ".";
            decimalplace = true;
        }
    }

    display();
}

function equal() {

    if (num2 != "") {

        let val1 = parseFloat(num1);
        let val2 = parseFloat(num2);

        switch (operator) {

            case 1: val1 += val2; break;
            case 2: val1 -= val2; break;
            case 3: val1 *= val2; break;
            case 4: val1 /= val2; break;
            case 5: val1 **= val2; break;
            case 6: val1 %= val2; break;

        }

        // Round to 8 decimal places :)
        num1 = Math.round(val1 * (10 ** 8)) / (10 ** 8);
        num1 = num1.toString();
    }

    operator = "";
    num2 = "";

    afterevaluate = true;

    display();

}

function number(num) {
    num = num.toString();
    if (afterevaluate == true && operator == "") {
        num1 = num;
        afterevaluate = false;
    } else {
        if (num1 != "") {
            num1 = num1.toString();
        }

        if (num2 != "") {
            num2 = num2.toString();
        }

        if (num1 == "0" && operator == "") {
            num1 = num;
        }
        else if (num1 == "-0" && operator == "") {
            num1 = "-" + num
        }
        else if (num2 == "" && operator != "") {
            num2 = num;
        }
        else {

            if (operator == "") {
                num1 += num;
            }
            else if (operator != "") {
                num2 += num;
            }
        }

    }
    display();
}

function backspace() {
    if (num1 != "") {
        num1 = num1.toString();
    }

    if (num2 != "") {
        num2 = num2.toString();
    }
    if (operator != "" && num2 != "" && num2.length > 1 && num2[num2.length - 1] != ".") {
        num2 = num2.slice(0, num2.length - 1);
    } else if (operator != "" && num2 != "" && num2.length > 1 && num2[num2.length - 1] == ".") {
        num2 = num2.slice(0, num2.length - 1);
        decimalplace = false;
    } else if (operator != "" && num2 != "" && num2.length == 1) {
        num2 = "";
    } else if (operator != "" && num2 == "") {
        operator = "";
    } else if (operator == "" && num2 == "" && num1.length > 1 && num1[num1.length - 1] != ".") {
        num1 = num1.slice(0, num1.length - 1);
        afterevaluate = false;
    } else if (operator == "" && num2 == "" && num1.length > 1 && num1[num1.length - 1] == ".") {
        num1 = num1.slice(0, num1.length - 1);
        decimalplace = false;
        afterevaluate = false;
    } else if (operator == "" && num2 == "" && num1.length == 1) {
        num1 = 0;
        afterevaluate = false;
    }

    display();
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            number(event.key);
            break;
        case "+":
            operators(1);
            break;
        case "-":
            operators(2);
            break;
        case "*":
            operators(3);
            break;
        case "/":
            operators(4);
            break;
        case "%":
            operators(6);
            break;
        case "^":
            operators(5);
            break;
        case "=":
        case "Enter":
            equal();
            break;
        case "Backspace":
        case "Delete":
            backspace();
            break;
        case ".":
            adddecimal();
            break;
        case "_":
        case "#":
        case "$":
        case "@":
        case "~":
            changesign();
            break;
        case "Shift":
            break;
        default:
            console.log(`"${event.key}" is not a valid key.`);
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);