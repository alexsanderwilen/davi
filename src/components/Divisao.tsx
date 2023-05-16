import { useState } from "react";

export default function Divisao() {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 100) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 9) + 1);
  
  while (num2  < 1 ){
    setNum2(Math.floor(Math.random() * 9) + 1);    
  }

  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [mostrarPergunta, setMostrarPergunta] = useState(false);
  const [divisaoExata, setDivisaoExata] = useState(false);

  function handleRespostaChange(event: React.ChangeEvent<HTMLInputElement>) {
    setResposta(event.target.value);
  }

  function handleVerificar() {
    if (Number(resposta) === resultado) {
      setMensagem("Parabéns, você acertou!");
    } else {
      setMensagem("Você errou! Tente novamente.");
    }
  }

  function handleNovaPergunta() {
    setNum1(0);
    setNum2(0);    
    while (num2  < 1 ){
      setNum2(Math.floor(Math.random() * 9) + 1);    
    }    
    setResultado(0);
    setResposta("");
    setMensagem("");
    setMostrarPergunta(false);
    handleGerarPergunta();
  }

  function handleGerarPergunta() {
    let resultadoDivisao = 0;
    let divisaoExataAtual = false;
  
    while (!divisaoExataAtual) {
      const num1Atual = Math.floor(Math.random() * 16) * num2;
      resultadoDivisao = num1Atual / num2;
      if (Number.isInteger(resultadoDivisao) && num1Atual % num2 === 0) {
        setResultado(resultadoDivisao);
        setMostrarPergunta(true);
        setNum1(num1Atual);
        setDivisaoExata(true);
        break;
      } else {
        setResultado(0);
        setResposta("");
        setMensagem("");
        setNum1(num1Atual);
        divisaoExataAtual = false;
      }
    }
  }
  

  if (!mostrarPergunta) {
    return (
      <div>
        <button onClick={handleGerarPergunta}>Gerar pergunta</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Divisão</h2>
      <div>
        <p>
          Qual é o resultado da divisão de {num1} por {num2}?
        </p>
        <input type="number" value={resposta} onChange={handleRespostaChange} />
        <button onClick={handleVerificar}>Verificar</button>
      </div>
      <div>
        <p>Resultado:</p>
        <span>{resultado.toFixed(2)}</span>
      </div>
      <div>
        <p>{mensagem}</p>
      </div>
      <button onClick={handleNovaPergunta}>Nova pergunta</button>
    </div>
  );
}

