
//console.log("linked")
/* Organizacija koda:
  varijable
  pomocne funkcije
  main funkcija
*/
//varijable
let kanvas = document.getElementById("canvas");
let ctx = kanvas.getContext("2d");
let sirina = kanvas.clientWidth;
let visina = kanvas.clientWidth;

let normalMuzika = new Audio("sound/Muzikica.mp3")
normalMuzika.loop = true
let hardMuzika = new Audio("sound/muzikicaHard.mp3")
hardMuzika.loop = true
let easyMuzika = new Audio("sound/muzikicaEasy.mp3")
easyMuzika.loop = true
let muzika
let njam = new Audio("sound/pojede.mp3");
let kraj = new Audio("sound/kraj.mp3");
let odbrojavanje = new Audio("sound/odbrojavanje.mp3");
let posebni = new Audio("sound/posebni.mp3");

let pocetak = false
let listaKrugova = [];
let maxKrugova = 7;
let difficulty = 5;
let epsilon = 2
let brzina = 7 //za burek
let omjer = 0.5
let mis = {
  x : -1,
  y : -1
};
let burek = {
  x : sirina/2,
  y : visina/2 - 200,
  povrsina : 20,
};



let dugmeEz = document.getElementById("ez");
let dugmeMid = document.getElementById("mid");
let dugmeGg = document.getElementById("gg");

//pomocne funkcije
// dobija poziciju misa 
document.onmousemove = function pozicijaMisa(event) {
  let canv = kanvas.getBoundingClientRect();
  mis.x = event.clientX - canv.left;
  mis.y = event.clientY - canv.top;
  //console.log(mis.x, mis.y);
 };

// povecava myksimalni broj krugova svakih 4 sekunde
setInterval(() => {
  maxKrugova += 1
}, 4000);

//zapocne igricu na klik dugmeta
function btnclicked (tezina){
  if (tezina == 10) {
    difficulty = tezina;
    brzina = tezina - 2;
    omjer = 0.3;
    muzika = hardMuzika;
  }
  else if(tezina == 3){
    difficulty = tezina;
    brzina = tezina + 2;
    omjer = 0.7;
    muzika = easyMuzika;
  }
  else {
    difficulty = tezina;
    brzina = tezina + 2;
    muzika = normalMuzika;
  }
  maxKrugova = 7; 
 countdown();
 setTimeout(() => {muzika.play()}, 4000)
 setTimeout(startgame, 4000)
}


function spawnujeKrug() {
  let neki = Math.random()
  let krug = {
    x : 0,
    y : 0,
    vel : difficulty,
    smjer : "",
    direction : {
      x : 1, 
      y : 1  
    },
    size: false,
    povrsina : 0,
    specijal : false
  }

  if (neki < 0.25) {
    krug.x = 0;
    krug.y = Math.round(Math.random() * (visina - 40));
    krug.smjer = "desno";
  }
  else if(neki > 0.25 && neki < 0.5) {
    krug.x = sirina;
    krug.y = Math.round(Math.random() * (visina - 40));
    krug.smjer = "lijevo";
  }
  else if  ( neki > 0.5 && neki < 0.75){
    krug.x = Math.round(Math.random() * (sirina - 40))
    krug.y = 0;
    krug.smjer = "dole";
  }
  else {
    krug.x = Math.round(Math.random() * (sirina - 40))
    krug.y = visina
    krug.smjer = "gore";
  }

  neki = Math.random()
  if (krug.smjer == "desno") {
    krug.direction.x = Math.random() * difficulty
    if(neki < 0.5){
      krug.direction.y = difficulty - krug.direction.x
    }
    else {
      krug.direction.y = -(difficulty - krug.direction.x)
    }
  }
  if (krug.smjer == "lijevo") {
    krug.direction.x = -(Math.random() * difficulty)
    if(neki < 0.5){
      krug.direction.y = difficulty - Math.abs(krug.direction.x)
    }
    else {
      krug.direction.y = -(difficulty - Math.abs(krug.direction.x))
    }

  }
  if (krug.smjer == "gore"){
    krug.direction.y = - (Math.random() * difficulty)
    if(neki < 0.5){
      krug.direction.x = difficulty - Math.abs(krug.direction.y)
    }
    else {
      krug.direction.x = -(difficulty - Math.abs(krug.direction.y))
    }
  }
  if (krug.smjer == "dole") {
    krug.direction.y = Math.random() * difficulty
    if(neki < 0.5){
      krug.direction.x = difficulty - krug.direction.y
    }
    else {
      krug.direction.x = -(difficulty - krug.direction.y)
    }
  }

  neki = Math.random()
  if(neki > omjer) {
    krug.size = true
  }

  if (krug.size) {
    krug.povrsina = burek.povrsina + 3 + (Math.random() * 5)
  }
  else {
    krug.povrsina = burek.povrsina - 3 - (Math.random() * 5)
  }
  neki = Math.random()
  if (neki < 0.1) { // smanjit ucestalost specijala
    krug.specijal = true
    krug.povrsina = 20
  }
  return krug
}
 
function pomjeraBurek() {
  //pomjeram desno
  if (burek.x < mis.x) {
    burek.x += brzina
  }
  //pomjeram lijevo
  if (burek.x > mis.x ) {
    burek.x -= brzina
  }
  // pomjeram dole
  if (burek.y < mis.y) {
    burek.y += brzina
  }
  //pomjeram gore
  if (burek.y > mis.y) {
    burek.y -= brzina
  }
}

