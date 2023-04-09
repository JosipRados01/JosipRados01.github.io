/**
 * State
 */

let moves = []
let currentPlayer = "x";
let playersNum = 2;
let winnerDiv;
let playOrder = "o";
const wins = {x: 0, o: 0}
let victoryState = false



/**
 * funkcija koju koristim da provjerim da li je polje sa indeksom vec igrano
 * @param {string} num 
 * @returns {bool}
 */
const checkIfPlayed = (num) => {
    moves.forEach(move => {if(move.index == num) return true} )
    return false
}


export default {

    nextRound: () => {
        if(odigrani.length < 9 && !victoryState)
            currentPlayer == "x" ? updateScore([wins.x, wins.o+1]) : updateScore([wins.x+1, wins.o]);
    
        odigrani = []
        //handlea play order na pocetku runde
        playOrder = playOrder === "x" ? "o" : "x";
        currentPlayer = playOrder;
        victoryState = false;
    },

    deepReset: (plrNum) => {
        playersNum = plrNum
        updateScore([0, 0])
        playOrder = "x"
        odigrani = []
        currentPlayer = playOrder;
    },
    
    swapPlayer: ()=> {
        currentPlayer = currentPlayer === "x" ? "o" : "x";
    },

    //todo: refactorat da koriste istu funkciju i komp i igrac




}