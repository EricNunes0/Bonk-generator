const bonkInputCenary = document.querySelector("#bonk-file-input-cenary");
const bonkInput0 = document.querySelector("#bonk-file-input-0");
const bonkInput1 = document.querySelector("#bonk-file-input-1");
const bonkInputDownload = document.querySelector("#bonk-file-input-download");

var upImg = "";
var imagesSaved = {
    "base": 0,
    "cenary": null,
    "bonk0": null,
    "bonk1": null
};
let backupImg = "";

const bonkBaseImages = [
    "https://i.imgur.com/SCcRfyt.png",
    "https://i.imgur.com/vslW1uB.png"
];

/* Criando canvas */
const canvas = document.getElementById('bonk-canvas');
const ctx = canvas.getContext("2d");

/* Alterar valor da base */
function bonkBase() {
    if(bonkBaseImages[parseInt(imagesSaved.base) + 1]) {
        imagesSaved.base = imagesSaved.base + 1;
    } else {
        imagesSaved.base = 0;
    };
    document.getElementById('version-image').src = bonkBaseImages[imagesSaved.base];
    document.getElementById('version-span').innerText = `Versão ${imagesSaved.base + 1}`;
    clearBonkImage();
}

/* Baixar canvas */
function generateDownloadLink() {
    let format = document.querySelector("#input-canvas-format");
    let imageDownload = document.getElementById('bonk-canvas').toDataURL(`image/${format.value}`, 1.0).replace(`image/png`, `image/${format.value}`);
    document.getElementById("download").href = imageDownload;
    document.getElementById("download").download = `bonk.${format.value}`;
}

bonkInputCenary.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        upImg = reader.result;
        BonkDogEditor(upImg, 0, 0);
    });
    reader.readAsDataURL(this.files[0]);
    generateDownloadLink();
    saveBackupBonkImage();
});

/* Função de fechar todas as aba de inserir imagem */
function closeAbas() {
    document.querySelector("#aba-container").className = `abas-container closed`;
}

/* Função para checar se uma imagem existe */
function checkImage(imageSrc, callback) {
    let img = new Image();
    img.src = imageSrc;
    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
            callback(true);
        };
        img.onerror = () => {
            callback(false);
        };
    }
}

/* Função para carregar cenário com url */
async function imageURLCenary() {
    let imageURL = document.getElementById("image-url-cenary").value;
    let blob = await fetch(imageURL).then(r => r.blob());
    checkImage(imageURL, (exists) => {
        if(exists) {
            console.log('Imagem encontrada!');
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                upImg = reader.result;
                BonkDogEditor(upImg, 0, 0);
            });
            reader.readAsDataURL(blob);
            console.log(blob);
            generateDownloadLink();
            saveBackupBonkImage();
            closeAbas();
            console.log("Imagem carregada!");
        } else {
            console.error('Esta imagem não existe, ou possui um formato inválido.');
        };
    });
};

bonkInput0.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        upImg = reader.result;
        BonkDogEditor(upImg, 1, 0);
    });
    reader.readAsDataURL(this.files[0]);
    generateDownloadLink();
    saveBackupBonkImage();
});

bonkInput1.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        upImg = reader.result;
        BonkDogEditor(upImg, 1, 1);
    });
    reader.readAsDataURL(this.files[0]);
    generateDownloadLink();
    saveBackupBonkImage();
});

bonkInputDownload.addEventListener("click", function() {
    generateDownloadLink();
    saveBackupBonkImage();
});

/* Evento de editar rgb da imagem */
function rgbBonkEvent() {
    let r = document.getElementById("range-input-r").value;
    let g = document.getElementById("range-input-g").value;
    let b = document.getElementById("range-input-b").value;
    rgbBonk(document.getElementById("bonk-canvas"), r, g, b);
};

/* Remover rgb da imagem */
function rgbBonkEventRemove() {
    if(backupImg) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backupImg, 0, 0, canvas.width, canvas.height);
        backupImg = "";
    };
}

/* Editar canvas (imagem) */
function BonkDogEditor(img, type, pos) {
    /* Resetando canvas */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    if(type == 0) {
        imagesSaved.cenary = img;
    } else if(type == 1) {
        imagesSaved[`bonk${pos}`] = img;
    };
    let positions, arcs;
    if(imagesSaved.base == 0) {
        image.src = "https://i.imgur.com/SCcRfyt.png";        
        positions = [
            [145, 16, 196, 196],
            [478, 189, 158, 158]
        ];
        arcs = [
            [242, 115, 105],
            [555, 267, 80]
        ];
    } else if(imagesSaved.base == 1) {
        image.src = "https://i.imgur.com/vslW1uB.png";        
        positions = [
            [70, 138, 130, 125],
            [491, 62, 119, 118]
        ];
        arcs = [
            [135, 202, 65],
            [551, 120, 58]
        ];
    };
    let cenary, bonksNewImages = [null, null];
    if(imagesSaved.cenary) {
        cenary = new Image();
        cenary.src = imagesSaved.cenary;
    };
    if(imagesSaved.bonk0) {
        bonksNewImages[0] = new Image();
        bonksNewImages[0].src = imagesSaved.bonk0;
    };
    if(imagesSaved.bonk1) {
        bonksNewImages[1] = new Image();
        bonksNewImages[1].src = imagesSaved.bonk1;
    };
    image.onload = function() {
        if(cenary) {
            ctx.drawImage(cenary, 0, 0, canvas.width, canvas.height);
        };
        for(let i = 0; i <= 1; i++) {
            if(bonksNewImages[i]) {
                ctx.save(); 
                ctx.beginPath();
                ctx.arc(arcs[i][0], arcs[i][1], arcs[i][2], 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip(); // fill(): visualizar local do círculo
                ctx.drawImage(bonksNewImages[i], positions[i][0], positions[i][1], positions[i][2], positions[i][3]); //Posicionando imagem
                ctx.beginPath();
                ctx.arc(0, 0, 25, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            };
        };
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.crossOrigin = "anonymous";
    saveBackupBonkImage();
    return image;
};

/* RGB */
function rgbBonk(img, r, g, b) {
    if(backupImg) {
        console.log(backupImg);
        ctx.drawImage(backupImg, 0, 0, canvas.width, canvas.height);
    }
    saveBackupBonkImage();
    const image = new Image();
    image.src = img.toDataURL();
    image.onload = function() {
        let imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(let x = 0; x < imgPixels.width; x++) {
            for(let y = 0; y < imgPixels.height; y++) {
                let i = (y * 4) * imgPixels.width + x * 4;
                let avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg + parseInt(r);
                imgPixels.data[i + 1] = avg + parseInt(g);
                imgPixels.data[i + 2] = avg + parseInt(b);
            }
        }
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    };
    return image;
}

/* Salvas imagem de backup */
function saveBackupBonkImage() {
    const bonkTemp = document.getElementById('bonk-canvas');
    bonkTemp.crossOrigin = "anonymous";
    let bonkTempDataURL = bonkTemp.toDataURL();
    let bonkTempImg = new Image();
    bonkTempImg.src = bonkTempDataURL;
    backupImg = bonkTempImg;
}

/* Limpar canvas */
function clearBonkImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    imagesSaved.cenary = null;
    imagesSaved.bonk0 = null;
    imagesSaved.bonk1 = null;
};

/* Converter canvas em imagem */
function canvasToImage() {
    let canvas = document.getElementById('bonk-canvas');
    let dataURL = canvas.toDataURL();
    document.getElementById('input-canvas-image').value = dataURL;
}