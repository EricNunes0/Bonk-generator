const rangeInputR = document.querySelector("#range-input-r");
const rangeInputG = document.querySelector("#range-input-g");
const rangeInputB = document.querySelector("#range-input-b");

rangeInputR.addEventListener("input", function() {
    document.getElementById("range-output-r").innerText = document.querySelector("#range-input-r").value;
});

rangeInputG.addEventListener("input", function() {
    document.getElementById("range-output-g").innerText = document.querySelector("#range-input-g").value;
});

rangeInputB.addEventListener("input", function() {
    document.getElementById("range-output-b").innerText = document.querySelector("#range-input-b").value;
});