import React from "react";

export default function PauseButton({ audioPlayerRef, animationRef, fileObjURLInState }) {

    const pauseAudio = () => {
        if (fileObjURLInState != null) {
            audioPlayerRef.current.pause();
            cancelAnimationFrame(animationRef.current);
        } else {
            return null;
        };
    };

    return (
        <button sx={{ color: "#FFFFFF", opacity: "60%", fontSize: "36px" }} onClick={pauseAudio} />
    );
};