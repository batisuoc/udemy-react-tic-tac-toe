import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialActivePlayer = "X";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

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

  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { col, row } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbl = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbl = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbl = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSquareSymbl &&
      firstSquareSymbl === secondSquareSymbl &&
      firstSquareSymbl === thirdSquareSymbl
    ) {
      winner = firstSquareSymbl;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleActivePlayer = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currPlayer = deriveActivePlayer(prevGameTurns);
      return [
        { square: { col: colIndex, row: rowIndex }, player: currPlayer },
        ...prevGameTurns
      ];
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
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
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onHandleActivePlayer={handleActivePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
