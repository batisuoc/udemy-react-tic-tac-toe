import { useState } from "react";

const Player = ({ name, symbol, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEditClick = () => {
    setIsEditing((oldIsEditing) => !oldIsEditing);
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
