const formatIinput = document.querySelector("#bonk-file-input-format");

formatIinput.addEventListener("click", function() {
    let format = document.querySelector("#input-canvas-format");
    let image = document.querySelector("#format-image");
    if(format.value === `png` || format.value === `jpg` || format.value === `jpeg`) {
        if(format.value === `png`) {
            format.value = `jpg`;
            image.src = "https://i.imgur.com/yIUdTyc.png";
        } else if(format.value === `jpg`) {
            format.value = `jpeg`;
            image.src = "https://i.imgur.com/7Q9id3C.png";
        } else if(format.value === `jpeg`) {
            format.value = `png`;
            image.src = "https://i.imgur.com/TTZTZfZ.png";
        }
    } else {
        format.value = `png`;
    }
});