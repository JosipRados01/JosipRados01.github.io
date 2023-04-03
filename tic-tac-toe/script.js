
let igra = document.getElementById("igra");
let polja = igra.childNodes;
let odigrani = []
let main = document.querySelector("main");
let trenutniIgrac = "x";
let prviPut = true

//vrati varijable na pocetne vrijednosti

let restart = () => {
    odigrani = []
    main.classList.add("pozadina_crvena")
    main.classList.remove("pozadina_zelena")
    igra.classList.add("iks")
    igra.classList.remove("oks")
    trenutniIgrac = "x";

    polja.forEach(polje => { polje.id = "" })
}

//mjenja koji igrac igra na klik
let initialize = () => {
    restart()

    //mjenja igraca
    let swapPlayer = () => {
        trenutniIgrac = trenutniIgrac == "x" ? "o" : "x";

        main.classList.toggle("pozadina_crvena")
        main.classList.toggle("pozadina_zelena")

        igra.classList.toggle("iks")
        igra.classList.toggle("oks")
    }
    //handler za klik
    let odigraj = (e) => {
        console.log(igra)
        //odigra potez samo ako nije kliknut prije blok
        if(e.target.parentNode.id == ""){
            odigrani.push({broj: e.target.parentNode.dataset.number,  vrijednost: trenutniIgrac == "x" ? 1 : -1})
            e.target.parentNode.id = "odigrano_" + trenutniIgrac
            //zamjeni igraca
            swapPlayer();
            console.log(odigrani)
        }
    }

//dodaje eventlisenere prvi put
    if (prviPut) {
        polja.forEach(polje => {
            polje.addEventListener("click", odigraj)
        })
        prviPut = false;
    }
}
initialize()

//hide overlay
let hideOverlay = (num) => {
    let overlay = document.querySelector(".overlay")
    overlay.classList.add("hide")
    //obrise overlay
    setTimeout(()=> {overlay.style.display = "none"}, 300)
}

//todo: logika igrice  i win counteri