window.onload = function () {
    findExternals();
    document.addEventListener("mousedown", showCoords);
    window.addEventListener("resize", changeImagePos);
    changeImagePos();
}

function findExternals() {
    let links = document.getElementsByTagName("a");
    Array.from(links).forEach((link) => {
        if (link.host !== window.location.host)
            link.style.color = "green";
    });
}

function addLiElements() {
    let list = document.getElementById("list");
    let text = prompt("Enter message: ");
    while (text !== null && text !== "") {
        console.log(text);
        let newLi = document.createElement("li");
        newLi.append(`${text}`);
        list.append(newLi);
        text = prompt("Enter message: ");
    }
}
let notifcount = 0
const notifcount_path = document.getElementById("notif-count")
function addNotification() {
    let options = prompt("Enter options: ");
    showNotification(options);
    notifcount_path.style.display = "flex"
    notifcount++
    notifcount_path.innerText = notifcount
}

function showNotification(options) {
    let notificationsPanel = document.getElementById("notif-text");
    let notification = document.createElement("li");
    let closable = options.includes("[closable]");
    notification.innerHTML = options.replace("[closable]", "");
    notification.classList.add("notification");
    notificationsPanel.append(notification);
    let close = document.createElement("button");
    close.innerHTML = "+";
    close.style.transform = "rotate(45deg)"
    close.style.cursor = "pointer"
    close.classList.add("closable");
    close.onclick = () => closeNotification(notification);
    notification.append(close);
    notification.attr = "not"
    setTimeout(function () {
        if (notification.attr === "not"){

            closeNotification(notification)
        }
    }, 15000);
}

function closeNotification(e) {
    e.attr = "already"
    e.remove();
    notifcount--;
    if (notifcount < 1){
        notifcount_path.style.display = "none"
    }
    notifcount_path.innerText = notifcount
}

function showCoords(e) {
    console.log("X: " + e.clientX + " Y: " + e.clientY);
}

function changeImagePos() {
    let image = document.getElementById("customImage");
    image.style.position = "absolute";
    image.style.left = window.innerWidth / 2 - image.width / 2 + "px";
    image.style.top = window.innerHeight / 2 - image.height / 2 + "px";
}