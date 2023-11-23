import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

const initialActivePlayer = "X";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState(initialActivePlayer);

  const handleActivePlayer = (rowIndex, colIndex) => {
    setActivePlayer((prevActivePlayer) =>
      prevActivePlayer === "X" ? "O" : "X"
    );
    setGameTurns((prevGameTurns) => {
      let currPlayer = initialActivePlayer;
      if (prevGameTurns.length && prevGameTurns[0].player === "X") {
        currPlayer = "O";
      }
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
          activePlayerSymbol={activePlayer}
          onHandleActivePlayer={handleActivePlayer}
          turns={gameTurns}
        />
      </div>
    </main>
  );
}

export default App;
