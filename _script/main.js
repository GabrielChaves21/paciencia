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
var zIndex = 0; //Variável para mudar o zIndex das cartas no baralho;
var tempo, seg = 1, min = 0; // Varíáveis para contar o tempo

// FUNÇÕES GLOBAIS

function init (){
  for(i = 0, j = 0; i < 4; i++){ // passa pelos naipes
    for(a = 0; a < 13; a++, j++){ // passa pelos valores
      baralho[j] = new Carta(valores[a], naipes[i], $("<div></div>").addClass("carta " + naipeString[i]).on("click", 	mostrar)); // define a Carta
      $(baralho[j].elem).attr("id", baralho[j].index); //Adiciona um id na carta para css
      // debug(document.getElementById(baralho[j].index).carta);
    }
  }
  baralho = sort(baralho); // embaralha
  for(i = 0; i < baralho.length; i++){
    $(baralho[i].elem).appendTo($(".um")); // adiciona o elemento da carta ao div da caixa 1
    document.getElementById(baralho[i].index).carta = baralho[i]; //Pega a referência da carta pelo ID e define a propriedade carta como uma referência do objeto baralho[i]
  }
  timer();
  debug(baralho); // teste

  distribuirCartas();
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
    $(baralho[i].elem).css({left:"0vw",background:"#000",zIndex:zIndex}); //Muda a posição da carta, vira e coloca de volta na posição original, na ordem original
    zIndex += 1;
    baralho[i].virada = true;
  }
}

function mostrar(e){
  var clicada = e.target; //Pega a referência da carta clicada
  var obj = document.getElementById($(clicada).attr("id")).carta;
  $(clicada).css({left:"8vw",background:"10px 10px url('_media/"+obj.naipe+""+obj.valor+".png')",backgroundSize:"contain",backgroundPosition:"center",zIndex:zIndex}); //Muda a posição da carta, muda o atributo virar e muda o zIndex para que as cartas se empilhem
  obj.virada = false; //Define o atributo virada como false
  // debug("_media/"+obj.naipe+""+obj.valor+".png");
  zIndex += 1;
  // debug(document.getElementById($(clicada).attr("id")).carta.virada);
}

function virar (e){
  var clicada = e.target; //Pega a referência da carta clicada
  var obj = document.getElementById($(clicada).attr("id")).carta;
  // debug({background:"10px 10px url('_media/"+obj.naipe+""+obj.valor+".png')",backgroundSize:"contain",backgroundPosition:"center"});
  $(clicada).css({background:"10px 10px url('_media/"+obj.naipe+""+obj.valor+".png')",backgroundSize:"contain",backgroundPosition:"center"});
}

function distribuirCartas(){
  var id = "#ca2"; // prefixo dis IDs das pilhas da caixa 2
  var numSorteados = []; // controle dos números aleatórios para não haver repetição
  for(i = 1, index = 51, j = 0; i < 8; i++){ // percorre pelas 7 pilhas
    for(a = 0; a < i; a++, j++){ // executa o número de vezes correspondente ao index da pilha (1° pilha = 1 vez, 2° pilha = 2 vezes,...)
      var n = getRandomInt(0, index--);
      // pega a referência do elemento do tipo HTMLELement para poder realizar a chamada da função addEventListener()
      $(baralho[n].elem).off("click", mostrar).on("click", virar).css({postition: "absolute", top:a+"0px"});
      var elem = document.getElementById($(baralho.splice(n, 1)[0].elem).attr("id"));
      // debug("N: " + n);
      // debug(elem);
      debug("Baralho Index: "+$(baralho[n].elem).attr("id"));
      debug("In For | a:"+a+" | n:"+n);
      elem.draggable = "true"; // deixa o elemento arrastável
      elem.addEventListener("dragstart", dragstart_handler); // adiciona o manipulador do drag and drop
      // debug(elem);
      $(id+i).append(elem);
    }
    $(baralho[n].elem).css({background:"10px 10px url('_media/"+baralho[n].naipe+""+baralho[n].valor+".png')",backgroundSize:"contain",backgroundPosition:"center"});
    debug("Out For | n:"+n);
  }
}

function dragstart_handler (ev){
  // Adiciona o id do elemento alvo para o objeto de transferência de dados
  ev.dataTransfer.setData("text/plain", ev.target.id);
  debug(ev.target.id);
  ev.dropEffect = "move";
}

function dragover_handler(ev) {
  ev.preventDefault();
  // Define o dropEffect para ser do tipo move
  ev.dataTransfer.dropEffect = "move"
}

function drop_handler(ev) {
  ev.preventDefault();
  // Pega o id do alvo e adiciona o elemento que foi movido para o DOM do alvo
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data)); // adicion o elemento arrastado ao elemento onde foi soltado
}

// FUNÇÕES ÚTEIS----------------------------------------------------------------
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

function isIn(array, n){ // função para verificar se "n" está em "array"
  for (var i = 0; i < array.length; i++) {
    if(array[i] == n) // se n = posição atual de "array"
      return true; // retorna verdadeiro
    // debug("In isIn()'s for");
  }
  return false; // caso "n" não esteja em "array", retorna falso
}

//Função para embaralhar um array
function sort(array){
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
