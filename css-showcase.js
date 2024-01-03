function changeImage() {
    document.getElementById("customImage").style.filter = 
        'blur(' + document.querySelector('#blurImage').value +'px)' + 

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
        document.getElementById("dropshadowwidthAmount").innerHTML = document.querySelector('#dropshadowwidthImage').value + "px";
        
}