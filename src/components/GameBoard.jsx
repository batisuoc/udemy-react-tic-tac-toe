import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const GameBoard = ({ activePlayerSymbol, onHandleActivePlayer }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const handleSquareSelect = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      let updatedGameBoard = [
        ...prevGameBoard.map((innerArr) => [...innerArr])
      ];
      updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedGameBoard;
    });
    onHandleActivePlayer();
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSquareSelect(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
