function rickroll(){
    window.open("https:\/\/www.youtube.com\/watch?v=dQw4w9WgXcQ", '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
}

function move(){
  
    //the script
    var button = document.getElementById('lol');

    button.style.position = 'absolute';
    button.style.left = '0px';
    button.style.top = '0px';
  
    var buttonWidth = button.offsetWidth;
    var buttonHeight = button.offsetHeight;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var randomX = Math.random() * (windowWidth - buttonWidth);
    var randomY = Math.random() * (windowHeight - buttonHeight);
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';    
}

/*
const sleep = ms => new Promise(r => setTimeout(r, ms));

setTimeout(function() {alert('hello');},1250);

function() {
    var lolBtn = $("#lol"),
    count = 0;

function randNum(num) {
    return Math.floor(Math.random() * num);
}

function resetLolBtn() {
    $(this).css({
        position: "static"
    });
}

*/