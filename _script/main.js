// Código criado por: Vinicius Xavier e Gabriel Chaves
// Porjeto iniciado em : 25 de Setembro de 2017
/*
Implementações futuras:
- Salvar baralhos com solução
*/

//VARIAVEIS GLOBAIS
var baralho = []; //Carta
var valores = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']; //String
var clicado = false; //Bool
const PAUS = 1; COPAS = 2, ESPADAS = 3, OUROS = 4;
var naipes = [PAUS,COPAS,ESPADAS,OUROS];
var naipeString = ["paus", "copas", "espadas", "ouros"];
var cartasSelecionadas = [13]; //Carta
var zIndex = 0; //Variável para mudar o zIndex das caratas no baralho;
var tempo, seg = 1, min = 0; //Variáveis pra contar o tempo

// FUNÇÕES GLOBAIS

function init (){
  for(i = 0, j = 0; i < 4; i++){ // passa pelos naipes
    for(a = 0; a < 13; a++, j++){ // passa pelos valores
      baralho[j] = new Carta(valores[a], naipes[i], $("<div></div>").addClass("carta " + naipeString[i]).click(mostrar)); // define a Carta
      $(baralho[j].elem).attr("id", baralho[j].index); //Adiciona um id na carta para css
      // debug(document.getElementById(baralho[j].index).carta);
    }
  }
  baralho = sort(baralho); // embaralha
  for(i = 0; i < baralho.length; i++){
    $(baralho[i].elem).appendTo($(".um"));
    document.getElementById(baralho[i].index).carta = baralho[i]; //Pega a referência da carta pelo ID e define a propriedade carta como uma referência do objeto baralho[i]
  }
  timer();
  debug(baralho);
}
function timer(){
  tempo = setInterval(function(){
    $("#tempo").text("Tempo: "+(min < 10?"0"+min:min)+":"+(seg < 10?"0"+seg:seg));
    if(++seg > 59){
    	seg = 0;
    	min++;
    }
  }, 1000);
}
function voltar(e){
  zIndex = 0;
  for(i = 0; i < baralho.length; i++){ // passa por todo o baralho
    debug(baralho[i].virada);
    $(baralho[i].elem).css({left:"1vw",background:"#000",zIndex:zIndex}); //Muda a posição da carta, vira e coloca de volta na posição original, na ordem original
    zIndex += 1;
    baralho[i].virada = true;
  }
}

function mostrar(e){
  var clicada = e.target; //Pega a referência da carta clicada
  var obj = document.getElementById($(clicada).attr("id")).carta;
  $(clicada).css({left:"9vw",background:"10px 10px url('_media/"+obj.naipe+""+obj.valor+".png')",backgroundSize:"contain",backgroundPosition:"center",zIndex:zIndex}); //Muda a posição da carta, muda o atributo virar e muda o zIndex para que as cartas se empilhem
  obj.virada = false; //Define o atributo virada como false
  debug("_media/"+obj.naipe+""+obj.valor+".png");
  zIndex += 1;
  // debug(document.getElementById($(clicada).attr("id")).carta.virada);
}

// FUNÇÕES ÚTEIS
function teste() {
  var resp = prompt("Cmd:");
  switch(resp){
    case "1":
    var naipes = ["paus", "copas", "espadas", "ouros"];
    var cartaDivPaus = $("<div></div>").addClass("cartas");
    var cartaDivCopas = $("<div></div>").addClass("cartas");
    var cartaDivEspadas = $("<div></div>").addClass("cartas");
    var cartaDivOuros = $("<div></div>").addClass("cartas");

    $("body").append(cartaDivPaus).append(cartaDivCopas).append(cartaDivEspadas).append(cartaDivOuros);
    break;
    case "2":
    for(i = 0, j = 0; i < 4; i++){ // passa pelos naipes
      for(a = 0; a < 13; a++, j++){ // passa pelos valores
        baralho[j] = new Carta(valores[a], naipes[i], $("<div></div>").addClass("carta " + naipeString[i]).appendTo($(".um")).click(mostrar)); // define a Carta
        $(baralho[j].elem).attr("id", baralho[j].index); //Adiciona um id na carta para css
        $(baralho[j].elem).css({left:"8vw",background:"#aa0"});
        document.getElementById(baralho[j].index).carta = baralho[j]; //Pega a referência da carta pelo ID e define a propriedade carta como uma referência do objeto baralho[j]
        // debug(document.getElementById(baralho[j].index).carta);
      }
    }
    baralho = sort(baralho); // embaralha
    debug(baralho);
    break;
  }
}

//Função para embaralhar um array
function sort(array){
  function isIn(array, n){ // função para verificar se "n" está em "array"
  for (var i = 0; i < array.length; i++) {
    if(array[i] == n) // se n = posição atual de "array"
    return true; // retorna verdadeiro
    // debug("In isIn()'s for");
  }
  return false; // caso "n" não esteja em "array", retorna falso
}

var sorted = []; // array para armezenar o array sorteado
var pos_sorted = []; // array para armazenar as posições sortiadas
for (var i = 0; i < array.length;) {
  var sort = getRandomInt(0, array.length); // sortea uma posição do "array"
  if(!isIn(pos_sorted, sort)){ // se a posição sortiada não estiver no "array"
  pos_sorted[i] = sort; // adicina a posição sortiada ao array "pos_sorted"
  i++; // incrementa o iterador
}
// debug("In first sort()'s for");
}

for (var i = 0; i < array.length; i++) {
  sorted[i] = array[pos_sorted[i]]; // adiciona o valor da primeira posição sortiada ao array "sorted"
  // debug("In second sort()'s for");
}

return sorted;
}
//Função para randomizar um int
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function debug(s){
  console.log(s);
}
