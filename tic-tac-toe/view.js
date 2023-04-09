
const igra = document.getElementById("igra");
const polja = igra.childNodes;
const main = document.querySelector("main");
let pobjednicki;

export default {
    /**
     *
     */
    nextRound: () => {
        /*
        the long way
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
        }*/

        this.swapPlayer();

        //deletes the victory div if it exists
        if(pobjednicki){
            igra.removeChild(pobjednicki)
            pobjednicki = null;
        }
        //resets ids
        polja.forEach(polje => { polje.id = "" })
    
    },

    deepReset: ()=> {
        main.classList.add("pozadina_crvena")
        main.classList.remove("pozadina_zelena")
        igra.classList.add("iks")
        igra.classList.remove("oks")

        //todo: odvojit u svoju funkciju jer se ponavlja
        if(pobjednicki){
            igra.removeChild(pobjednicki)
            pobjednicki = null;
        }
        //resets ids
        polja.forEach(polje => { polje.id = "" })
    },

    swapPlayer: () => {
        main.classList.toggle("pozadina_crvena")
        main.classList.toggle("pozadina_zelena")

        igra.classList.toggle("iks")
        igra.classList.toggle("oks")
    },

    


    
}