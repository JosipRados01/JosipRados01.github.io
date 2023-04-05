
let igra = document.getElementById("igra");
let polja = igra.childNodes;
let odigrani = []
let main = document.querySelector("main");
let trenutniIgrac = "x";
let playersNum = 2;
let pobjednicki;
//vrati varijable na pocetne vrijednosti

let restart = ( plrNum = playersNum) => {
    playersNum = plrNum
    odigrani = []
    main.classList.add("pozadina_crvena")
    main.classList.remove("pozadina_zelena")
    igra.classList.add("iks")
    igra.classList.remove("oks")
    //TODO: koji igrac fakat pocinje mora pratit
    trenutniIgrac = "x";
    if(pobjednicki){igra.removeChild(pobjednicki)
    pobjednicki = false;
    }
    console.log("playersNum: " + playersNum)

    polja.forEach(polje => { polje.id = "" })
}
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
    console.log(e.target)
    //odigra potez samo ako nije kliknut prije blok
    if(e.target.parentNode.id == ""){
        odigrani.push({broj: e.target.parentNode.dataset.number,  vrijednost: trenutniIgrac == "x" ? 1 : -1})
        //TODO: dodat 3 varijante slike nakon sto kliknes
        e.target.parentNode.id = "odigrano_" + trenutniIgrac
        //zvuk
        playSound(trenutniIgrac);
        gameLoop();
        console.log(trenutniIgrac)
        e.stopPropagation()
    }

}

//dodaje eventlisenere
let startGame = (plrNum) => {
    restart(plrNum)
    polja.forEach(polje => {
        polje.addEventListener("click", odigraj)
    })
}

//hide overlay
let hideOverlay = (num) => {
    let overlay = document.querySelector(".overlay")
    overlay.classList.add("hide")
    //obrise overlay
    setTimeout(()=> {overlay.style.display = "none"}, 300)
}

//pusti zvuk na klik
let playSound = (ig)=> {
    if(ig == "x") {
        //play X sound
        document.getElementById("xSound").play()
    }
    else {
        //play O sound
        document.getElementById("oSound").play()
    }
}

function victory(trenutniIgrac, i) {
    pobjednicki = document.createElement("div")
    pobjednicki.classList.add("pobjednicki")
    pobjednicki.innerHTML = `<h1>${trenutniIgrac.toUpperCase()} WINS</h1>`

    igra.appendChild(pobjednicki)
}

//funkcija koja provjerava da li se desila pobjeda
function checkWin() {
    //podjeli poteze na ikseve i okseve
    let iksevi= []
    let oksevi = []
    odigrani.forEach( potez => {
        if(potez.vrijednost == 1) iksevi.push(potez.broj)
        if(potez.vrijednost == -1) oksevi.push(potez.broj)
    })
    //provjeri da li je iko odigrao pobjedu
    let dobitneKombinacije = [
        //horizontale
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        //dijagonale
        ["1", "5", "9"],
        ["7", "5", "3"],
        //vertikale
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"]
    ]

    for ( i = 0; i < dobitneKombinacije.length;i++){
        if(dobitneKombinacije[i].every(el => iksevi.includes(el))) { victory(trenutniIgrac, i); return true }
        if(dobitneKombinacije[i].every(el => oksevi.includes(el))) { victory(trenutniIgrac, i); return true }
    }
    //ako je puna tabla
    if(odigrani.length == 9) victory("nobody", 1)
    return false
}

function playmove(number) {
    setTimeout(()=> {
        let mojePolje = document.querySelector(`[data-number='${number}']`);

        odigrani.push({broj: "" +number,  vrijednost: trenutniIgrac == "x" ? 1 : -1})
        //TODO: dodat 3 varijante slike nakon sto kliknes
        mojePolje.id = "odigrano_" + trenutniIgrac
        //zvuk
        playSound(trenutniIgrac);
        checkWin()
        swapPlayer()
    }, 1000)

}

function findElement(arr , target, fromIndex = 0, toIndex = arr.length - 1, step = 1) {
    for (let i = fromIndex; i <= toIndex; i += step) {
        if (arr[i] === target) {
            return i+1;
        }
    }

    // If searchElement is not found, return -1
    return -1;
}


