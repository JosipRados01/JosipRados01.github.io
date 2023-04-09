
/*
 Globalne varijable, konstante
 */
const game = document.getElementById("igra");
const gameFields = game.childNodes;
let moves = []
const main = document.querySelector("main");
let currentPlayer = "x";
let playersNum = 2;
let winnerDiv;
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
        if(moves.length < 9 && !winnerDiv)
        currentPlayer == "x" ? updateScore([wins.x, wins.o+1]) :updateScore([wins.x+1, wins.o]);
    }
    moves = []
    //handlea play order na pocetku runde
    playOrder = playOrder === "x" ? "o" : "x";
    currentPlayer = playOrder;
    if(playOrder == "x") {
        main.classList.add("pozadina_crvena")
        main.classList.remove("pozadina_zelena")
        game.classList.add("iks")
        game.classList.remove("oks")
    }
    else {
        main.classList.remove("pozadina_crvena")
        main.classList.add("pozadina_zelena")
        game.classList.remove("iks")
        game.classList.add("oks")
        if(playersNum === 1) playmove(1)
    }
    //brise pobjednicki div
    if(winnerDiv){game.removeChild(winnerDiv)
    winnerDiv = null;
    }
    gameFields.forEach(field => { field.id = "" })
}

/**
 * Mjenja koji igrac trenutno igra
 * @returns:
 */
const swapPlayer = () => {
    currentPlayer = currentPlayer == "x" ? "o" : "x";

    main.classList.toggle("pozadina_crvena")
    main.classList.toggle("pozadina_zelena")

    game.classList.toggle("iks")
    game.classList.toggle("oks")
}

/**
 * click handler kad kliknes na igru. Pusha na odigrane poteze, mijenja id, pusti zvuk i poziva gameloop
 *
 * @param e : event
 * @return
 */
