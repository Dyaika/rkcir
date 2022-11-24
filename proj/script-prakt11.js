
//корзина
let good_name = "";
let good_price = 0;
let path_cart = document.getElementById("storage");
let path_total_price = document.getElementById("sum");
class Good{
    constructor(name, price){
        this.name = name;
        this.price = Number(price);
    }
}
class CartItem{
    constructor(name, price, rem_btn){
        this.good = new Good(name, price);
        this.count_goods = 1;
        this.rem_btn = rem_btn;
        this.rem_btn.addEventListener('click', () => {
            this.remG();
        });
    }
    addG = function(){
        this.count_goods++;
    }
    remG = function(){
        if (this.count_goods !== 0){
            this.count_goods--;
            alert(this.count_goods + "");
        }
    }
    getCost = function(){
        return Number(this.count_goods) * Number(this.good.price);
    }
}
function Accumulator(startingValue){
    this.value = startingValue;
    this.arr = new CartItem[15];
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
        let pos = null;
        for (var i = 0; i < 15; i++){
            if (arr[i] != null && arr[i].good.name == good_name){
                pos = i;
                break;
            } else if (arr[i] == null){
                pos = i;
            } else{
                pos = 0;
            }
        }
        if (this.arr[pos] != null){
            this.arr[pos].addG();
        } else {
            let good_i = document.createElement('li');
            let del_btn = document.createElement('button');
            del_btn.textContent = "🗑";
            good_i.className = "good";
            del_btn.className = "del_btn";
            good_i.textContent = this.truncate(good_name, 10);
            good_i.appendChild(del_btn);
            path_cart.appendChild(good_i);
            this.arr[pos] = new CartItem(good_name, good_price, del_btn);
        }
        path_total_price.innerHTML = Number(this.value);
    }
    this.rem = function(){
        path_cart.innerHTML = "";
    }

    }
}
let acc = new Accumulator(0);
let path_new_good = document.getElementById('new_good');

path_new_good.addEventListener('click', () => {
    acc.read();
});
