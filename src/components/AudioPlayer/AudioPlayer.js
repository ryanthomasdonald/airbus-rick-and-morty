import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from '@mui/material';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import "./AudioPlayer.css"

function AudioPlayer() {

    const [rawFileInState, setRawFileInState] = useState(null);
    const [fileObjURLInState, setFileObjURLInState] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volumeDisplay, setVolumeDisplay] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(1);

    // component references
    const audioPlayer = useRef();   // audio component
    const progressBar = useRef();   // progress bar
    const volumeBar = useRef();     // volume bar
    const animationRef = useRef();  // progress bar animation

    useEffect(() => {
        console.log('Raw File In State', rawFileInState);
    }, [rawFileInState]);

    useEffect(() => {
        audioPlayer.current.src = fileObjURLInState;
    }, [fileObjURLInState]);

    useEffect(() => {
        progressBar.current.style.setProperty("background-size", `${progressBar.current.value / duration * 100}%`) 
    }, [currentTime, duration]);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    // const togglePlayPause = () => {
    //     if (fileObjURLInState != null) {
    //         const prevValue = isPlaying;
    //         setIsPlaying(!prevValue);
    //         if (!prevValue) {
    //             audioPlayer.current.play();
    //             animationRef.current = requestAnimationFrame(whilePlaying);
    //         } else {
    //             audioPlayer.current.pause();
    //             cancelAnimationFrame(animationRef.current);
    //         };
    //     } else {
    //         return null;
    //     };
    // };

    const playAudio = () => {
        if (fileObjURLInState != null) {
            setIsPlaying(true);
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            return null;
        };
    };

    const pauseAudio = () => {
        if (fileObjURLInState != null) {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        } else {
            return null;
        };
    };

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
        setCurrentTime(progressBar.current.value);
    };

    const changeVolume = () => {
        audioPlayer.current.volume = volumeBar.current.value;
        setVolumeLevel(volumeBar.current.value);
    };

    const handleVolumeDisplay = () => {
        setVolumeDisplay(!volumeDisplay);
    };

    const handleFileInputChange = (e) => {
        if (e.target.files[0] != null) {
            audioPlayer.current.pause();
            // console.log("Raw File", e.target.files[0]);
            let fileObjURL = window.URL.createObjectURL(e.target.files[0]); // This function is where the audio file/data needs to hit so it can be passed to temporary browser memory
            setIsPlaying(false);
            setRawFileInState(e.target.files[0]);
            setFileObjURLInState(fileObjURL);
        } else {
            return null;
        };
    };

    return (
        <>
            {/* We can delete this part when we're ready to integrate the player into the MWP (it's here for testing) */}
            <input type="file" accept="audio/*" onChange={handleFileInputChange} />
            < br/>

            {/* Initializes audio player and loads source */}
            {/* The "src" attribute is set programmatically during the file upload, hence it not being included */}
            <audio ref={audioPlayer} preload="metadata"></audio>

            {/* UI parsed out into individual tags */}
            <Grid container alignItems="center">
                <PlayArrowOutlinedIcon id="playButton" onClick={playAudio} />
                <Typography component="span" color="lightgray" width="85px" >
                    {isPlaying === false
                        ? "00:00/00:00"
                        : `${calculateTime(currentTime)}/${(duration && !isNaN(duration)) && calculateTime(duration)}`
                    }
                </Typography>
                <input type="range" defaultValue="0" ref={progressBar} onChange={changeRange} />
                <PauseOutlinedIcon id="pauseButton" onClick={pauseAudio} />
                <VolumeUpIcon id="volButton" onClick={handleVolumeDisplay} />
                {volumeDisplay === false
                    ? null
                    : <input type="range" style={{width: "50px"}} min="0" max="1" step=".01" value={volumeLevel} ref={volumeBar} onChange={changeVolume} />
                }
            </Grid>
        </>
    );
};

export default AudioPlayer;