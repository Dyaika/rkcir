//капча
let cap = document.getElementById('cap');
let solved = false;
let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var a, b;
let send = document.getElementById('submit');
//корзина
let good_name = "";
let good_price = 0;
let path_cart = document.getElementById("storage");
let path_total_price = document.getElementById("sum");

function Accumulator(startingValue){
    this.value = startingValue;
    this.truncate = function (str, maxlength){
        if (str.length >  Number(maxlength)){
            str = str.substring(0, maxlength - 3);
            str += "...";
        }
        return str;
    }
    this.read = function (){
        good_name = prompt("Название товара");
        good_price = prompt("Цена товара");
        if (good_price < 0){
            good_price = 0;
        }
        this.value += Number(good_price);
        let good_i = document.createElement('li');
        good_i.className = "good";
        good_i.textContent = this.truncate(good_name, 10);
        path_cart.appendChild(good_i);
        path_total_price.innerHTML = Number(this.value);
        alert(good_name + " " + good_price + " теперь в корзине!");
    }

}
let acc = new Accumulator(0);
let path_new_good = document.getElementById('new_good');



cap.addEventListener('click', () => {
    cap.checked = false;
    if (!solved) {
        let word = "";
        for (var i = 0; i < 6; i++){
            word += alphabet[Math.round(Math.random() * 51)]
        }
        let captcha = prompt("Введите символы: " + word);
        if (captcha == null || captcha !== word){
            a = Math.round(Math.random() * 10);
            b = Math.round(Math.random() * 10);
            captcha = prompt("Введите результат: " + a + "+" + b);
            if (captcha == null || captcha !== (a + b + '')) {

                cap.checked = false;
            } else{
                cap.checked = true;
                solved = true;
            }
        } else {
            cap.checked = true;
            solved = true;
        }

    }
    else {
        cap.checked = false;
        solved = false;
    }
    if (solved){
        send.style.background = 'blue';
    } else {
        send.style.background = "rgba(255,255,255,0.2)";
    }
});

path_new_good.addEventListener('click', () => {
    acc.read();
});
