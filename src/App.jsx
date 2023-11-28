import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialActivePlayer = "X";
const PLAYERS = { X: "Player 1", O: "Player 2" };
const INITIAL_GAME_BOARD = [
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

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { col, row } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbl = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbl = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbl = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSquareSymbl &&
      firstSquareSymbl === secondSquareSymbl &&
      firstSquareSymbl === thirdSquareSymbl
    ) {
      winner = players[firstSquareSymbl];
    }
  }
  return winner;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

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

  const handlePlayerNameChange = (newName, symbol) => {
    setPlayers((prevPlayer) => ({ ...prevPlayer, [symbol]: newName }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangePlayerName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangePlayerName={handlePlayerNameChange}
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
