function openAba(id) {
    document.querySelector("#aba-container").className = "abas-container opened";
    let abasForms = document.querySelectorAll(".abas-forms");
    for(let i = 0; i <= abasForms.length - 1; i++) {
        if(abasForms[i].id == `aba-${id}`) {
            document.getElementById(`aba-${i}`).style.display = `block`;
        } else {
            document.getElementById(`aba-${i}`).style.display = `none`;
        }
    };
}

function abasOptionsItems(id) {
    let optionsItems = document.getElementsByClassName(`abas-options-items`);
    for(let i = 0; i <= optionsItems.length - 1; i++) {
        if(id == i) {
            document.getElementById(`aba-option-${i}`).className = `abas-options-items selected`;
            document.getElementById(`aba-enter-${i}`).className = `aba-enter-container opened`;
        } else {
            document.getElementById(`aba-option-${i}`).className = `abas-options-items`;
            document.getElementById(`aba-enter-${i}`).className = `aba-enter-container closed`;
        };
    };
}

function closeAba() {
    let abaContainer = document.querySelector("#aba-container");
    if(abaContainer.className == `abas-container opened`) {
        abaContainer.className = `abas-container closed`;
        //document.querySelector("#confirm-bar").className = `confirm-bar opened`;
    } else {
        abaContainer.className = `abas-container opened`;
        //document.querySelector("#confirm-bar").className = `confirm-bar closed`;
    }
};