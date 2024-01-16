let num1 = '0';
let num2 = null;
let operator = null;
let output = "0";
let decimalplace = false;
let afterevaluate = false;

function display() {

    output = num1;

    if (operator != null) {

        switch (operator) {

            case 1: output += "+"; break;
            case 2: output += "-"; break;
            case 3: output += "×"; break;
            case 4: output += "÷"; break;
            case 5: output += "^"; break;
            case 6: output += "%"; break;

        }

    }
    if (num2 != null) {
        output += num2;
    }

    //##############################################################

    document.querySelector("#output").innerHTML = output;
}

function operators(op) {

    if (num2 != null) {
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
    num2 = null;

    decimalplace = false;

    display();

}

function changesign() {

    if (operator == null) {
        num1 = parseFloat(num1);
        num1 *= -1;
    }
    if (operator != null && num2 != null) {
        num2 = parseFloat(num2);
        num2 *= -1;
    }

    display();

}

function adddecimal() {

    if (num2 == null && operator != null) {
        num2 = "0.";
        decimalplace = true;
    }

    if (operator == null && num2 == null && afterevaluate == false) {
        if (decimalplace == false) {
            num1 += '.';
            decimalplace = true;
        }
    }

    if (operator == null && num2 == null && afterevaluate == true) {
        if (decimalplace == false) {
            num1 = '0.';
            decimalplace = true;
            afterevaluate = false;
        }
    }

    else if (operator != null && num2 != null) {
        if (decimalplace == false) {
            num2 += '.';
            decimalplace = true;
        }
    }

    display();
}

function equal() {

    if (num2 != null) {

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

    operator = null;
    num2 = null;

    afterevaluate = true;

    display();

}

function number(num) {

    if (afterevaluate == true && operator == null) {
        num1 = num;
        afterevaluate = false;
    } else {
        if (num1 != null) {
            num1 = num1.toString();
        }

        if (num2 != null) {
            num2 = num2.toString();
        }

        if (num1 === '0' && operator == null) {
            num1 = num;
        }
        else if (num2 == null && operator != null) {
            num2 = num;
        }
        else {

            if (operator == null) {
                num1 += num.toString();
            }
            else if (operator != null) {
                num2 += num.toString();
            }
        }

    }
    display();
}

function backspace() {
    if (operator != null && num2 != null && num2.length > 1 && num2[-1] != "."){
        num2 = num2.slice(0, num2.length - 1);
    } else if (operator != null && num2 != null && num2.length > 1 && num2[-1] == "."){
        num2 = num2.slice(0, num2.length - 1);
        decimalplace = false;
    } else if (operator != null && num2 != null && num2.length == 1){
        num2 = null;
    } else if (operator != null && num2 == null) {
        operator = null;
    } else if (operator == null && num2 == null && num1.length > 1 && num1[-1] != "."){
        num1 = num1.slice(0, num1.length - 1);
        afterevaluate = false;
    } else if (operator == null && num2 == null && num1.length > 1 && num1[-1] == "."){
        num1 = num1.slice(0, num1.length - 1);
        decimalplace = false;
        afterevaluate = false;
    } else if (operator == null && num2 == null && num1.length == 1) {
        num1 = 0;
        afterevaluate = false;
    }

    display();
}