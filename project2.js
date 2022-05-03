class Merchandise{
    constructor(price, name, imgUrl){
        this.price = price;
        this.name = name;
        this.imgUrl = imgUrl;
    }
}

const merchandises = [
    new Merchandise("¥150", "Cola", "https://1.bp.blogspot.com/-3wo33nLxIKw/X1LskM84NQI/AAAAAAABa_I/D7QLbbJYqOsyI26PwlE23Dl6Dy-CzM8rQCNcBGAsYHQ/s1600/drink_cola_petbottle.png"),
    new Merchandise("¥150", "Soda", "https://2.bp.blogspot.com/-0Jota1opNLo/UW4WVnPRZBI/AAAAAAAAQuE/Tnf_vvDVBp4/s1600/sweets_ramune_drink.png"),
    new Merchandise("¥150", "Orange juice", "https://3.bp.blogspot.com/-X3w1bg1-Xcs/V8VFAHqD6eI/AAAAAAAA9XA/nAth-47Zy6s1h2XqC2rducvPW4PGObOdwCLcB/s800/juice_orange.png"),
    new Merchandise("¥150", "Apple juice", "https://1.bp.blogspot.com/-JiCQug4j1FQ/V8VE_0yANoI/AAAAAAAA9XE/0MtLIIX-FqkY1o2h6O2cM8Y5PvOceYmnQCLcB/s800/juice_apple.png"),
    new Merchandise("¥150", "Water", "https://3.bp.blogspot.com/-OFC9zqSznsQ/Ws2uwsiateI/AAAAAAABLRE/RkJ3VCsVSOMy74KEHTIK9jqjv9HLGZT6gCLcBGAs/s800/drink_petbottle_cold.png"),
    new Merchandise("¥150", "Tea", "https://2.bp.blogspot.com/-FjMG-YiRjOM/V9ppyvigbEI/AAAAAAAA9yI/h4Kri1aOOMYWhP6HT9BsphoD2hQuQL0wACLcB/s800/petbottle_tea_koucha.png"),
    new Merchandise("¥150", "Coffee", "https://4.bp.blogspot.com/-u2PJcGUSIN0/W-VEcnRvyII/AAAAAAABQFk/7miGx-JsspIuKCrD7UcZ5ymEOQmDn7yywCLcBGAs/s800/drink_petbottle_coffee.png"),
    new Merchandise("¥150", "Ginger ale", "https://2.bp.blogspot.com/-0Jota1opNLo/UW4WVnPRZBI/AAAAAAAAQuE/Tnf_vvDVBp4/s1600/sweets_ramune_drink.png"),
    new Merchandise("¥150", "Grape juice", "https://3.bp.blogspot.com/-lIEl45JgPpA/UrlmsiRsk3I/AAAAAAAAcKI/5l-FewjdJJU/s800/petbottle_juice.png"),
    new Merchandise("¥150", "Cherry juice", "https://3.bp.blogspot.com/-lIEl45JgPpA/UrlmsiRsk3I/AAAAAAAAcKI/5l-FewjdJJU/s800/petbottle_juice.png"),
    new Merchandise("¥150", "Tomato juice", "https://2.bp.blogspot.com/-j6QqwZLOrlw/UaVVRwFVRjI/AAAAAAAAUDo/IU30STNP6ic/s800/tomato_juice.png"),
]


const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");
const button4 = document.getElementById("btn4");
const button5 = document.getElementById("btn5");
const button6 = document.getElementById("btn6");
const button7 = document.getElementById("btn7");
const button8 = document.getElementById("btn8");
const button9 = document.getElementById("btn9");
const button0 = document.getElementById("btn0");
const btnList = [button0, button1, button2, button3, button4, button5, button6, button7, button8, button9];
const numOutput = document.getElementById("num");
const outputName = document.getElementById("inputName");
const outputPrice = document.getElementById("inputPrice");
const btnClear = document.getElementById("btnClear");
const btnEnter = document.getElementById("btnEnter");
const payBtn = document.getElementById("paymentButton");
let payment = false;

