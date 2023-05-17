/*import React, { useState, useEffect, useRef } from "react";
import "./AlphabetGame.css";

const images = [
  ["/images/cachorro.jpg", "CACHORRO"],
  ["/images/cavalo.jpg", "CAVALO"],
  ["/images/elefante.jpg", "ELEFANTE"],
  ["/images/canguru.jpg", "CANGURU"],
  ["/images/cobra.jpg", "COBRA"],
  ["/images/coelho.jpg", "COELHO"],
  ["/images/coruja.jpg", "CORUJA"],
  ["/images/gato.jpg", "GATO"],
  ["/images/macaco.jpg", "MACACO"],
  ["/images/raposa.jpg", "RAPOSA"],
  ["/images/rato.jpg", "RATO"],
  ["/images/tartaruga.jpg", "TARTARUGA"],
  ["/images/tigre.jpg", "TIGRE"],
  ["/images/tubarao.jpg", "TUBARAO"],
  ["/images/tucano.jpg", "TUCANO"],
  ["/images/urso.jpg", "URSO"],
  ["/images/vaca.jpg", "VACA"],
  ["/images/zebra.jpg", "ZEBRA"],
  // adicione aqui os nomes das suas imagens
];

const AlphabetGame = () => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [speechText, setSpeechText] = useState("");
  const [usedImages, setUsedImages] = useState<string[][]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    selectRandomImage();
  }, []);

  const selectRandomImage = () => {
    const availableImages = images.filter(
      (image) => !usedImages.find((usedImage) => usedImage[1] === image[1])
    );
  
    if (availableImages.length === 0) {
      // Todas as imagens foram usadas
      setSpeechText("Todas as imagens já foram mostradas.");
      speakText("Todas as imagens já foram mostradas.");
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const randomImage = availableImages[randomIndex];
    setSelectedImage(randomImage);
    setLetters([]);
    setUsedImages([...usedImages, randomImage]);
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
    return imageName.split("").map((letter, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        value={letters[index] || ""}
        onChange={(e) => handleLetterChange(e, index)}
        ref={(ref) => {
          inputRefs.current[index] = ref;
        }}
        onKeyDown={(e) => handleKeyDown(e, index)}
      />
    ));
  };

  const handleLetterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLetters = [...letters];
    updatedLetters[index] = e.target.value.toUpperCase();
    setLetters(updatedLetters);

    if (index < inputRefs.current.length - 1) {
      const nextInputRef = inputRefs.current[index + 1];
      if (nextInputRef) {
        nextInputRef.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === inputRefs.current.length - 1) {
        checkAnswer();
      } else if (index < inputRefs.current.length - 1) {
        const nextInputRef = inputRefs.current[index + 1];
        if (nextInputRef) {
          nextInputRef.focus();
        }
      }
    }
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
      {selectedImage.length > 0 && (
        <div>
          <img src={selectedImage[0]} alt="Imagem" />
          <p>Preencha as letras:</p>
          {renderBlanks()}
          <button className="button-verify" onClick={checkAnswer}>
            Verificar
          </button>
        </div>
      )}
    </div>
  );
};

export default AlphabetGame;*/

import React, { useState, useEffect, useRef } from "react";
import "./AlphabetGame.css";

const images = [  ["/images/cachorro.jpg", "CACHORRO"],
  ["/images/cavalo.jpg", "CAVALO"],
  ["/images/elefante.jpg", "ELEFANTE"],
  ["/images/canguru.jpg", "CANGURU"],
  ["/images/cobra.jpg", "COBRA"],
  ["/images/coelho.jpg", "COELHO"],
  ["/images/coruja.jpg", "CORUJA"],
  ["/images/gato.jpg", "GATO"],
  ["/images/macaco.jpg", "MACACO"],
  ["/images/raposa.jpg", "RAPOSA"],
  ["/images/rato.jpg", "RATO"],
  ["/images/tartaruga.jpg", "TARTARUGA"],
  ["/images/tigre.jpg", "TIGRE"],
  ["/images/tubarao.jpg", "TUBARAO"],
  ["/images/tucano.jpg", "TUCANO"],
  ["/images/urso.jpg", "URSO"],
  ["/images/vaca.jpg", "VACA"],
  ["/images/zebra.jpg", "ZEBRA"],
  // adicione aqui os nomes das suas imagens
];

const AlphabetGame = () => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [speechText, setSpeechText] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    selectRandomImage();
  }, []);

  const selectRandomImage = () => {
    if (images.length === 0) {
      setSpeechText("Você terminou todas as imagens!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
    setLetters([]);
  };

  const checkAnswer = () => {
    const imageName = selectedImage[1];
    const userAnswer = letters.join("").toUpperCase();
  
    if (userAnswer === imageName) {      
      setScore((prevScore) => ({
        correct: prevScore.correct + 1,
        total: prevScore.total + 1
      }));
      speakText("Parabéns! Você acertou! Escreveu corretamente.");
    } else {      
      setScore((prevScore) => ({
        ...prevScore,
        total: prevScore.total + 1
      }));
      speakText("Você errou. Tente novamente.");
    }
  
    inputRefs.current[0]?.focus();
    images.splice(images.indexOf(selectedImage), 1);
    selectRandomImage();
  };

  const renderBlanks = () => {
    const imageName = selectedImage[1];
    return imageName.split("").map((letter, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        value={letters[index] || ""}
        onChange={(e) => handleLetterChange(e, index)}
        ref={(ref) => {
          inputRefs.current[index] = ref;
        }}
        onKeyDown={(e) => handleKeyDown(e, index)}
      />
    ));
  };

  const handleLetterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLetters = [...letters];
    updatedLetters[index] = e.target.value.toUpperCase();
    setLetters(updatedLetters);

    if (index < inputRefs.current.length - 1) {
      const nextInputRef = inputRefs.current[index + 1];
      if (nextInputRef) {
        nextInputRef.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index === inputRefs.current.length - 1) {
        checkAnswer();
      } else if (index < inputRefs.current.length - 1) {
        const nextInputRef = inputRefs.current[index + 1];
        if (nextInputRef) {
          nextInputRef.focus();
        }
      }
    }
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
      {selectedImage.length > 0 && (
        <div>
          <img src={selectedImage[0]} alt="Imagem" />
          <p>Preencha as letras:</p>
          {renderBlanks()}
          <button className="button-verify" onClick={checkAnswer}>
            Verificar
          </button>
          <div className="scores">
            <p><span className="score-label">Total de imagens: {score.total}</span></p>
            <p><span className="score-label">Respostas corretas: {score.correct}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetGame;