function countdown() {
  odbrojavanje.play();
  let kanvas = document.getElementById("canvas");
  let ctx = kanvas.getContext("2d");
  ctx.clearRect(0, 0, sirina, visina);
  ctx.font="100px Arial";
  ctx.fillStyle = "#664228";
  ctx.fillText("3", sirina/2 -40, visina/2 -150)
  window.setTimeout(function(){
    ctx.clearRect(0, 0, sirina, visina);
    ctx.font="100px Arial";
    ctx.fillStyle =  "#664228"
    ctx.fillText("2", sirina/2 -40, visina/2 -150)
  }, 900)
  window.setTimeout(function(){
    ctx.clearRect(0, 0, sirina, visina);
    ctx.font="100px Arial";
    ctx.fillStyle = "#664228"
    ctx.fillText("1", sirina/2 -40, visina/2 -150)
    
  }, 1800)
  window.setTimeout(function(){
    ctx.clearRect(0, 0, sirina, visina);
    ctx.font="100px Arial";
    ctx.fillStyle =  "#664228"
    ctx.fillText("GO!",sirina/2 -100, visina/2 -150)
    
  }, 2700)
}

function nacrtaj() {

  //cisti ekran
  ctx.clearRect(0, 0, sirina, visina);
  //crta mene (napravit sliku bureka)
  ctx.beginPath();
  ctx.arc(burek.x, burek.y, burek.povrsina, 0, 2* Math.PI);
  ctx.fillStyle = "#945a30";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#A0A0A0';
  ctx.stroke();

  //crta ostale krugove (manji su zeljanica a veci sirnica)
  for (let i in listaKrugova) {
    if (listaKrugova[i].specijal) {
      /*ctx.beginPath();
      ctx.arc(listaKrugova[i].x, listaKrugova[i].y, listaKrugova[i].povrsina, 0, 2* Math.PI);
      fillStyle = "black";
      ctx.fill();*/
      ctx.beginPath();
      ctx.arc(listaKrugova[i].x, listaKrugova[i].y, listaKrugova[i].povrsina, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#0000FF';
      ctx.fill();
      ctx.arc(listaKrugova[i].x, listaKrugova[i].y, listaKrugova[i].povrsina, 0, 2 * Math.PI, false);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 7
      ctx.stroke();
    }
    else{
    /*ctx.beginPath();
    ctx.arc(listaKrugova[i].x, listaKrugova[i].y, listaKrugova[i].povrsina, 0, 2* Math.PI);
    fillStyle = "blue";
    ctx.fill();*/
    ctx.beginPath();
    ctx.arc(listaKrugova[i].x, listaKrugova[i].y, listaKrugova[i].povrsina, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#A5723E';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#A0A0A0';
    ctx.stroke();

    };
  };

}


function startgame() {
pocetak = true
};
//main game loop
setInterval(() => {
  if(pocetak){

    // spawnuje krugove
  while (listaKrugova.length < maxKrugova) {
    listaKrugova.push(spawnujeKrug(difficulty, burek))
    //console.log(listaKrugova.length)
  };

  pomjeraBurek();
    //console.log("Frame", burek.x, burek.y)
  // pomjeram ostale krugove
  for ( let i in listaKrugova ) {
    listaKrugova[i].x += listaKrugova[i].direction.x
    listaKrugova[i].y += listaKrugova[i].direction.y
    };
  //brisem krugove koji su otisli sa ekrana
  for (let i in listaKrugova) {
    if (listaKrugova[i].x > sirina || listaKrugova[i].x < 0 || listaKrugova[i].y > visina || listaKrugova[i].y < 0){
      listaKrugova.splice(i, 1);
    }
  };

  //collision sa burekom
for (let i in listaKrugova) {
    //colider if
    if (Math.abs(listaKrugova[i].x - burek.x) < burek.povrsina && Math.abs(listaKrugova[i].y - burek.y) < burek.povrsina){
        
      if (listaKrugova[i].specijal == false && (listaKrugova[i].povrsina > burek.povrsina) || burek.povrsina > 1000) {
        //on mene pojede
        muzika.pause();
        muzika.load();
        kraj.play(); 
        window.alert("Ups! Izgubili ste :(   Vas score je: " + (burek.povrsina * difficulty * maxKrugova /10) )
        pocetak = false
        listaKrugova = [];
        maxKrugova = 7;
        difficulty = 5;
        epsilon = 2;
        brzina = 7;
        
        burek.x = sirina/2 - 50;
        burek.y = visina/2 -200;
        burek.povrsina = 20
        ctx.clearRect(0, 0, sirina, visina);
      }
      else if(listaKrugova[i].specijal) {
        // napravim 4 slucaja za specijalni krug i obrisem ga 
        posebni.play();
        neki = Math.random() 
        if (neki < 0.25) {
          difficulty += 3
          setTimeout (() => {
            difficulty -= 3
          }, 5000)
          listaKrugova.splice(i, 1);
          console.log("case 1")
        }
        else if (neki > 0.25 && neki < 0.5) {
          burek.povrsina *= 2
          listaKrugova.splice(i, 1);
          console.log("case 2");
        }
        else if (neki > 0.5 && neki < 0.75) {
          burek.povrsina = Math.ceil(burek.povrsina / 2)
          listaKrugova.splice(i, 1);
          console.log("case 3");
        }
        else {
          for (let j in listaKrugova) {
            listaKrugova[j].direction.x = -(listaKrugova[j].direction.x)
            listaKrugova[j].direction.y = -(listaKrugova[j].direction.y)
          }
          listaKrugova.splice(i, 1);
          console.log("case 4");
        }
      }
      else {
        //ja njega pojedem i dobijem dio mase
        burek.povrsina += Math.ceil(listaKrugova[i].povrsina /15)
        console.log(burek.povrsina)
        njam.play();
        listaKrugova.splice(i, 1);
      };
    };
  }
  nacrtaj();

  };
}, 15);
