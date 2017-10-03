# Classes  
## Caixa
>* tipo:int  
>* recebe:bool  
>* perde:bool  
>* ordem:int (1 - Crescente; 2 - Decrescente; 3 - Aleatório)  
>* qntCartas:int (Caixa 1 - 24; Caixa 2 - 28; Caixa 3 - 0)  
>* pilha[]:Pilha[]  
>___
>* acao(Pilha p1, Pilha p2)  
>* distribuirCartas()

## Pilha
>* carta[]:Carta[]
>* id:int
>___
>* acao(e) (Recebe o evento de uma carta e retorna uma variável do tipo Carta)

## Carta
>* valor:String
>* index:String
>* virada:bool (true - Baixo)
>* naipe:int
>___
>* selecionar()


# Variaveis Globais  
* baralho[52]:Carta[]
* valores[13]:String[]
* clicado:Bool
* PAUS = 1
* COPAS = 2
* ESPADAS = 3
* OUROS = 4
* cartasSelecionadas[13]:Carta[]

# Funções Globais  
