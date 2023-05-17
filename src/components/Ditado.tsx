import { useState, useEffect } from "react";
import "./Ditado.css"; // Importar o arquivo CSS

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PALAVRAS = [
  "GATO",
  "CACHORRO",
  "BANANA",
  "COMPUTADOR",
  "SOL",
  "PRAIA",
  "FUTEBOL",
  "LIVRO",
  "CHOCOLATE",
  "ABACAXI",
  "ELEFANTE",
  "JANELA",
  "TELEFONE",
  "AMARELO",
  "BRINCADEIRA",
  "ESCOLA",
  "SAPATO",
  "CAMA",
  "LUA",
  "ESTRELA",
  "LEITE",
  "CARRO",
  "VIAGEM",
  "BOLA",
  "PISCINA",
  "FRUTA",
  "FELICIDADE",
  "CASA",
  "RISADA",
  "CARRINHO",
  "MENINA",
  "MENINO",
  "PARQUE",
  "CHAVE",
  "FESTA",
  "PRESENTE",
  "DINOSSAURO",
  "DINHEIRO",
  "BRINQUEDO",
  "GUITARRA",
  "BORBOLETA",
  "AMIGO",
  "AMIGA",
  "LIVRARIA",
  "CINEMA",
  "SORVETE",
  "PIPOCA",
  "HAMBURGUER",
  "PIZZA",
  "PASSARINHO",
  "FLOR",
  "PINTURA",
  "CAMISA",
  "SAPATO",
  "FUTEBOL",
  "BASQUETE",
  "CACHECOL",
  "GORRO",
  "NEVE",
  "PASSEIO",
  "CORRIDA",
  "FRIO",
  "CALOR",
  "INVERNO",
  "OUTONO",
  "PRIMAVERA",
  "AMOR",
  "CARINHO",
  "GENTILEZA",
  "PAZ",
  "HARMONIA",
  "CHOCOLATE",
  "BISCOITO",
  "QUEIJO",
  "SOPA",
  "BOLO",
  "SORRISO",
  "AMIZADE",
  "ESPERANÇA",
  "RISO",
  "SATISFAÇÃO",
  "ALEGRIA",
  "SUCESSO"  
];

export default function Ditado() {
  const [palavra, setPalavra] = useState("");
  const [letras, setLetras] = useState<string[]>([]);
  const [palavraAtual, setPalavraAtual] = useState("");
  const [palavraAtualSemMascara, setPalavraAtualSemMascara] =
    useState(palavraAtual);
  const [palavrasCriadas, setPalavrasCriadas] = useState(0);
  const [palavrasAcertadas, setPalavrasAcertadas] = useState(0);
  const [soletrar, setSoletrar] = useState(false);

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
        <button onClick={() => TextToSpeech(palavraAtual)}>
          Repetir o Ditado
        </button>
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
