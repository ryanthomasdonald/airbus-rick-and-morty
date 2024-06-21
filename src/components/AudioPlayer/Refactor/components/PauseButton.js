import React from "react";
import PauseIcon from "@mui/icons-material/Pause";

export default function PauseButton({
  audioPlayerRef,
  animationRef,
  fileObjURLInState,
}) {
  const pauseAudio = () => {
    if (fileObjURLInState != null) {
      audioPlayerRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      return null;
    }
  };

  return (
    <PauseIcon
      sx={{ color: "#005555", opacity: "100%", fontSize: "36px" }}
      className="pauseButton"
      onClick={pauseAudio}
    />
  );
}
