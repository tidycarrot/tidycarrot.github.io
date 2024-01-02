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
            document.querySelector('#dropshadowcolourImage').value + ');';

        //23412341/2341/234/12341/23413/2413/41/3241/2341/324/1324/1234/1234/1324/1/2341/241/2/341/341/234/1234/.1234/1/2341/234
        document.getElementById("blurAmount").innerHTML = document.querySelector('#blurImage').value + "px";
}