import { Pergunta } from "./Pergunta.js";

export class Quiz {
    constructor(elementos) {
        this.elementos = elementos;
        this.perguntas = [];
        this.indiceAtual = 0;
        this.pontuacao = 0;
        this.jaRespondeu = false;

        this.elementos.btnProxima.addEventListener("click", () => this.avancar());
        this.elementos.btnReiniciar.addEventListener("click", () => this.iniciar());
    }

    async carregar(caminhoJson) {
        const resposta = await fetch(caminhoJson);
        const dados = await resposta.json();

        this.elementos.temaTitulo.textContent = dados.tema;

        this.perguntas = dados.perguntas.map(p => {
            return new Pergunta(
                p.pergunta,
                p.alternativas,
                p.respostaCorreta
            );
        });

        this.iniciar();
    }

    iniciar() {
        this.indiceAtual = 0;
        this.pontuacao = 0;

        this.elementos.placar.textContent = "Pontuação: 0";

        this.elementos.telaQuiz.classList.remove("d-none");
        this.elementos.telaFinal.classList.add("d-none");

        this.renderizarPergunta();
    }

    renderizarPergunta() {
        this.jaRespondeu = false;
        this.elementos.btnProxima.disabled = true;

        const pergunta = this.perguntas[this.indiceAtual];

        this.elementos.perguntaTexto.textContent = pergunta.texto;
        this.elementos.contador.textContent = (this.indiceAtual + 1) + "/" + this.perguntas.length;

        const porcentagem = ((this.indiceAtual + 1) / this.perguntas.length) * 100;
        this.elementos.barraProgresso.style.width = porcentagem + "%";

        this.elementos.alternativas.innerHTML = "";

        pergunta.alternativas.forEach((alternativa, indice) => {
            const botao = document.createElement("button");

            botao.className = "list-group-item list-group-item-action";
            botao.textContent = alternativa;

            botao.addEventListener("click", () => {
                this.responder(indice, botao);
            });

            this.elementos.alternativas.appendChild(botao);
        });
    }

    responder(indiceEscolhido, botaoClicado) {
        if (this.jaRespondeu) return;

        this.jaRespondeu = true;

        const pergunta = this.perguntas[this.indiceAtual];

        if (pergunta.estaCorreta(indiceEscolhido)) {
            botaoClicado.classList.add("list-group-item-success");
            this.pontuacao++;
        } else {
            botaoClicado.classList.add("list-group-item-danger");
        }

        this.elementos.placar.textContent = "Pontuação: " + this.pontuacao;
        this.elementos.btnProxima.disabled = false;
    }

    avancar() {
        this.indiceAtual++;

        if (this.indiceAtual < this.perguntas.length) {
            this.renderizarPergunta();
        } else {
            this.finalizar();
        }
    }

    finalizar() {
        this.elementos.telaQuiz.classList.add("d-none");
        this.elementos.telaFinal.classList.remove("d-none");

        this.elementos.resultadoFinal.textContent =
            this.pontuacao + " de " + this.perguntas.length;
    }
}