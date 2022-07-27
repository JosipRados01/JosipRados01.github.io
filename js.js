console.log("connected")
let notification = document.getElementById("notification")

function kopiraj(){
    navigator.clipboard.writeText("josiprados.biz@gmail.com");
    notification.classList.add("showup")
    setTimeout(() => {
        notification.classList.remove("showup")
    }, 2000)
}

function skrollaj(ime){
    let el = document.getElementById(ime);
    el.scrollIntoView({behavior: "smooth"});
}



// fade in animacije
let elementi = document.querySelectorAll(".fader")

const observer = new IntersectionObserver( entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        if (entry.isIntersecting) {observer.unobserve(entry.target)}
    })
},{
    threshold : 0.2,
    rootMargin: "-30px"
})

elementi.forEach(element => {
    observer.observe(element)
})
