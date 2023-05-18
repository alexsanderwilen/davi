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
  const [inputValue, setInputValue] = useState<string>("");

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

  const handleGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
    const letter = event.target.value.toUpperCase();
    if (letter.length !== 1 || guesses.includes(letter)) {
      return;
    }

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
    }

    setInputValue("");
  };

  const getHiddenWord = (): React.ReactNode => {
    return word.split("").map((char, index) => (
      <span
        key={index}
        className={guesses.includes(char) ? "correct-letter" : "wrong-letter"}
      >
        {guesses.includes(char) ? char : "_"}
      </span>
    ));
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

    return <pre>{hangman}</pre>;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toUpperCase());
    handleGuess(event);
  };

  const speakMessage = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  };

  const resetGame = () => {
    setTotalWordsPlayed(totalWordsPlayed + 1);
    selectRandomWord();
    speakMessage("Jogar Novamente");
  };

  useEffect(() => {
    if (isGameOver()) {
      speakMessage(`Você perdeu! A palavra era: ${word}`);
    } else if (isWinner) {
      speakMessage(`Parabéns, você venceu! A palavra era: ${word}`);
    }
  }, [isWinner, mistakes, word]);

  return (
    <div className="forca-container">
      <h1>Jogo da Forca</h1>
      <div className="hangman-container">
        <div className="hangman">{renderHangman()}</div>
        {isGameOver() && (
          <div className="game-over-message">
            Você perdeu! A palavra era: <strong>{word}</strong>
          </div>
        )}
      </div>
      {!isGameOver() && !isWinner && (
        <div className="word-container">
          <span className="hidden-word">{getHiddenWord()}</span>
        </div>
      )}
      {isWinner && (
        <div className="winner-message">
          Parabéns, você venceu! A palavra era: <strong>{word}</strong>
        </div>
      )}
      <div className="statistics">
        <p>Total de palavras jogadas: {totalWordsPlayed}</p>
        <p>Total de acertos: {totalCorrectGuesses}</p>
      </div>
      <form className="guess-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={1}
        />
      </form>
      <button className="reset-button" onClick={resetGame}>
        Jogar Novamente
      </button>
      <div className="guesses-container">
        <p>
          Letras Informadas:{" "}
          {guesses.map((guess, index) => (
            <span
              key={index}
              className={word.includes(guess) ? "correct-letter" : "wrong-letter"}
            >
              {guess}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Forca;
