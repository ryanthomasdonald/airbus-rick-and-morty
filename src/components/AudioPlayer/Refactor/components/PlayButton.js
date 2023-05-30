import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function PlayButton({ audioPlayerRef, progressBarRef, animationRef, fileObjURLInState, setIsPlaying, setDuration, setCurrentTime }) {

    const changePlayerCurrentTime = () => {
        setCurrentTime(progressBarRef.current.value);
    };

    const whilePlaying = () => {
        progressBarRef.current.value = audioPlayerRef.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const playAudio = () => {
        if (fileObjURLInState != null) {
            setIsPlaying(true);
            const seconds = Math.floor(audioPlayerRef.current.duration);
            setDuration(seconds);
            progressBarRef.current.max = seconds;
            audioPlayerRef.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            return null;
        };
    };

    return (
        <PlayArrowIcon sx={{ color: "#005555", opacity: "100%", fontSize: "36px" }} className="playButton" onClick={playAudio} />
    );
};