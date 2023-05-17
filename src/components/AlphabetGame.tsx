import React, { useState, useEffect } from "react";
import "./AlphabetGame.css";

const images = [
  ["/images/cachorro.jpg", "CACHORRO"],
  ["/images/cavalo.jpg", "CAVALO"],
  ["/images/elefante.jpg", "ELEFANTE"],
  // adicione aqui os nomes das suas imagens
];

const AlphabetGame = () => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [speechText, setSpeechText] = useState("");

  useEffect(() => {
    selectRandomImage();
  }, []);

  const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  };

  const checkAnswer = () => {
    const imageName = selectedImage[1];
    const userAnswer = letters.join("").toUpperCase();

    if (userAnswer === imageName) {
      setSpeechText("Parabéns! Você acertou! Escreveu corretamente.");
    } else {
      setSpeechText("Você errou. Tente novamente.");
    }
  };

  const renderBlanks = () => {
    const imageName = selectedImage[1];
    const blanks = imageName.split("").map((letter, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        value={letters[index] || ""}
        onChange={(e) => handleLetterChange(e, index)}
      />
    ));

    return blanks;
  };

  const handleLetterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLetters = [...letters];
    updatedLetters[index] = e.target.value.toUpperCase();
    setLetters(updatedLetters);
  };

  useEffect(() => {
    if (speechText) {
      speakText(speechText);
    }
  }, [speechText]);

  const speakText = (text: string) => {
    const speechSynthesis = window.speechSynthesis;
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="container">
      <h2>Davi Miguel Game</h2>
      <button onClick={selectRandomImage}>Nova Imagem</button>
      {selectedImage.length > 0 && <img src={selectedImage[0]} alt="Imagem" />}
      {selectedImage.length > 0 && (
        <div>
          <p>Preencha as letras:</p>
          {renderBlanks()}
          <button className="button-verify" onClick={checkAnswer}>Verificar</button>
        </div>
      )}
    </div>
  );
};

export default AlphabetGame;