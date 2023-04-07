
/*
 Globalne varijable, konstante
 */
const igra = document.getElementById("igra");
const polja = igra.childNodes;
let odigrani = []
const main = document.querySelector("main");
let trenutniIgrac = "x";
let playersNum = 2;
let pobjednicki;
let playOrder = "o";
const wins = {x: 0, o: 0}


/**
* vrati varijable na pocetne vrijednosti
* @param: plrNum: number
* @return
 */
const restart = ( plrNum ) => {
    if (plrNum) {
        playersNum = plrNum
        updateScore([0,0])
        playOrder = "o"
    }
    else {
        //ako nije prosljedjen broj znaci da je kliknut restart. U tom slucaju gubi igrac koji je kliknuo restart
        if(odigrani.length < 9 && !pobjednicki)
        trenutniIgrac == "x" ? updateScore([wins.x, wins.o+1]) :updateScore([wins.x+1, wins.o]);
    }
    odigrani = []
    //handlea play order na pocetku runde
    playOrder = playOrder === "x" ? "o" : "x";
    trenutniIgrac = playOrder;
    if(playOrder == "x") {
        main.classList.add("pozadina_crvena")
        main.classList.remove("pozadina_zelena")
        igra.classList.add("iks")
        igra.classList.remove("oks")
    }
    else {
        main.classList.remove("pozadina_crvena")
        main.classList.add("pozadina_zelena")
        igra.classList.remove("iks")
        igra.classList.add("oks")
        if(playersNum === 1) playmove(1)
    }
    //brise pobjednicki div
    if(pobjednicki){igra.removeChild(pobjednicki)
    pobjednicki = null;
    }
    polja.forEach(polje => { polje.id = "" })
}

/**
 * Mjenja koji igrac trenutno igra
 * @returns:
 */
const swapPlayer = () => {
    trenutniIgrac = trenutniIgrac == "x" ? "o" : "x";

    main.classList.toggle("pozadina_crvena")
    main.classList.toggle("pozadina_zelena")

    igra.classList.toggle("iks")
    igra.classList.toggle("oks")
}

/**
 * click handler kad kliknes na igru. Pusha na odigrane poteze, mijenja id, pusti zvuk i poziva gameloop
 *
 * @param e : event
 * @return
 */
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
        e.stopPropagation()
    }

}

/**
 * Inicijalizira varijable na prvom pocetku igre. Dodaje event handlere i poziva restart
 *
 * @param: plrNum: number
 * @return
 */
let startGame = (plrNum) => {
    restart(plrNum)
    polja.forEach(polje => {
        polje.addEventListener("click", odigraj)
    })
}

/**
 * Sakrije i obrise overlay kad kliknem za pocetak igre
 * @return:
 */
let hideOverlay = () => {
    let overlay = document.querySelector(".overlay")
    overlay.classList.add("hide")
    //obrise overlay
    setTimeout(()=> {overlay.style.display = "none"}, 300)
}

/**
 * postavlja imena igraca u divu gdje je score counter
 *
 */
const setPlayerNames = () => {
    const inputi = document.querySelectorAll(".overlay input")
    console.log(inputi)
    const imena = [];
    inputi.forEach( inp => {imena.push(inp.value)})
    console.log(imena)
    document.getElementById("player1Name").innerText = imena[0] + " (x): "
    if (imena.length == 2)
        document.getElementById("player2Name").innerText = imena[1] + " (o): "
    else
        document.getElementById("player2Name").innerText = "Computer"

}
/**
 * Mijenja overlay tako da sada prihvata imena igrača
 * prima broj igraca
 * @param num
 */
const swapOverlay = (num) => {
    let overlay = document.querySelector(".overlay")
    if (num === 1)
        overlay.innerHTML = `
            <h1>Write your name</h1>
            <input>
           <button class="btn" onclick=" startGame(1); setPlayerNames(); hideOverlay(); "> Start Game</button>
         `
    else
        overlay.innerHTML = ` 
            <h1>Write your name</h1>
            <h2>Player 1 ( X )</h2>
            <input>
            <h2>Player 2 ( O )</h2>
            <input>
            <button class="btn" onclick=" startGame(2); setPlayerNames(); hideOverlay() "> Start Game</button>
             `
}

/**
 * pusti zvuk na klik
 * @param ig: string
 * @return
 */
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
/**
 * Prima array koji u sebi ima score u fomatu [x, o], setta score na to i updateuje view
 * @param x
 * @param o
 */
const updateScore = ([x, o]) => {
    wins.x = x;
    wins.o = o;
    document.getElementById("player1Score").innerText = "" + x
    document.getElementById("player2Score").innerText = "" + o
}

/**
 * Prikazuje pobjednicki div
 * @param trenutniIgrac: string
 * @return
 */
function victory(trenutniIgrac) {
    pobjednicki = document.createElement("div")
    pobjednicki.classList.add("pobjednicki")
    pobjednicki.innerHTML = `<h1>${trenutniIgrac.toUpperCase()} WINS</h1>`
    igra.appendChild(pobjednicki)
    updateScore(trenutniIgrac == "x" ? [wins.x+1, wins.o] : trenutniIgrac == "o" ? [wins.x, wins.o+1] : [0, 0])
}

/**
 * funkcija koja provjerava da li se desila pobjeda ili draw
 * @returns boolean
 */
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

/**
 * imitira klik na igricu ako igra kompjuter.
 * prima na koje polje da igra [1-9] i dodaje na array odigranih, mjenja id, poziva checkWin i swapPlayer
 * @param number: number
 * @return
 */
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

/**
 * u prosljedjenom arrayu pronalazi element(target).
 * prolazi od fromIndex do toIndex indexa koji su postavljeni na 0 i array.length ako nisu prosljedjeni
 * prima step kao zadnji parametar
 *
 * @param arr: array
 * @param target: number
 * @param fromIndex: number
 * @param toIndex: number
 * @param step: number
 * @returns number
 */
function findElement(arr , target, fromIndex = 0, toIndex = arr.length - 1, step = 1) {
    for (let i = fromIndex; i <= toIndex; i += step) {
        if (arr[i] === target) {
            return i+1;
        }
    }

    // If searchElement is not found, return -1
    return -1;
}


/**
 * algoritam koji odigra potez ako kompjuter može pobjediti ili prevenirati gubljenje
 * vraca da li je odigrao potez ili ne
 *
 * @returns boolean
 */

function possibleWinOrPreventLoss() {
    //mapira odigrane poteze u ovaj arraj kao: x = 1, o = -1 prazno = 0
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

/**
 * igra na prvo slobodno mjesto
 * @returns
 */
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

/**
 * logika igre
 * ako igraju dva igraca onda samo provjerava jel iko pobjdio
 * ako igra jedan igrac odlucuje gdje ce kompjuter igrati i odigra potez
 */
let gameLoop = () => {

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
// TODO: mobile dizajn
//TODO: ako klikne restart a igra nije gotova onda gubi igrac ciji je red da igra
//todo: logika igrice  i win counteri