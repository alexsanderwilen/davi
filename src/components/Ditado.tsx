import { useState, useEffect } from "react";
import "./Ditado.css"; // Importar o arquivo CSS

const ALFABETO = "abcdefghijklmnopqrstuvwxyz".split("");
const PALAVRAS = [
  "gato",
  "cachorro",
  "banana",
  "computador",
  "sol",
  "praia",
  "futebol",
  "livro",
  "arco-íris",
  "chocolate",
  "abacaxi",
  "elefante",
  "janela",
  "telefone",
  "amarelo",
  "brincadeira",
  "escola",
  "sapato",
  "cama",
  "lua",
  "estrela",
  "leite",
  "carro",
  "viagem",
  "bola",
  "piscina",
  "fruta",
  "felicidade",
  "casa",
  "árvore",
  "balão",
  "risada",
  "carrinho",
  "menina",
  "menino",
  "praça",
  "parque",
  "chave",
  "festa",
  "presente",
  "dinossauro",
  "dinheiro",
  "avião",
  "brinquedo",
  "música",
  "dança",
  "guitarra",
  "borboleta",
  "amigo",
  "amiga",
  "livraria",
  "cinema",
  "sorvete",
  "pipoca",
  "hamburguer",
  "pizza",
  "passarinho",
  "flor",
  "pintura",
  "pássaro",
  "camisa",
  "calça",
  "sapato",
  "futebol",
  "basquete",
  "volêi",
  "cachecol",
  "gorro",
  "neve",
  "passeio",
  "corrida",
  "coração",
  "frio",
  "calor",
  "verão",
  "inverno",
  "outono",
  "primavera",
  "família",
  "amor",
  "carinho",
  "gentileza",
  "paz",
  "harmonia",
  "chocolate",
  "biscoito",
  "pão",
  "queijo",
  "sopa",
  "bolo",
  "sorriso",
  "amizade",
  "esperança",
  "riso",
  "satisfação",
  "saúde",
  "alegria",
  "sucesso",
  "vitória"
];
export default function Ditado() {
  const [palavra, setPalavra] = useState("");
  const [letras, setLetras] = useState<string[]>([]);
  const [palavraAtual, setPalavraAtual] = useState("");
  const [palavraAtualSemMascara, setPalavraAtualSemMascara] = useState(palavraAtual);
  const [palavrasCriadas, setPalavrasCriadas] = useState(0);
  const [palavrasAcertadas, setPalavrasAcertadas] = useState(0);

  useEffect(() => {
    if (palavraAtual) {
      // Reproduzir a palavra atual em áudio
      TextToSpeech(palavraAtual);
    }
  }, [palavraAtual]);

  function handlePalavraChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPalavra(event.target.value);
  }

  function handleLetraClick(letra: string) {
    setLetras([...letras, letra]);
  }

  function handleLimpar() {
    setPalavra("");
    setLetras([]);
  }

  function handleNovaPalavra() {
    const indice = Math.floor(Math.random() * PALAVRAS.length);
    const novaPalavra = PALAVRAS[indice];
    setPalavraAtual(novaPalavra);
    setPalavraAtualSemMascara(novaPalavra);
    setPalavra(maskPalavra(novaPalavra));
    setLetras([]);
    setPalavrasCriadas(palavrasCriadas + 1);
  }

  function handleVerificar() {
    const palavraFormada = letras.join("");
    if (palavraFormada === palavraAtual) {
      TextToSpeech("Parabéns! Você acertou a palavra.");
      setPalavrasAcertadas(palavrasAcertadas + 1);
    } else {
      TextToSpeech("Você errou. Tente novamente.");
    }
    setPalavra(palavraAtual);
  }

  function maskPalavra(palavra: string) {
    return "*".repeat(palavra.length);
  }

  return (
    <div className="ditado-container"> 
      <h2>Ditado do Davi Miguel</h2>
      <div>
        <p>Palavra:</p>
        <input
          type="text"
          value={palavra}
          onChange={handlePalavraChange}
          placeholder={maskPalavra(palavraAtual)}
          readOnly={!palavra}
        />
      </div>
      <div>
        <p>Letras selecionadas:</p>
        <div>
          {letras.map((letra) => (
            <span key={letra}>{letra}</span>
          ))}
        </div>
      </div>
      <button onClick={handleLimpar}>Limpar</button>
      <div>
        <p>Alfabeto:</p>
        {ALFABETO.map((letra) => (
          <button key={letra} onClick={() => handleLetraClick(letra)}>
            {letra}
</button>
))}
</div>
<button onClick={handleVerificar}>Verificar Palavra</button>
<button onClick={handleNovaPalavra}>Nova Palavra</button>
<div>
<p>Hint:</p>
<button onClick={() => TextToSpeech(palavraAtual)}>Repetir o Ditado</button>
</div>
<div className="scores">
        <p>
          <span className="score-label">Palavras Criadas:</span>{" "}
          <span className="score-value">{palavrasCriadas}</span>
        </p>
        <p>
          <span className="score-label">Palavras Acertadas:</span>{" "}
          <span className="score-value">{palavrasAcertadas}</span>
        </p>
      </div>
</div>
);
}

function TextToSpeech(palavra: string) {
if ("speechSynthesis" in window) {
const utterance = new SpeechSynthesisUtterance(palavra);
speechSynthesis.speak(utterance);
} else {
console.log("A síntese de voz não é suportada neste navegador.");
}
}
