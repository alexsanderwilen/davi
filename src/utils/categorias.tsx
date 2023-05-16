import React from "react";
import Ditado from "../components/Ditado";
import Combinacao from "../components/Combinacao";
import Divisao from "../components/Divisao";
import Multiplicacao from "../components/Multiplicacao";
import Adicao from "../components/Adicao";


const CATEGORIAS = {
  PORTUGUES: "Português",
  MATEMATICA: "Matemática",
};

type Fase = {
  nome: string;
  componente: React.ComponentType<any>;
};

type Fases = {
  [key: string]: Fase[];
};

const FASES: Fases = {
  [CATEGORIAS.PORTUGUES]: [
    { nome: "Ditado", componente: Ditado },
    { nome: "Combinação", componente: Combinacao },
  ],
  [CATEGORIAS.MATEMATICA]: [
    { nome: "Divisão", componente: Divisao },
    { nome: "Multiplicação", componente: Multiplicacao },
    { nome: "Adição", componente: Adicao },
  ],
};

export function getFases(categoria: string) {
  return FASES[categoria] || [];
}

export function getCategorias() {
  return Object.values(CATEGORIAS);
}
