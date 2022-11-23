"use strict"
let reg_ask = true;
do {
    reg_ask = confirm("Желаете пройти регистрацию?");
    if (reg_ask) alert("Круто!");
    else alert("Попробуй еще раз");
}
while (!reg_ask)

let login = prompt("Введите ваш логин:");
if (login == null) alert('Отменено');
else if (login !== 'Админ') alert('Я вас не знаю');
else {
    let password = prompt("Введите ваш пароль:");
    if (password === 'Я главный') alert("Здравствуйте!");
    else if (password !== null) alert("Неверный пароль");
    else alert("Отменено");
}


let paint_mode = false;

window.addEventListener('mousemove', e => {
    if (paint_mode) {
        let path = document.createElement('div');
        path.className = "nine_ball";
        path.style.top = e.pageY - 50 + 'px';
        path.style.left = e.pageX - 50 + 'px';
        path.style.zIndex = '-1';
        document.body.append(path);
    }
})



let like = document.querySelector('#like');
let heart = document.querySelector('#heart');
let left_part = document.querySelector('#left-part');
let right_part = document.querySelector('#right-part');
let count = document.querySelector('#count');
like.addEventListener('click', () => {
    if (!paint_mode) {
        paint_mode = true;
        left_part.style.backgroundColor = "blue";
        right_part.style.backgroundColor = "blue";
        heart.style.backgroundColor = "transparent";
        like.style.backgroundColor = "rgb(184,192,241)";
        count.style.color = "white";
        count.innerHTML = Number(count.innerHTML) + 1;
    }
    else {
        paint_mode = false;
        left_part.style.backgroundColor = "white";
        right_part.style.backgroundColor = "white";
        like.style.backgroundColor = "white";
        count.style.color = "rgb(120,120,120)";
        heart.style.backgroundColor = "rgb(120,120,120)";
        count.innerHTML = Number(count.innerHTML) - 1;
    }
})
