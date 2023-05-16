import { useState } from "react";

export default function Adicao() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(0);
  const [mensagem, setMensagem] = useState("");

  function handleNum1Change(event: React.ChangeEvent<HTMLInputElement>) {
    setNum1(parseInt(event.target.value) || 0);
  }

  function handleNum2Change(event: React.ChangeEvent<HTMLInputElement>) {
    setNum2(parseInt(event.target.value) || 0);
  }

  function handleRespostaChange(event: React.ChangeEvent<HTMLInputElement>) {
    setResposta(event.target.value);
  }

  function handleVerificar() {
    if (parseInt(resposta) === resultado) {
      setMensagem("Parabéns, você acertou!");
    } else {
      setMensagem("Você errou! Tente novamente.");
    }
  }

  function handleNovaPergunta() {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setResultado(0);
    setResposta("");
    setMensagem("");
  }

  function handleCalcular() {
    setResultado(num1 + num2);
  }

  return (
    <div>
      <h2>Adição</h2>
      <div>
        <p>Qual é o resultado da adição de {num1} com {num2}?</p>
        <input type="number" value={resposta} onChange={handleRespostaChange} />
        <button onClick={handleVerificar}>Verificar</button>
      </div>
      <div>
        <p>Resultado:</p>
        <span>{resultado}</span>
      </div>
      <div>
        <p>{mensagem}</p>
      </div>
      <button onClick={handleCalcular}>Calcular</button>
      <button onClick={handleNovaPergunta}>Nova pergunta</button>
    </div>
  );
}
