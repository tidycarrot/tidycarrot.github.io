var x = 0;
var totalpencil = 0;
var maxpen = 100;
var cash = 10;
var price = 50;

function Make() {
    if (x < maxpen) {
        x = x + 1;
        totalpencil = totalpencil + 1;
        document.getElementById("currentpencil").innerHTML = x;
        document.getElementById("totalpencil").innerHTML = totalpencil;
    }

}

function Sell() {
    if (x > 19) {
        x = x - 20;
        cash = cash + 2;
        document.getElementById("currentpencil").innerHTML = x;
        document.getElementById("money").innerHTML = cash;
    }
}

function Getstorage() {
    if (cash >= 12) {
        cash = cash - 12;
        maxpen = maxpen + maxpen / 2;
        document.getElementById("money").innerHTML = cash;
        document.getElementById("MaxStorage").innerHTML = maxpen;

    }
}
function raiseprice() {
    if (price < 100000) {
        price = price + 1;
        document.getElementById("priceofpen").innerHTML = price;
        publicdemand(price);
    }
}

function lowerprice() {
    if (price > 0) {
        price = price - 1;
        document.getElementById("priceofpen").innerHTML = price;
        publicdemand(price);
    }
}

function publicdemand(x) {
    var y = 1 - 1 / (1 + x);
    y = y * 1000;
    y = 1000 - y
    y = Math.round(y)
    document.getElementById("demand").innerHTML = y;
}

function Unhidepencilmachine() {
    document.getElementById("pencilmachine").hidden = false;
}

setTimeout(Unhidepencilmachine(), 10000);