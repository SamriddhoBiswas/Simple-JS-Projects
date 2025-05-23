const currentDate = document.getElementById("currentDate");
const dateOptionsSelectElement = document.getElementById("dateFromat");
const copyBtn = document.querySelector(".result img");

const date = new Date();
const day = date.getDate();
const month = date.getMonth() +1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();


dateOptionsSelectElement.addEventListener("change", ()=>{
    copyBtn.src = "./clipboard-regular.svg";
        switch (dateOptionsSelectElement.value) {
            case "dd-mm-yyyy":
                currentDate.value = `${day}-${month}-${year}`;
                break;
            case "mm-dd-yyyy" :
                currentDate.value = `${month}-${day}-${year}`;
                break;
            case "mm-dd-yyyy-hr-min" :
                currentDate.value = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`
                break;
            default:
                break;
        }
});


copyBtn.addEventListener("click", (e)=>{
    e.target.src = "./check-solid.svg";
    navigator.clipboard.writeText(currentDate.value);
})