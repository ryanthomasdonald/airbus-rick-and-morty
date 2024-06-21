import { React, useState } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export default function PauseButton({ audioPlayerRef, volumeBarRef }) {
  const [volumeDisplay, setVolumeDisplay] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(1);

  const changeVolume = () => {
    audioPlayerRef.current.volume = volumeBarRef.current.value;
    setVolumeLevel(volumeBarRef.current.value);
  };

  const handleVolumeDisplay = () => {
    setVolumeDisplay(!volumeDisplay);
  };

  return (
    <>
      {volumeDisplay === false ? (
        <VolumeUpIcon
          sx={{ color: "#005555", opacity: "100%", fontSize: "32px" }}
          className="volButton"
          onClick={handleVolumeDisplay}
        />
      ) : (
        <input
          type="range"
          style={{ width: "50px" }}
          min="0"
          max="1"
          step=".01"
          value={volumeLevel}
          ref={volumeBarRef}
          onChange={changeVolume}
          onTouchEnd={handleVolumeDisplay}
          onMouseUp={handleVolumeDisplay}
        />
      )}
    </>
  );
}
