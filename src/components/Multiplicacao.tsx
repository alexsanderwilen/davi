/*import { useState } from "react";

export default function Multiplicacao() {
  const [fator1, setFator1] = useState(Math.floor(Math.random() * 10));
  const [fator2, setFator2] = useState(Math.floor(Math.random() * 10));
  const [resposta, setResposta] = useState("");

  function handleRespostaChange(event: React.ChangeEvent<HTMLInputElement>) {
    setResposta(event.target.value);
  }

  function handleNovaPergunta() {
    setFator1(Math.floor(Math.random() * 10));
    setFator2(Math.floor(Math.random() * 10));
    setResposta("");
  }

  return (
    <div>
      <h2>Multiplicação</h2>
      <div>
        <p>
          Qual é o resultado da multiplicação de {fator1} por {fator2}?
        </p>
        <input type="text" value={resposta} onChange={handleRespostaChange} />
      </div>
      <button onClick={handleNovaPergunta}>Nova pergunta</button>
    </div>
  );
}
*/

import { useState } from "react";

export default function Multiplicacao() {
  const [fator1, setFator1] = useState(Math.floor(Math.random() * 10));
  const [fator2, setFator2] = useState(Math.floor(Math.random() * 10));
  const [resposta, setResposta] = useState("");
  const [dica, setDica] = useState("");

  function handleRespostaChange(event: React.ChangeEvent<HTMLInputElement>) {
    setResposta(event.target.value);
  }

  function handleNovaPergunta() {
    setFator1(Math.floor(Math.random() * 10));
    setFator2(Math.floor(Math.random() * 10));
    setResposta("");
    setDica("");
  }

  function handleVerificarResposta() {
    const respostaCorreta = fator1 * fator2;
    if (parseInt(resposta) === respostaCorreta) {
      setDica("Parabéns, você acertou!");
    } else {
      setDica("Você errou! Tente novamente.");
    }
  }

  return (
    <div>
      <h2>Multiplicação</h2>
      <div>
        <p>
          Qual é o resultado da multiplicação de {fator1} por {fator2}?
        </p>
        <input type="text" value={resposta} onChange={handleRespostaChange} />
        <button onClick={handleVerificarResposta}>Verificar</button>
      </div>
      <p>{dica}</p>
      <button onClick={handleNovaPergunta}>Nova pergunta</button>
    </div>
  );
}
