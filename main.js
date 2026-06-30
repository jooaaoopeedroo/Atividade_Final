import { Quiz } from "./Quiz.js";

const elementos = {
    telaQuiz: document.querySelector("#tela-quiz"),
    telaFinal: document.querySelector("#tela-final"),
    temaTitulo: document.querySelector("#tema-titulo"),
    contador: document.querySelector("#contador"),
    barraProgresso: document.querySelector("#barra-progresso"),
    perguntaTexto: document.querySelector("#pergunta-texto"),
    alternativas: document.querySelector("#alternativas"),
    placar: document.querySelector("#placar"),
    btnProxima: document.querySelector("#btn-proxima"),
    btnReiniciar: document.querySelector("#btn-reiniciar"),
    resultadoFinal: document.querySelector("#resultado-final")
};

const quiz = new Quiz(elementos);

quiz.carregar("./perguntas-respostas.json");