import React from "react";
import { getFases } from "../utils/categorias";
import Adicao from "./Adicao";
import Combinacao from "./Combinacao";
import Divisao from "./Divisao";
import Ditado from "./Ditado";
import Multiplicacao from "./Multiplicacao";

function Categoria({ categoria }: { categoria: string }) {
  const fases = getFases(categoria);

  const componentes: Record<string, React.FC> = {
    Adicao,
    Combinacao,
    Divisao,
    Ditado,
    Multiplicacao,
  };

  return (
    <div>
      <h1>{categoria}</h1>
      <ul>
        {fases.map((fase) => {
          const Component = componentes[fase.componente.name];
          return (
            <li key={fase.nome}>
              {Component && <Component />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categoria;
