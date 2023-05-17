import { useState, useEffect } from "react";
import "./Ditado.css"; // Importar o arquivo CSS

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PALAVRAS = [
  ["GATO", "GA TO"],
  ["CACHORRO", "CA CHO RRO"],
  ["BANANA", "BA NA NA"],
  ["COMPUTADOR", "COM PU TA DOR"],
  ["SOL", "SOL"]
  // ... outras palavras
];

export default function Ditado() {
  const [indicePalavra, setIndicePalavra] = useState(0);
  const [letras, setLetras] = useState<string[]>([]);
  const [palavraAtual, setPalavraAtual] = useState<string[]>([]);
  const [palavrasCriadas, setPalavrasCriadas] = useState(0);
  const [palavrasAcertadas, setPalavrasAcertadas] = useState(0);
  const [soletrar, setSoletrar] = useState(false);

  useEffect(() => {
    if (palavraAtual.length > 0) {
      // Reproduzir a palavra atual em áudio
      TextToSpeech(palavraAtual[0]);
    }
  }, [palavraAtual]);

  function handlePalavraChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLetras(event.target.value.split(""));
  }

  function handleLetraClick(letra: string) {
    setLetras([...letras, letra]);
  }

  function handleLimpar() {
    setLetras([]);
  }

  function handleNovaPalavra() {
    const indice = Math.floor(Math.random() * PALAVRAS.length);
    const novaPalavra = PALAVRAS[indice];
    setIndicePalavra(indice);
    setPalavraAtual(novaPalavra);
    setLetras([]);
    setPalavrasCriadas(palavrasCriadas + 1);
  }

  function handleVerificar() {
    const palavraFormada = letras.join("");
    if (palavraFormada === palavraAtual[0]) {
      TextToSpeech("Parabéns! Você acertou a palavra.");
      setPalavrasAcertadas(palavrasAcertadas + 1);
    } else {
      TextToSpeech("Você errou. Tente novamente.");
    }
    setLetras(palavraAtual[0].split(""));
  }

  function maskPalavra(palavra: string[]) {
    if (palavra[0]) {
      return "*".repeat(palavra[0].length);
    }
    return "";
  }
  

  return (
    <div className="ditado-container">
      <h2>Ditado do Davi Miguel</h2>
      <div>
        <p>Palavra:</p>
        <input
          type="text"
          value={letras.join("")}
          onChange={handlePalavraChange}
          placeholder={maskPalavra(palavraAtual)}
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
        {ALFABETO.map((letra: string) => (
          <button key={letra} onClick={() => handleLetraClick(letra)}>
            {letra}
          </button>
        ))}
      </div>
      <button onClick={handleVerificar}>Verificar Palavra</button>
      <button onClick={handleNovaPalavra}>Nova Palavra</button>
      <div>
        <p>Hint:</p>
        <button onClick={() => TextToSpeech(palavraAtual[0])}>
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
