/**
 * State
 */
let odigrani = []
let trenutniIgrac = "x";
let playersNum = 2;
let pobjednicki;
let playOrder = "o";
const wins = {x: 0, o: 0};

export default {

    nextRound: () => {
        if(odigrani.length < 9 && !pobjednicki)
            currentPlayer == "x" ? updateScore([wins.x, wins.o+1]) :updateScore([wins.x+1, wins.o]);
    
        odigrani = []
        //handlea play order na pocetku runde
        playOrder = playOrder === "x" ? "o" : "x";
        currentPlayer = playOrder;
        
    }
}