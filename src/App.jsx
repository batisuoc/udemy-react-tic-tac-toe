import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

const initialActivePlayer = "X";

const deriveActivePlayer = (turns) => {
  let currPlayer = initialActivePlayer;
  if (turns.length && turns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const handleActivePlayer = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currPlayer = deriveActivePlayer(prevGameTurns);
      return [
        { square: { col: colIndex, row: rowIndex }, player: currPlayer },
        ...prevGameTurns
      ];
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
          />
          <Player
            name={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onHandleActivePlayer={handleActivePlayer}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
