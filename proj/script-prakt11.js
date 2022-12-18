let goods = [
    {
        name: "Миксер",
        cost: 3000
    },
    {
        name: "Кофемашина",
        cost: 10000
    },
    {
        name: "Блендер",
        cost: 2500
    },
    {
        name: "Микроволновка",
        cost: 8000
    },
    {
        name: "Холодильник",
        cost: 25000
    },
    {
        name: "Чайник",
        cost: 1500
    }
]
//корзина
let cart_goods = []
const path_cart = document.getElementById("storage");
const path_goods_all = document.getElementById("goods");
const trash = document.getElementById("trash");
const sort_opt = document.getElementById("sort");
const min_opt = document.getElementById("min");
const max_opt = document.getElementById("max");
const apply_btn = document.getElementById("apply")
let path_total_price = document.getElementById("sum");
let fill_func = function(arr){
    path_goods_all.innerHTML = "";
    for (let x in arr){
        let cur_good = document.createElement('button')
        cur_good.innerHTML = "<div>" + arr[x].name + "</div><div>" + arr[x].cost + "</div>"
        cur_good.addEventListener('click', () => {
            let obj_good = {
                name: arr[x].name,
                cost: arr[x].cost,
                count: 1
            }
            let flag = false;
            for (let good in cart_goods){
                if (cart_goods[good].name === obj_good.name){
                    cart_goods[good].count++;
                    console.log("увеличение")
                    console.log(obj_good)
                    flag = true;
                }
            }
            if (!flag){
                cart_goods[cart_goods.length] = obj_good;
                console.log("добавление нового")
                console.log(obj_good)
            }
            update_cart();
        });
        path_goods_all.appendChild(cur_good)
    }
}
let update_price = function (){
    var valu = 0;
    for (let x in cart_goods){
        valu += cart_goods[x].cost * cart_goods[x].count
    }
    path_total_price.innerText = valu;
}
let update_cart = function (){
    path_cart.innerHTML = "";
    for (let x in cart_goods){
        let cur_good = document.createElement('li')
        let plus_btn = document.createElement('button')
        plus_btn.innerText = "+"
        let minus_btn = document.createElement('button')
        minus_btn.innerText = "-"
        let del_btn = document.createElement('button')
        del_btn.innerText = "🗑️"
        plus_btn.addEventListener('click', () =>{
            cart_goods[x].count++
            update_cart()
        })
        minus_btn.addEventListener('click', () =>{
            if (cart_goods[x].count > 0){
                cart_goods[x].count--
            }
            update_cart()
        })
        del_btn.addEventListener('click', () =>{
            cart_goods[x].count = 0
            update_cart()
        })
        let good_content = document.createElement('div')
        good_content.innerHTML = cart_goods[x].name + " " + cart_goods[x].cost + " <b>" + cart_goods[x].count + "шт</b>";
        cur_good.appendChild(minus_btn)
        cur_good.appendChild(good_content)
        cur_good.appendChild(plus_btn)
        cur_good.appendChild(del_btn)
        if (cart_goods[x].count !== 0){
            path_cart.appendChild(cur_good)
        }
    }
    update_price();
}
function compareGoods(a, b){
    if (a.cost > b.cost) return 1
    if (a.cost === b.cost) return 0
    if (a.cost < b.cost) return -1
}
let apply_func = function (){
    let arr = []
    let mn = min_opt.value
    let mx = max_opt.value
    for (let x in goods){
        if (goods[x].cost >= mn && goods[x].cost <= mx){
            arr[arr.length] = {
                name: goods[x].name,
                cost: goods[x].cost
            }
        }
    }
    arr.sort(compareGoods)
    if (sort_opt.value === "u"){
        arr.reverse()
    }
    fill_func(arr)
}
fill_func(goods);
update_price()
trash.addEventListener('click', () =>{
    cart_goods = []
    update_cart()
});
apply_btn.addEventListener('click', () =>{
    apply_func()
})

/*Уведомления*/
let uvd = 1
const notifs = document.getElementById("notifications")
const notif_count = document.getElementById("notif-count")
const notifs_text = document.getElementById("notif-text")
notif_count.innerText = uvd;
function plus_notif(){
    uvd++
    notif_count.innerText = uvd
    let cur_uvd = document.createElement('li')
    cur_uvd.innerText = "Уведомление " + uvd
    notifs_text.appendChild(cur_uvd)
}
let timer = setInterval(plus_notif, 3000)
notifs.addEventListener('click', () =>{
    clearInterval(timer)
    //alert("AAA")
    setTimeout(() => {timer = setInterval(plus_notif, 3000)}, 10000)
})

