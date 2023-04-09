

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
    trenutniIgrac = trenutniIgrac == "x" ? "o" : "x";

    main.classList.toggle("pozadina_crvena")
    main.classList.toggle("pozadina_zelena")

    igra.classList.toggle("iks")
    igra.classList.toggle("oks")
}