//Redirection confirm
function confirmRedirect(e) {
    let link = e.target;
    if (e.target.tagName !== "A")
        link = e.target.closest("A");
    if (link.tagName && !confirm('Перейти на страницу ${link.host}?`))
        e.preventDefault();
}

//Change image
function changeMainImage(e) {
    if (e.target.tagName === "IMG") {
        let mainImg = document.getElementById("main_image").getElementsByTagName("img")[0];
        let showImage = e.target.cloneNode(true);
        let mainImgDiv = document.getElementById("main_image").getBoundingClientRect();
        let centerX = mainImgDiv.left;
        let centerY = mainImgDiv.top;
        showImage.id = "clonedImage";
        showImage.style.top = "280px";
        showImage.style.left = e.clientX - 625 + "px";
        showImage.style.zIndex = "1";
        showImage.classList.add("prepare_image");
        showImage.classList.add("show_image");
        document.getElementsByClassName("gallery")[0].appendChild(showImage);
        let imgX = showImage.getBoundingClientRect().left - 400;
        showImage.remove();
        mainImg.src = e.target.src;
    }
}

//Select list elements
function selectElements(e) {
    let element = e.target;
    let listElements = document.getElementById("list").getElementsByTagName("li");
    if (element.tagName === "LI") {
        if (e.ctrlKey) {
            if (element.classList.contains("selected"))
                element.classList.remove("selected");
            else
                element.classList.add("selected");
        } else {
            for (let i = 0; i < listElements.length; i++) {
                listElements[i].classList.remove("selected");
            }
            element.classList.add("selected");
        }
    }
}
let doSlide = false, moveDist;
let slider, slideCont, item, clonedItem, totalCost, kart;
onmousedown = function (e) {
    item = e.target.closest(".item");
    if (item && !item.classList.contains("clone")) {
        placed = false;
        totalCost = document.getElementById("totalCost");
        kart = document.getElementById("kart");
        clonedItem = item.cloneNode(true);
        clonedItem.ondragstart = function (e) {
            e.preventDefault();
        }
        clonedItem.classList.add("clone");
        clonedItem.style.position = "absolute";
        document.body.append(clonedItem);
        moveAt(event.clientX, event.clientY);
    }
}

function moveAt(pageX, pageY) {
    clonedItem.style.left = pageX - clonedItem.offsetWidth / 2 + 'px';
    clonedItem.style.top = pageY - clonedItem.offsetHeight / 2 + 'px';
}

onmousemove = function (e) {
    if (doSlide) {
        moveDist = e.clientX - slideCont.getBoundingClientRect().left;
        if (moveDist > 3 && moveDist <= slideCont.offsetWidth - 20) {
            slider.style.left = moveDist + "px";
            slider.innerHTML = Math.ceil(moveDist / ((slideCont.offsetWidth - 20) / 10));
        }
    }
    if (clonedItem && !placed) {
        moveAt(e.pageX, e.pageY);
    }
}
onmouseup = function (e) {
    doSlide = false;
    if (clonedItem && !placed) {
        if (placeable) {
            clonedItem.getElementsByTagName("img")[0].remove();
            clonedItem.classList.remove("item");
            totalCost.innerHTML = parseInt(totalCost.innerHTML) + parseInt(clonedItem.getElementsByClassName("cost")[0].innerHTML)+"¥";
            clonedItem.style.position = "static";
            kart.append(clonedItem);
            placed = true;
            animate_yuyu()
            animate_inkart()
        } else
            clonedItem.remove();
    }
}
let placeable = false, placed = false;




//slider things
slider = document.getElementById("slider")
let thumb = slider.querySelector('.thumb');
thumb.onmousedown = function (event) {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    // shiftY здесь не нужен, слайдер двигается только по горизонтали

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};
thumb.ondragstart = function () {
    return false;
};
const fx_character = document.querySelector('.fixedCharacter')
fx_character.style.opacity = "0.0"
let animate_yuyu = function (){
    let start = 0.0;
    let forward = true
    let stop_flag = false
    fx_character.style.opacity = start
    let yuyu_timer = setInterval(() => {
        start += 0.01
        if (start >= 1){
            if (forward === false){
                stop_flag = true
            } else {

                start = 0.01
                forward = false
            }
        }
        if (forward){
            fx_character.style.opacity = start
        } else if (stop_flag){
            fx_character.style.opacity = 0
        }
        else {
            fx_character.style.opacity = 1.0 - start
        }
    }, 10)
    setTimeout(() =>{
        clearInterval(yuyu_timer)
        fx_character.style.opacity = 0
    }, 4000)
}

const fx_inkart = document.querySelector('#inCartEvent')
fx_inkart.style.transform = "translateX(0%)"
let animate_inkart = function (){
    let start = 0;
    let forward = true
    let stop_flag = false
    fx_inkart.style.transform = "translateX(0%)"
    let inkart_timer = setInterval(() => {
        start += 1
        if (start >= 100){
            if (forward === false){
                stop_flag = true
            } else {
                start = 0
                forward = false
            }
        }
        if (forward){
            fx_inkart.style.transform = "translateX(" + start +"%)"
        } else if (stop_flag){
            fx_inkart.style.transform = "translateX(0%)"
        }
        else {
            fx_inkart.style.transform = "translateX(" + (100 - start)+"%)"
        }
    }, 1)
    setTimeout(() =>{
        clearInterval(inkart_timer)
        fx_inkart.style.transform = "translateX(0%)"
    }, 3000)
}
