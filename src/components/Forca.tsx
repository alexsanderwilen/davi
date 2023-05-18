/*import React, { useState, useEffect } from "react";
import "./Forca.css";

const Forca: React.FC = () => {
  const [words] = useState<string[]>([
    "cadeira",
    "elefante",
    "computador",
    "refrigerante",
    "nathalia",
    "davi",
    "alexsander",
    "peron",
    "marta",
    "junior",
    "walisson",
    "helena",
    "copo",
    "monitor",
    "papel",
    "apartametno",
    "cruzeiro",
    "palmeiras",
    "flamento",
    "televisao",
    "armario",
    "cavalo",
    "gato",
    "hinoceronte",
  ]);
  const [word, setWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [totalWordsPlayed, setTotalWordsPlayed] = useState<number>(0);
  const [totalCorrectGuesses, setTotalCorrectGuesses] = useState<number>(0);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  useEffect(() => {
    selectRandomWord();
  }, []);

  const selectRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex]);
    setGuesses([]);
    setMistakes(0);
    setIsWinner(false);
  };

  const handleGuess = (letter: string) => {
    if (!guesses.includes(letter)) {
      const newGuesses = [...guesses, letter];
      setGuesses(newGuesses);

      if (!word.includes(letter)) {
        setMistakes(mistakes + 1);
      }

      const guessedWord = word
        .split("")
        .map((char) => (newGuesses.includes(char) ? char : "_"))
        .join("");

      if (guessedWord === word) {
        setIsWinner(true);
        setTotalCorrectGuesses(totalCorrectGuesses + 1);
        speakMessage("Parabéns, você venceu!");
      }
    }
  };

  const getHiddenWord = (): string => {
    return word
      .split("")
      .map((char) => (guesses.includes(char) ? char : "_"))
      .join(" ");
  };

  const isGameOver = (): boolean => {
    return mistakes >= 6;
  };

  const renderHangman = (): JSX.Element => {
    let hangman = "";

    if (mistakes >= 1) {
      hangman += "   O"; // cabeça
    }
    if (mistakes >= 2) {
      hangman += "\n  /"; // braço esquerdo
    }
    if (mistakes >= 3) {
      hangman += "|"; // tronco
    }
    if (mistakes >= 4) {
      hangman += "\\"; // braço direito
    }
    if (mistakes >= 5) {
      hangman += "\n  /"; // perna esquerda
    }
    if (mistakes >= 6) {
      hangman += " \\"; // perna direita
    }

    return <pre className="forca-hangman">{hangman}</pre>;
  };

  const handleRestart = () => {
    selectRandomWord();
    setTotalWordsPlayed(totalWordsPlayed + 1);
    speakMessage("Jogo reiniciado");
  };

  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "pt-BR";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (isGameOver()) {
      speakMessage("Fim do jogo. A palavra era " + word);
    }
  }, [isGameOver, word]);

  useEffect(() => {
    if (isWinner) {
      speakMessage("A palavra era " + word);
    }
  }, [isWinner, word]);

  return (
    <div className="forca-container">
      <h1 className="forca-title">Jogo da Forca - Davi Miguel</h1>
      <div className="forca-hangman">{renderHangman()}</div>
      <div className="forca-word">{getHiddenWord()}</div>
      {!isGameOver() && (
        <div>
          <p className="forca-message">Adivinhe uma letra:</p>
          <input
            className="forca-input"
            type="text"
            maxLength={1}
            onChange={(e) => handleGuess(e.target.value)}
          />
        </div>
      )}
      {isWinner && (
        <div>
          <p className="forca-message forca-winner">Você Venceu!</p>
          <p>Letras adivinhadas: {guesses.join(", ")}</p>
          <p>Palavra selecionada: {word}</p>
        </div>
      )}
      {isGameOver() && (
        <div>
          <p className="forca-message forca-game-over">Fim do jogo</p>
          <p>Palavra selecionada: {word}</p>
        </div>
      )}
      <button onClick={handleRestart} className="forca-button">
        Reiniciar
      </button>
      <div className="ditado-container">
        <div className="scores">
          <p>
            <span className="score-label">
              Total de palavras jogadas: {totalWordsPlayed}
            </span>
          </p>
          <p>
            <span className="score-label">
              Total de acertos: {totalCorrectGuesses}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forca;
*/

import React, { useState, useEffect } from "react";
import "./Forca.css";

