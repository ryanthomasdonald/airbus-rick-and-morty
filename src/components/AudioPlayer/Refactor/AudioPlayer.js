import { React, useEffect, useState, useRef } from "react";
import PlayButton from "./components/PlayButton";
import PauseButton from "./components/PauseButton";
import ProgressBar from "./components/ProgressBar";
import TimeCounter from "./components/TimeCounter";
import VolumeButton from "./components/VolumeButton";
import "./AudioPlayer.css";

export default function AudioPlayer() {

    const [rawFileInState, setRawFileInState] = useState(null); // can be removed, just here to test how the raw data stores in state
    const [fileObjURLInState, setFileObjURLInState] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // component references
    const audioPlayerRef = useRef();   // audio component
    const progressBarRef = useRef();   // progress bar
    const volumeBarRef = useRef();     // volume bar
    const animationRef = useRef();     // progress bar animation

    // useEffect(() => {
    //     console.log('Raw File In State', rawFileInState);
    // }, [rawFileInState]);

    useEffect(() => {
        audioPlayerRef.current.src = fileObjURLInState;
    }, [fileObjURLInState]);

    useEffect(() => {
        progressBarRef.current.style.setProperty("background-size", `${progressBarRef.current.value / duration * 100}%`);
    }, [currentTime, duration]);

    const handleFileInputChange = (e) => {
        if (e.target.files[0] != null) {
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
            // console.log("Raw File", e.target.files[0]);
            let fileObjURL = window.URL.createObjectURL(e.target.files[0]); // This line is where the audio file/data needs to hit so it can be passed to temporary browser memory
            setIsPlaying(false);
            setRawFileInState(e.target.files[0]); // can be removed, just here to test how the raw data stores in state
            setFileObjURLInState(fileObjURL);
        } else {
            return null;
        };
    };

    return (
        <>
            {/* We can delete this part when we're ready to integrate the player into the MWP (it's here for testing) */}
            {/* <input type="file" accept="audio/*" onChange={handleFileInputChange} /> */}
            < br/>

            {/* Initializes audio player and loads source */}
            {/* The "src" attribute is set programmatically during the file upload, hence it not being included */}
            <audio ref={audioPlayerRef} preload="metadata"></audio>

            {/* UI parsed out into individual tags */}
            <div className="text-center">
                <PlayButton audioPlayerRef={audioPlayerRef} progressBarRef={progressBarRef} animationRef={animationRef} fileObjURLInState={fileObjURLInState} setIsPlaying={setIsPlaying} setDuration={setDuration} setCurrentTime={setCurrentTime} />
                <TimeCounter isPlaying={isPlaying} currentTime={currentTime} duration={duration} />
                <ProgressBar audioPlayerRef={audioPlayerRef} progressBarRef={progressBarRef} setCurrentTime={setCurrentTime} />
                <PauseButton audioPlayerRef={audioPlayerRef} animationRef={animationRef} fileObjURLInState={fileObjURLInState} />
                <VolumeButton audioPlayerRef={audioPlayerRef} volumeBarRef={volumeBarRef} />
            </div>
        </>
    );
};