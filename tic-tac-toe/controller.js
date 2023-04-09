import view from "./view";
import logic from "./logic";

/**
 * Handles what happens when the reser button is hit.
 * adds a win if necessary, sets current player, 
 */
const nextRound = () => {
    logic.nextRound()
    view.nextRound()
}

const deepReset = (plrNum) => {
    if(plrNum != logic.playersNum){
        //todo: poziva scorecoutner.setNames 
    }
    logic.deepReset(plrNum)
    view.deepReset()
}


const swapPlayer = () => {
    logic.swapPlayer();
    view.swapPlayer();
}

// todo: refaktorisat da ne koristi target
let clickHandler = (e) => {
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