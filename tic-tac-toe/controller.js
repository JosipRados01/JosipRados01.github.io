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

const deepReset = (plrNum, playerNum, playOrder) => {
    if (plrNum) {
        playersNum = plrNum
        updateScore([0,0])
        playOrder = "o"
    }
}


const swapPlayer = () => {
    currentPlayer = currentPlayer == "x" ? "o" : "x";

    main.classList.toggle("pozadina_crvena")
    main.classList.toggle("pozadina_zelena")

    game.classList.toggle("iks")
    game.classList.toggle("oks")
}