let clickHandler = (e) => {
    console.log(e.target)
    //odigra potez samo ako nije kliknut prije blok
    if(e.target.parentNode.id == ""){
        moves.push({index: e.target.parentNode.dataset.number,  value: currentPlayer == "x" ? 1 : -1})
        //TODO: dodat 3 varijante slike nakon sto kliknes
        e.target.parentNode.id = "odigrano_" + currentPlayer
        //zvuk
        playSound(currentPlayer);
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
    gameFields.forEach(field => {
        field.addEventListener("click", clickHandler)
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
    const inputs = document.querySelectorAll(".overlay input")
    console.log(inputs)
    const names = [];
    inputs.forEach( inp => {names.push(inp.value)})
    console.log(names)
    document.getElementById("player1Name").innerText = names[0] + " (x): "
    if (names.length == 2)
        document.getElementById("player2Name").innerText = names[1] + " (o): "
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
    winnerDiv = document.createElement("div")
    winnerDiv.classList.add("pobjednicki")
    winnerDiv.innerHTML = `<h1>${trenutniIgrac.toUpperCase()} WINS</h1>`
    game.appendChild(winnerDiv)
    updateScore(trenutniIgrac == "x" ? [wins.x+1, wins.o] : trenutniIgrac == "o" ? [wins.x, wins.o+1] : [wins.x, wins.o])
}

/**
 * funkcija koja provjerava da li se desila pobjeda ili draw
 * @returns boolean
 */
function checkWin() {
    //podjeli poteze na ikseve i okseve
    let xFields= []
    let oFields = []
    moves.forEach( move => {
        if(move.value == 1) xFields.push(move.index)
        if(move.value == -1) oFields.push(move.index)
    })
    //provjeri da li je iko odigrao pobjedu
    let winningCombinations = [    
        // horizontal
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        // diagonal
        ["0", "4", "8"],
        ["6", "4", "2"],
        // vertical
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"]
    ];

    for ( i = 0; i < winningCombinations.length;i++){
        if(winningCombinations[i].every(el => xFields.includes(el))) { victory(currentPlayer, i); return true }
        if(winningCombinations[i].every(el => oFields.includes(el))) { victory(currentPlayer, i); return true }
    }
    //ako je puna tabla
    if(moves.length == 9) victory("nobody", 1)
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
        let myField = document.querySelector(`[data-number='${number}']`);

        moves.push({index: "" + number,  value: currentPlayer == "x" ? 1 : -1})
        //TODO: dodat 3 varijante slike nakon sto kliknes
        myField.id = "odigrano_" + currentPlayer
        //zvuk
        playSound(currentPlayer);
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
            return i;
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
    boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    moves.forEach( move => {
        boardState[move.index] = move.value
    })
    let possibleLoss = []
    console.log(boardState)

    // horizontalno
    for (let i = 0; i < 9; i += 3) {
        let sum = boardState[i] + boardState[i+1] + boardState[i+2];
        if (sum === 2) {
            if(currentPlayer == "x") {
                playmove(findElement(boardState, 0, i));
                return true
            }
            else {
                possibleLoss.push(findElement(boardState, 0, i))
            }
        } else if (sum === -2) {
            if(currentPlayer == "o") {
                playmove(findElement(boardState, 0, i));
                return true
            }
            else {
                possibleLoss.push(findElement(boardState, 0, i))
            }
        }
    }

    // vertikalno
    for (let i = 0; i < 3; i++) {
        const sum = boardState[i] + boardState[i+3] + boardState[i+6];
        if (sum === 2) {
            if(currentPlayer == "x") {
                playmove(findElement(boardState, 0, i, 8, 3));
                return true
            }
            else {
                possibleLoss.push(findElement(boardState, 0, i, 8, 3))
            }
        } else if (sum === -2) {
            if(currentPlayer == "o") {
                playmove(findElement(boardState, 0, i, 8, 3));
                return true
            }
            else {
                possibleLoss.push(findElement(boardState, 0, i, 8, 3))
            }
        }

    }

    // diagonalno
    const diag1Sum = boardState[0] + boardState[4] + boardState[8];
    const diag2Sum = boardState[2] + boardState[4] + boardState[6];
    if (diag1Sum === 2) {
        if (currentPlayer == "x") {
            playmove(findElement(boardState, 0, 0, 8, 4));
            return true
        }
        else {
            possibleLoss.push(findElement(boardState, 0, 0, 8, 4))
        }
    } else if (diag1Sum === -2) {
        if (currentPlayer == "o") {
            playmove(findElement(boardState, 0, 0, 8, 4));
            return true
        }
        else {
            possibleLoss.push(findElement(boardState, 0, 0, 8, 4))
        }

    } else if (diag2Sum === 2) {
        if (currentPlayer == "x") {
            playmove(findElement(boardState, 0, 2, 7, 2));
            return true
        }
        else {
            possibleLoss.push(findElement(boardState, 0, 2, 7, 2))
        }
    } else if (diag2Sum === -2) {
        if (currentPlayer == "o") {
            playmove(findElement(boardState, 0, 2, 7, 2));
            return true
        }
        else {
            possibleLoss.push(findElement(boardState, 0, 2, 7, 2))
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
        moves.forEach((move)=> {
            if(move.index == "" + i) {
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
const gameLoop = () => {

    if(checkWin()) console.log("yay")
    else {

        swapPlayer()
        //ako je one player mode ovdje odlucuje gdje ce sodigrati potez
        if (playersNum == 1) {
            //ako igra prvi odigra cosak
            if (moves.length < 1)
                playmove(1)
            //ako igra drugi odigra u centar, ako ne moze igra u cosak
            else if (moves.length == 1) {
                if (moves[0].index == 5) playmove(1)
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
    console.log(moves)
}
console.log()
// TODO: mobile dizajn
//todo: dokumentaciju prevest na engleski
//todo: inplementirat undo
//todo:prevest u Astro
//todo:
//todo:
//TODO: ako klikne restart a igra nije gotova onda gubi igrac ciji je red da igra
//todo: logika igrice  i win counteri