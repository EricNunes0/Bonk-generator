const rangeInputR = document.querySelector("#range-input-r");
const rangeInputG = document.querySelector("#range-input-g");
const rangeInputB = document.querySelector("#range-input-b");
const rangeInputNumberR = document.querySelector("#range-output-r");
const rangeInputNumberG = document.querySelector("#range-output-g");
const rangeInputNumberB = document.querySelector("#range-output-b");

rangeInputR.addEventListener("input", function() {
    document.getElementById("range-output-r").value = document.querySelector("#range-input-r").value;
});

rangeInputG.addEventListener("input", function() {
    document.getElementById("range-output-g").value = document.querySelector("#range-input-g").value;
});

rangeInputB.addEventListener("input", function() {
    document.getElementById("range-output-b").value = document.querySelector("#range-input-b").value;
});

rangeInputNumberR.addEventListener("change", function() {
    let rValue = parseInt(document.getElementById("range-output-r").value);
    if(rValue <= 0 || isNaN(rValue)) {
        document.querySelector("#range-output-r").value = 0;
    };
    if(rValue >= 255) {
        document.querySelector("#range-output-r").value = 255;
    };
    document.querySelector("#range-input-r").value = document.getElementById("range-output-r").value;
});

rangeInputNumberG.addEventListener("change", function() {
    let gValue = parseInt(document.getElementById("range-output-g").value);
    if(gValue <= 0 || isNaN(gValue)) {
        document.querySelector("#range-output-g").value = 0;
    };
    if(gValue >= 255) {
        document.querySelector("#range-output-g").value = 255;
    };
    document.querySelector("#range-input-g").value = document.getElementById("range-output-g").value;
});

rangeInputNumberB.addEventListener("change", function() {
    let bValue = parseInt(document.getElementById("range-output-b").value);
    if(bValue <= 0 || isNaN(bValue)) {
        document.querySelector("#range-output-b").value = 0;
    };
    if(bValue >= 255) {
        document.querySelector("#range-output-b").value = 255;
    };
    document.querySelector("#range-input-b").value = document.getElementById("range-output-b").value;
});