const Forca: React.FC = () => {
  const [words] = useState<string[]>([
    "CADEIRA",
    "ELEFANTE",
    "COMPUTADOR",
    "REFRIGERANTE",
    "NATHALIA",
    "DAVI",
    "ALEXSANDER",
    "PERON",
    "MARTA",
    "JUNIOR",
    "WALISSON",
    "HELENA",
    "COPO",
    "MONITOR",
    "PAPEL",
    "APARTAMENTO",
    "CRUZEIRO",
    "PALMEIRAS",
    "FLAMENGO",
    "TELEVISAO",
    "ARMARIO",
    "CAVALO",
    "GATO",
    "RINOCERONTE",
  ]);
  const [word, setWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [totalWordsPlayed, setTotalWordsPlayed] = useState<number>(0);
  const [totalCorrectGuesses, setTotalCorrectGuesses] = useState<number>(0);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  useEffect(() => {
    selectRandomWord();
  }, []);

  const selectRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex]);
    setGuesses([]);
    setMistakes(0);
    setIsWinner(false);
  };

  const handleGuess = (letter: string) => {
    letter = letter.toUpperCase();
    if (!guesses.includes(letter)) {
      const newGuesses = [...guesses, letter];
      setGuesses(newGuesses);

      if (!word.includes(letter)) {
        setMistakes(mistakes + 1);
      }

      const guessedWord = word
        .split("")
        .map((char) => (newGuesses.includes(char) ? char : "_"))
        .join("");

      if (guessedWord === word) {
        setIsWinner(true);
        setTotalCorrectGuesses(totalCorrectGuesses + 1);
        speakMessage("Parabéns, você venceu!");
      }
    }
  };

  const getHiddenWord = (): string => {
    return word
      .split("")
      .map((char) => (guesses.includes(char) ? char : "_"))
      .join(" ");
  };

  const isGameOver = (): boolean => {
    return mistakes >= 6;
  };

  const renderHangman = (): JSX.Element => {
    let hangman = "";

    if (mistakes >= 1) {
      hangman += "   O"; // cabeça
    }
    if (mistakes >= 2) {
      hangman += "\n  /"; // braço esquerdo
    }
    if (mistakes >= 3) {
      hangman += "|"; // tronco
    }
    if (mistakes >= 4) {
      hangman += "\\"; // braço direito
    }
    if (mistakes >= 5) {
      hangman += "\n  /"; // perna esquerda
    }
    if (mistakes >= 6) {
      hangman += " \\"; // perna direita
    }

    return <pre className="forca-hangman">{hangman}</pre>;
  };

  const handleRestart = () => {
    selectRandomWord();
    setTotalWordsPlayed(totalWordsPlayed + 1);
    speakMessage("Jogo reiniciado");
  };

  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "pt-BR";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (isGameOver()) {
      speakMessage("Fim do jogo. A palavra era " + word);
    }
  }, [isGameOver, word]);

  useEffect(() => {
    if (isWinner) {
      speakMessage("A palavra era " + word);
    }
  }, [isWinner, word]);

  return (
    <div className="forca-container">
      <h1 className="forca-title">Jogo da Forca - Davi Miguel</h1>
      <div className="forca-hangman">{renderHangman()}</div>
      <div className="forca-word">{getHiddenWord()}</div>
      {!isGameOver() && (
        <div>
          <p className="forca-message">Adivinhe uma letra:</p>
          <input
            className="forca-input"
            type="text"
            maxLength={1}
            onChange={(e) => handleGuess(e.target.value)}
            autoCapitalize="characters"
          />
        </div>
      )}
      {isWinner && (
        <div>
          <p className="forca-message forca-winner">Você Venceu!</p>
          <p>Letras adivinhadas: {guesses.join(", ")}</p>
          <p>Palavra selecionada: {word}</p>
        </div>
      )}
      {isGameOver() && (
        <div>
          <p className="forca-message forca-game-over">Fim do jogo</p>
          <p>Palavra selecionada: {word}</p>
        </div>
      )}
      <button onClick={handleRestart} className="forca-button">
        Reiniciar
      </button>
      <div className="ditado-container">
        <div className="scores">
          <p>
            <span className="score-label">
              Total de palavras jogadas: {totalWordsPlayed}
            </span>
          </p>
          <p>
            <span className="score-label">
              Total de acertos: {totalCorrectGuesses}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forca;
