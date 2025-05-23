// ------------------------ html referense -----------------------
const inputRangeBtns = document.querySelectorAll('[type="range"]');
const imageInputBtnEle = document.getElementById("uploadedFile");
const brightnessEle = document.getElementById("brightness");
const saturationEle = document.getElementById("saturation");
const blurEle = document.getElementById("blur");
const inversionEle = document.getElementById("inversion");
const canvas = document.getElementById("image-canvas");
const downloadBtn = document.querySelector(".download");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const filter = {
    brightness : "100",
    saturation : "100",
    blur : "0",
    inversion : "0"
}

let image = null;

function renderImage (){
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.filter = `brightness(${filter.brightness}%) saturate(${filter.saturation}%) blur(${filter.blur}px) invert(${filter.inversion}%)`;
    ctx.drawImage(image, 0, 0);

}

function download(){
    if (!image) return;
    let canvasImage = canvas.toDataURL('image/png');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'filtered_image.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      xhr.open('GET', canvasImage); // This is to download the canvas Image
      xhr.send();
}

function resetFilter(){
    brightnessEle.value = filter.brightness,
    saturationEle.value = filter.saturation,
    blurEle.value = filter.blur,
    inversionEle.value = filter.inversion
}
resetFilter();

function updateImage (e) {
    if (!image) return;
    const ele = e.target;
    filter[`${ele.id}`] = `${ele.value}`;
    renderImage();
}


inputRangeBtns.forEach(range => {
    range.addEventListener("change", updateImage);
})


imageInputBtnEle.addEventListener("change", (e) => {
    image = new Image();
    image.addEventListener("load", ()=>{
        resetFilter();
        renderImage();
    })

    image.src = URL.createObjectURL(imageInputBtnEle.files[0])
})

downloadBtn.addEventListener("click", download)