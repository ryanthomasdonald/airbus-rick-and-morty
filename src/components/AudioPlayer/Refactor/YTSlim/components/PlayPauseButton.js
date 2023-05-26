import React, { useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import {
  PauseCircleFilled,
  PlayCircleFilled,
  Pause,
  PlayArrow
} from "@mui/icons-material/";

const PlayPauseButton = ({ player, audioState }) => {
  const togglePlayPause = e => {
    if (audioState === "playing") {
      player.pause();
    } else if (audioState === "paused") {
      player.play();
    }
    e.stopPropagation();
  };

  return (
      <>
      <p>Hello world</p>
      
    <IconButton
      size="small"
      aria-label="Pause"
      onClick={togglePlayPause}
      disableFocusRipple={true}
      disableRipple={true}
    >
      <PlayCircleFilled style={{ fontSize: "4em" }} color="primary" />
    </IconButton>
    </>
  );
};

export default PlayPauseButton;
