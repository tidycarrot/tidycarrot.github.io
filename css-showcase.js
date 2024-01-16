function changeImage() {
    document.getElementById("customImage").style.filter = 
    'blur(' + document.querySelector('#blurImage').value +'px)' + 
    'brightness(' + document.querySelector('#brightImage').value + '%)' +
    'contrast(' + document.querySelector('#contrastImage').value + '%)' +
    'grayscale(' + document.querySelector('#grayscaleImage').value + '%)' +
    '';
    document.getElementById("blurAmount").innerHTML = document.querySelector('#blurImage').value + "px";
}