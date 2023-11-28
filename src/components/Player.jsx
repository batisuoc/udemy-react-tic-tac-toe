import { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangePlayerName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEditClick = () => {
    setIsEditing((oldIsEditing) => !oldIsEditing);
    if (isEditing) {
      onChangePlayerName(playerName, symbol);
    }
  };

  const handleNameChanging = (event) => {
    setPlayerName(event.target.value);
  };

  let playerNameField = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameField = (
      <input type="text" value={playerName} onChange={handleNameChanging} />
    );
  }

  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {playerNameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
