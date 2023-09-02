
window.addEventListener('DOMContentLoaded', () => {
//script será carregado antes que o corpo do HTML e analisado pelo navegador
    const quadradinhos = Array.from(document.querySelectorAll('.quadradinho')); //pegando os quadradinhos, mas essa função retorna um nodelist, entao é convertido a um array
    const jogadorDisplay = document.querySelector('.display-jogador'); 
    const botaoReset = document.querySelector('#reset');
    const aviso = document.querySelector('.aviso');
//pegando todos os componentes que vamos precisar

let tela = ['', '', '', '', '', '', '', '', '']; //tela com array de de strings vazias que irao conter x e o
let jogadorAtual = 'X'; //jogador ativo que vai ter o sinal do jogador atual
let jogoAndando = true; //variável será verdadeira até que alguém ganhe ou o jogo termine empatado,  dai, definiremos como falso para que os blocos restantes fiquem inativos até uma reinicialização

//emos três constantes que representam os estados finais do jogo. Usamos esses constantes para evitar erros de digitação.
const jogadorXVenceu = 'jogadorXVenceu';
const jogadorOVenceu = 'jogadorOVenceu';
const empate = 'empate';

/*
   é pra ficar assim na tela
   [0] [1] [2]
   [3] [4] [5]
   [6] [7] [8]
*/
//armazenando todas as posições vencedoras com os índices das três posições que podem vencer o jogo
const paraVencer = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];

 //se o usuário deseja realizar uma ação válida ou não. Se o texto interno do quadro for x ou o retornamos false pq a ação é inválida, sanão, o quadro está vazio e a ação pode ser feita
 const validacao = (quadradinho) => {
    if (quadradinho.innerText === 'X' || quadradinho.innerText === 'O'){
        return false;
    }

    return true;
};


//receberemos um índice como parâmetro e definiremos o elemento correspondente na matriz do tabuleiro para ser o sinal do nosso jogador atual
const atualizarTela =  (index) => {
    tela[index] = jogadorAtual;
 }


 const trocarJogador = () => {
    jogadorDisplay.classList.remove(`jogador${jogadorAtual}`); //removendo a classe do jogador atual
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'; //alterar o valor do jogador atual, Se foi X, será de O 
    jogadorDisplay.innerText = jogadorAtual; //agora que alteramos o valor de nosso usuário, precisamos atualizar o innerText do display e aplicar a nova classe de jogador
    jogadorDisplay.classList.add(`jogador${jogadorAtual}`);
}
//função de para o resultado do jogo, recebe um tipo de jogo final e atualiza o innerText com base no resultado
// Na última linha temos que remover a classe ocultar, para ficar oculto até o final do jogo.
const anuncio = (type) => {
    switch(type){
       case jogadorOVenceu:
            aviso.innerHTML = 'Jogador <span class="joagdorO">Bolinha</span> Ganhou';
            break;
       case jogadorXVenceu:
            aviso.innerHTML = 'Jogador <span class="joagdorX">Xizinho</span> Ganhou';
            break;
       case empate:
            aviso.innerText = 'Jogo empatado';
        }
    aviso.classList.remove('hide');
};


function avaliarPartida() {
    let partida = false; //vamos criar uma variável e inicializá-la com false
    for (let i = 0; i <= 7; i++) { //percorreremos a matriz do paraVencer e verificaremos no quadro cada condição de vitória
      const condicaoVencer = paraVencer[i];
      const a = tela[condicaoVencer[0]];
      const b = tela[condicaoVencer[1]];
      const c = tela[condicaoVencer[2]];
      if (a === "" || b === "" || c === "") { //se algum dos campos estiver vazio chamaremos continuee pularemos para a próxima iteração, pq não pode ganhar se houver uma peça vazia na condição de vitória
        continue;
      }
      if (a === b && b === c) {
        partida = true;
        break;
      }
    }
  
    if (partida) {
      anuncio(jogadorAtual === "X" ? jogadorXVenceu : jogadorOVenceu);
      jogoAndando = false;
      return;
    }
  
    if (!tela.includes("")) anuncio(empate);
  }
  //verificaremos o valor da partida e, se for verdade, anunciaremos um vencedor e definiremos o jogo como inativo. 
// Se não tivermos um vencedor, verificaremos se temos peças vazias e se não tivermos um vencedor e não houver mais peças vazias, anunciamos o empate.

//receberá um quadrado e um índice como parâmetro, será chamada quando o usuário clicar em um quadrinho
  const acao = (quadradinho, index) => {
    if (validacao(quadradinho) && jogoAndando) { //verificar se é uma ação válida ou não e se o jogo está ativo ou não
      quadradinho.innerText = jogadorAtual;//se forem verdadeiros, atualizamos o innerText do quadro com o sinal do jogador atual, adicionamos a classe correspondente e atualizamos a matriz do tabuleiro
      quadradinho.classList.add(`joagdor${jogadorAtual}`);
      atualizarTela(index);
      avaliarPartida(); //ds de tudo atualizado, temos que verificar se o jogo terminou ou não, então ligamos avaliarpartida()
      trocarJogador(); //dar a vez para outro
    }
  };
//Para fazer o jogo funcionar, temos que adicionar ouvintes de eventos às peças
//Podemos fazer isso percorrendo a matriz de quadrinhos e adicionar um ouvinte de evento para cada um
  quadradinhos.forEach( (quadradinho, index) => {
    quadradinho.addEventListener('click', () => acao(quadradinho, index));
});


//nesta função configuramos o tabuleiro para consistir em nove strings vazias, definimos o jogo como ativo, removemos o aviso e mudamos o jogador de volta para X(por definição Xcomeça sempre).
const resetTela = () => {
    tela = ['', '', '', '', '', '', '', '', ''];
    jogoAndando = true;
    aviso.classList.add('hide');
//A última coisa que temos que fazer é percorrer as peças e definir o innerText de volta para uma string vazia e remover quaisquer classes específicas do jogador das peças.
    if (jogadorAtual === 'O') {
        trocarJogador();
    }

    quadradinhos.forEach(quadradinho => {
        quadradinho.innerText = '';
        quadradinho.classList.remove('joagdorX');
        quadradinho.classList.remove('joagdorO');
    });
}
botaoReset.addEventListener('click', resetTela);
  });



    window.onload = () => {
        "use strict";
        if("serviceWorker" in navigator){
            navigator.serviceWorker.register("./sw.js");
        }
    };