// payフラグの管理
function isPayable(){
    if(payment === false) {
        payment = true;
        payBtn.classList.remove("bg-secondary");
        payBtn.classList.add("bg-danger");
    }
    else {
        payment = false;
        payBtn.classList.remove("bg-danger");
        payBtn.classList.add("bg-secondary");
    }
}

// ENTERボタン
btnEnter.addEventListener("click", function(){
    if(numOutput.value !== "" && parseInt(numOutput.value) <= merchandises.length && numOutput.value != "0") isPayable();
})

// 数字ボタンの入力
for (let i = 0; i < btnList.length; i++){
    btnList[i].addEventListener("click", function(){
        if(numOutput.value.length < 3 && payment === false){
            numOutput.value += btnList[i].innerText;
            numOutput.dispatchEvent(new Event("input"));
        }
    })
}

// 商品名と値段の表示
numOutput.addEventListener("input", function(){
    let numStr = numOutput.value
    let num = parseInt(numStr)
    if(numStr === "") {
        outputPrice.value = "";
        outputName.value = "";
    }
    else if (num > merchandises.length) {
        outputPrice.value = "NONE";
        outputName.value = "NONE";
    }
    else {
        outputPrice.value = merchandises[num - 1].price;
        outputName.value = numStr + ". " + merchandises[num - 1].name;
        let currentIndex = parseInt(main.getAttribute("data-index"));
        let nextIndex = num - 1;
        sliderJump(lOrR(currentIndex, nextIndex));
    }
})

// CLEARボタン
btnClear.addEventListener("click", function(){
    if(payment === true) isPayable();
    else {
        let str = numOutput.value;
        numOutput.value = str.substring(0, str.length - 1);
    }
    numOutput.dispatchEvent(new Event("input"));
})

// PAYボタン
payBtn.addEventListener("click", function(){
    if(payment === true) {
        isPayable();
        outputPrice.value = "";
        outputName.value = "";
        numOutput.value = "";
        alert("Thank you for your purchase.")
    }
})

let slider = document.getElementById("slider");
let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");
main.classList.add("main");
extra.classList.add("extra");
sliderShow.classList.add("d-flex");

slider.append(sliderShow);
sliderShow.append(main);
sliderShow.append(extra);

main.setAttribute("data-index", "0");
main.innerHTML = `<div class="d-flex justify-content-center"><img src=${merchandises[0].imgUrl} class="img-size"></div>`;

function sliderJump(animationType){
    let index = parseInt(main.getAttribute("data-index"));
    let currentItem = merchandises[index];
    index = parseInt(numOutput.value) - 1;
    let nextItem = merchandises[index];

    main.setAttribute("data-index", index.toString());

    animationMain(currentItem, nextItem, animationType);
}

function animationMain(currentImage, nextImage, animationType){
    if(currentImage !== nextImage){
        extra.innerHTML =`<div class="d-flex justify-content-center"><img src=${currentImage.imgUrl} class="img-size"></div>`

        main.innerHTML = `<div class="d-flex justify-content-center"><img src=${nextImage.imgUrl} class="img-size"></div>`

        main.classList.add("expand-animation");
        extra.classList.add("deplete-animation");

        if(animationType === "right") {
            sliderShow.innerHTML = "";
            sliderShow.append(extra);
            sliderShow.append(main);
        }

        else if (animationType === "left") {
            sliderShow.innerHTML = "";
            sliderShow.append(main);
            sliderShow.append(extra);
        }
    }
}

function lOrR(currentItem, nextItem) {
    if(currentItem > nextItem){
        if(currentItem - nextItem > Math.ceil((merchandises.length - 1) / 2)) {
            return "right";
        }
        else {
            return "left";
        }
    }

    else {
        if(nextItem - currentItem > Math.ceil((merchandises.length - 1) / 2)) {
            return "left";
        }
        else {
            return "right";
        }
    }
}
