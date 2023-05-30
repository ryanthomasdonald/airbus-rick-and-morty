import React from "react";

export default function TimeCounter({ isPlaying, currentTime, duration }) {

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    return (
        <span className="timeCounter" >
            {isPlaying === false
                ? "0:00/0:00"
                : `${calculateTime(currentTime)}/${(duration && !isNaN(duration)) && calculateTime(duration)}`
            }
        </span>
    );
};