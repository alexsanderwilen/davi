/*import React, { useState } from "react";
import Adicao from "./components/Adicao";
import Combinacao from "./components/Combinacao";
import Ditado from "./components/Ditado";
import Divisao from "./components/Divisao";
import Multiplicacao from "./components/Multiplicacao";

const App = () => {
  const [currentPage, setCurrentPage] = useState("adicao");

  function handleMenuClick(page: string) {
    setCurrentPage(page);
  }

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => handleMenuClick("adicao")}>Adição</li>
          <li onClick={() => handleMenuClick("combinacao")}>Combinação</li>
          <li onClick={() => handleMenuClick("ditado")}>Ditado</li>
          <li onClick={() => handleMenuClick("divisao")}>Divisão</li>
          <li onClick={() => handleMenuClick("multiplicacao")}>Multiplicação</li>
        </ul>
      </nav>
      {currentPage === "adicao" && <Adicao />}
      {currentPage === "combinacao" && <Combinacao />}
      {currentPage === "ditado" && <Ditado />}
      {currentPage === "divisao" && <Divisao />}
      {currentPage === "multiplicacao" && <Multiplicacao />}
    </div>
  );
};

export default App;
*/

import { useState } from "react";
import Adicao from "./components/Adicao";
import Combinacao from "./components/Combinacao";
import Ditado from "./components/Ditado";
import Divisao from "./components/Divisao";
import Multiplicacao from "./components/Multiplicacao";
import AlphabetGame from "./components/AlphabetGame";
import Forca from "./components/Forca";

enum Categoria {
  MATEMATICA = "Matemática",
  PORTUGUES = "Português",
  NOMEANIMAL = "Nome Imagem",
  HISTORIA = "História",
  GEOGRAFIA = "Geografia",
  JFORCA = "Forca",
}

function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>(Categoria.PORTUGUES);

  return (
    <div>
      <h1>App de exercícios</h1>
      <select value={categoriaSelecionada} onChange={(event) => setCategoriaSelecionada(event.target.value as Categoria)}>
        <option value={Categoria.MATEMATICA}>Matemática</option>
        <option value={Categoria.PORTUGUES}>Português</option>
        <option value={Categoria.NOMEANIMAL}>Nome Imagem</option>
        <option value={Categoria.JFORCA}>Jogo da Forca</option>
        <option value={Categoria.HISTORIA}>História</option>
        <option value={Categoria.GEOGRAFIA}>Geografia</option>
      </select>
      {categoriaSelecionada === Categoria.MATEMATICA && (
        <>
          <Adicao />
          <Multiplicacao />
          <Divisao />
        </>
      )}
      {categoriaSelecionada === Categoria.PORTUGUES && <Ditado />}
      {categoriaSelecionada === Categoria.NOMEANIMAL && <AlphabetGame />}      
      {categoriaSelecionada === Categoria.JFORCA && <Forca />}      
      {categoriaSelecionada === Categoria.HISTORIA && <h2>Exercícios de História</h2>}
      {categoriaSelecionada === Categoria.GEOGRAFIA && <h2>Exercícios de Geografia</h2>}
    </div>
  );
}

export default App;

