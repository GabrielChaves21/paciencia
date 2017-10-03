// Código criado por: Vinicius Xavier e Gabriel Chaves
// Porjeto iniciado em : 25 de Setembro de 2017
function Caixa() {
  this.tipo; //Int
  this.recebe; //Bool
  this.perde; //Bool
  this.ordem; //Int: 1- Crescente, 2- Decrescente, 3- Aletório
  this.qntCartas; //Int Caixa 1 - 24, Caixa 2 - 28, Caixa 3 - 0
  this.pilha = []; //Pilha[]
  this.acao = function(p1,p2){}
  this.distribuirCartas = function(){}
}

function Pilha() {
  this.carta = []; //Carta
  this.id; //Int
  this.acao = function(c){}
}

function Carta(valor, naipe, elem) {
  this.index = "c" + valor + naipe; //String
  this.valor = valor; //String
  this.naipe = naipe; //Int
  this.virada = true; //Bool, TRUE - Baixo
  this.elem = elem;
  this.selecionar = function(){}
}
