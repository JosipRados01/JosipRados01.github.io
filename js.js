console.log("connected")
let notification = document.getElementById("notification")

function kopiraj(){
    navigator.clipboard.writeText("josiprados.biz@gmail.com");
    notification.classList.add("show")
    setTimeout(() => {
        notification.classList.remove("show")
    }, 2000)
}

function skrollaj(ime){
    let el = document.getElementById(ime);
    el.scrollIntoView({behavior: "smooth"});
}