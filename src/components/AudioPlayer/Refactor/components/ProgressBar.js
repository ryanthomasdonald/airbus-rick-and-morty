import React from "react";

export default function ProgressBar({ audioPlayerRef, progressBarRef, setCurrentTime }) {

    const changePlayerCurrentTime = () => {
        setCurrentTime(progressBarRef.current.value);
    };

    const changeRange = () => {
        audioPlayerRef.current.currentTime = progressBarRef.current.value;
        changePlayerCurrentTime();
    };

    return (
        <input type="range" defaultValue="0" ref={progressBarRef} onChange={changeRange} />
    );
};