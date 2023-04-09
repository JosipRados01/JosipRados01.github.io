
const igra = document.getElementById("igra");
const polja = igra.childNodes;
const main = document.querySelector("main");

export default {
    /**
     * 
     * @param {string} playOrder 
     * @param {Element} main 
     * @param {Element} igra 
     * @param {Element?} pobjednicki 
     * @param {NodeListOf<ChildNode>} polja 
     */
    nextRound: (playOrder, main, igra, pobjednicki, polja) => {
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
           // TODO: ovo je bilo tu wtf  if(playersNum === 1) playmove(1)
        }

        //deletes the victory div if it exists
        if(pobjednicki){
            igra.removeChild(pobjednicki)
            pobjednicki = null;
        }
        //resets ids
        polja.forEach(polje => { polje.id = "" })
    
    }
}