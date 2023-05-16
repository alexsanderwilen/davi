import React from "react";
import { Fase } from "../types";

const Combinacao: React.FC = () => {
  const fases: Fase[] = [
    {
      nome: "Fase 1",
      componente: () => <div>Fase 1 de Combinação</div>,
    },
    {
      nome: "Fase 2",
      componente: () => <div>Fase 2 de Combinação</div>,
    },
  ];

  return (
    <div>
      <h1>Combinação</h1>
      <ul>
        {fases.map((fase) => (
          <li key={fase.nome}>
            <fase.componente />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Combinacao;
