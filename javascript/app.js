
const btnVermelho = document.getElementById('btn-vermelho');
const btnVerde = document.getElementById('btn-verde');
const btnAzul = document.getElementById('btn-azul');
const btnAmarelo = document.getElementById('btn-amarelo');
const btnIniciarJogo = document.getElementById('btn-iniciar');

var ordemCores = [];
var indiceAtual = 0;
var indiceClicado = 0;
var mostra = 1;

var jogo = {
    iniciaJogo: function() {
        this.tempo = setInterval(mostraListaCores, 300);
        console.log('Iniciou');
    },
    paraJogo: function(){
        clearInterval(this.tempo);
        console.log('Parou');
    }
}

function iniciaPartida()
{
    sorteiaCor();
    jogo.iniciaJogo();
}

function mostraListaCores()
{
    if (indiceAtual < ordemCores.length)
    {   
        if (mostra == 1)
        {
            let corVez = ordemCores[indiceAtual];
            alteraOpacidadeBotao(corVez);
            indiceAtual = indiceAtual + 1;
        }
        else
        {
            alteraOpacidadeBotao(0);
        }
        
        mostra = (mostra + 1) % 2;
    }
    else
    {
        jogo.paraJogo();
        alteraOpacidadeBotao(0);
        desabilitaBotao(false);
        indiceAtual = 0;
        indiceClicado = 0;
    }
}

function sorteiaCor()
{
    desabilitaBotao(true);

    let novaCor = Math.floor(Math.random() * 4) + 1;
    ordemCores.push(novaCor);
}

function alteraOpacidadeBotao(botaoAceso)
{
    btnVermelho.style.opacity = botaoAceso == 1 ? 1 : 0.5;
    btnVerde.style.opacity = botaoAceso == 2 ? 1 : 0.5;
    btnAzul.style.opacity = botaoAceso == 3 ? 1 : 0.5;
    btnAmarelo.style.opacity = botaoAceso == 4 ? 1 : 0.5;
}

function desabilitaBotao(status)
{
    btnVermelho.disabled = status;
    btnVerde.disabled = status;
    btnAzul.disabled = status;
    btnAmarelo.disabled = status;
}

function clica(numBotao)
{
    if (indiceClicado < ordemCores.length)
    {
        if (ordemCores[indiceClicado] == numBotao)
        {
            //alteraOpacidadeBotao(numBotao);
            indiceClicado = indiceClicado + 1;

            if (indiceClicado == ordemCores.length)
            {
                indiceClicado = 0;
                sorteiaCor();
                jogo.iniciaJogo();
            }
        }
        else
        {
            let qtdCores = ordemCores.length;
            desabilitaBotao(true);
            ordemCores = [];
            indiceClicado = 0;
            jogo.paraJogo();
            alert('Você errou a ordem da sequencia!\nTamanho da Sequencia atingida: ' + qtdCores);
        }
    }
    else
    {
        sorteiaCor();
        jogo.iniciaJogo();
    }
}

//Eventos do Usuário
btnIniciarJogo.addEventListener('click', iniciaPartida);
btnVermelho.addEventListener('click', function(){ clica('1')});
btnVerde.addEventListener('click', function(){ clica('2')});
btnAzul.addEventListener('click', function(){ clica('3')});
btnAmarelo.addEventListener('click', function(){ clica('4')});