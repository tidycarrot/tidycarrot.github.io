function changeImage() {
    document.getElementById("customImage").style.filter =
        'blur(' + document.querySelector('#blurImage').value + 'px)' +

        'brightness(' + document.querySelector('#brightImage').value + '%)' +

        'contrast(' + document.querySelector('#contrastImage').value + '%)' +

        'grayscale(' + document.querySelector('#grayscaleImage').value + '%)' +

        'hue-rotate(' + document.querySelector('#huerotateImage').value + 'deg)' +

        'invert(' + document.querySelector('#invertImage').value + '%)' +

        'opacity(' + document.querySelector('#opacityImage').value + '%)' +

        'saturate(' + document.querySelector('#saturateImage').value + '%)' +

        'sepia(' + document.querySelector('#sepiaImage').value + '%)' +

        'drop-shadow(' + document.querySelector('#dropshadowwidthImage').value + 'px ' +
        document.querySelector('#dropshadowheightImage').value + 'px ' +
        document.querySelector('#dropshadowblurImage').value + 'px ' +
        document.querySelector('#dropshadowcolourImage').value + ')';

    /******************************************************************************************************************/

    document.getElementById("blurAmount").innerHTML = document.querySelector('#blurImage').value + "px";
    document.getElementById("brightAmount").innerHTML = document.querySelector('#brightImage').value + "%";
    document.getElementById("contrastAmount").innerHTML = document.querySelector('#contrastImage').value + "%";
    document.getElementById("grayscaleAmount").innerHTML = document.querySelector('#grayscaleImage').value + "%";
    document.getElementById("huerotateAmount").innerHTML = document.querySelector('#huerotateImage').value + "°";
    document.getElementById("invertAmount").innerHTML = document.querySelector('#invertImage').value + "%";
    document.getElementById("opacityAmount").innerHTML = document.querySelector('#opacityImage').value + "%";
    document.getElementById("saturateAmount").innerHTML = document.querySelector('#saturateImage').value + "%";
    document.getElementById("sepiaAmount").innerHTML = document.querySelector('#sepiaImage').value + "%";
    document.getElementById("dropshadowwidthAmount").innerHTML = document.querySelector('#dropshadowwidthImage').value + "px";
    document.getElementById("dropshadowheightAmount").innerHTML = document.querySelector('#dropshadowheightImage').value + "px";
    document.getElementById("dropshadowblurAmount").innerHTML = document.querySelector('#dropshadowblurImage').value + "px";

}

function resetcustomimage() {
    document.getElementById("customImage").style.filter =
        'blur(0px) brightness(100%) contrast(100%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(0%) drop-shadow(0px 0px 0px #FFA500)';

    document.getElementById("blurAmount").innerHTML = '0px';
    document.getElementById("brightAmount").innerHTML = '100%';
    document.getElementById("contrastAmount").innerHTML = '100%';
    document.getElementById("grayscaleAmount").innerHTML = '0%';
    document.getElementById("huerotateAmount").innerHTML = '0°';
    document.getElementById("invertAmount").innerHTML = '0%';
    document.getElementById("opacityAmount").innerHTML = '100%';
    document.getElementById("saturateAmount").innerHTML = '100%';
    document.getElementById("sepiaAmount").innerHTML = '0%';
    document.getElementById("dropshadowwidthAmount").innerHTML = '0px';
    document.getElementById("dropshadowheightAmount").innerHTML = '0px';
    document.getElementById("dropshadowblurAmount").innerHTML = '0px';

    document.querySelector('#blurImage').value = '0';
    document.querySelector('#brightImage').value = '100';
    document.querySelector('#contrastImage').value = '100';
    document.querySelector('#grayscaleImage').value = '0';
    document.querySelector('#huerotateImage').value = '0';
    document.querySelector('#invertImage').value = '0';
    document.querySelector('#opacityImage').value = '100';
    document.querySelector('#saturateImage').value = '100';
    document.querySelector('#sepiaImage').value = '0';
    document.querySelector('#dropshadowwidthImage').value = '0';
    document.querySelector('#dropshadowheightImage').value = '0';
    document.querySelector('#dropshadowblurImage').value = '0';
    document.querySelector('#dropshadowcolourImage').value = '#FFA500';

}