//
function possibleWinOrPreventLoss() {
    potezi = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    odigrani.forEach( potez => {
        potezi[potez.broj-1] = potez.vrijednost
    })
    let possibleLoss = []

    // horizontalno
    for (let i = 0; i < 9; i += 3) {
        let sum = potezi[i] + potezi[i+1] + potezi[i+2];
        if (sum === 2) {
            if(trenutniIgrac == "x") {
                playmove(findElement(potezi, 0, i));
                return true
            }
            else {
                possibleLoss.push(findElement(potezi, 0, i))
            }
        } else if (sum === -2) {
            if(trenutniIgrac == "o") {
                playmove(findElement(potezi, 0, i));
                return true
            }
            else {
                possibleLoss.push(findElement(potezi, 0, i))
            }
        }
    }

    // vertikalno
    for (let i = 0; i < 3; i++) {
        const sum = potezi[i] + potezi[i+3] + potezi[i+6];
        if (sum === 2) {
            if(trenutniIgrac == "x") {
                playmove(findElement(potezi, 0, i, 8, 3));
                return true
            }
            else {
                possibleLoss.push(findElement(potezi, 0, i, 8, 3))
            }
        } else if (sum === -2) {
            if(trenutniIgrac == "o") {
                playmove(findElement(potezi, 0, i, 8, 3));
                return true
            }
            else {
                possibleLoss.push(findElement(potezi, 0, i, 8, 3))
            }
        }

    }

    // diagonalno
    const diag1Sum = potezi[0] + potezi[4] + potezi[8];
    const diag2Sum = potezi[2] + potezi[4] + potezi[6];
    if (diag1Sum === 2) {
        if (trenutniIgrac == "x") {
            playmove(findElement(potezi, 0, 0, 8, 4));
            return true
        }
        else {
            possibleLoss.push(findElement(potezi, 0, 0, 8, 4))
        }
    } else if (diag1Sum === -2) {
        if (trenutniIgrac == "o") {
            playmove(findElement(potezi, 0, 0, 8, 4));
            return true
        }
        else {
            possibleLoss.push(findElement(potezi, 0, 0, 8, 4))
        }

    } else if (diag2Sum === 2) {
        if (trenutniIgrac == "x") {
            playmove(findElement(potezi, 0, 2, 7, 2));
            return true
        }
        else {
            possibleLoss.push(findElement(potezi, 0, 2, 7, 2))
        }
    } else if (diag2Sum === -2) {
        if (trenutniIgrac == "o") {
            playmove(findElement(potezi, 0, 2, 7, 2));
            return true
        }
        else {
            possibleLoss.push(findElement(potezi, 0, 2, 7, 2))
            return true
        }
    }

    if (possibleLoss.length > 0){
        playmove(possibleLoss[0])
        console.log("pl")
        return true
    }
    return false


}

function playRandom() {
    flag = true
    for (i = 1; i < 10;i++){
        odigrani.forEach((potez)=> {
            if(potez.broj == "" + i) {
                flag = false
            }
        })
        if(flag) {playmove(i); break}
        else {flag = true}
    }
}

//gameloop
let gameLoop =( ) => {

    if(checkWin()) console.log("yay")
    else {

        swapPlayer()
        //ako je one player mode ovdje odlucuje gdje ce sodigrati potez
        if (playersNum == 1) {
            //ako igra prvi odigra cosak
            if (odigrani.length < 1)
                playmove(1)
            //ako igra drugi odigra u centar, ako ne moze igra u cosak
            else if (odigrani.length == 1) {
                if (odigrani[0].broj == 5) playmove(1)
                else playmove(5)
            }
            //ako moze pobjedit pobjedi, ako moze izgubit blokira te
            else if (possibleWinOrPreventLoss()) console.log("wopl");
            // odigra randomly
            else {
                playRandom();
                console.log("Random")
            }
        }
    }
}
console.log()

//TODO: ako klikne restart a igra nije gotova onda gubi igrac ciji je red da igra
//todo: logika igrice  i win counteri
