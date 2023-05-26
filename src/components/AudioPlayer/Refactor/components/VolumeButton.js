import { React, useState } from "react";

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
            <button sx={{ color: "#FFFFFF", opacity: "60%", fontSize: "32px" }} onClick={handleVolumeDisplay} />
            {volumeDisplay === false
                ? null
                : <input type="range" style={{width: "50px"}} min="0" max="1" step=".01" value={volumeLevel} ref={volumeBarRef} onChange={changeVolume} />
            }
        </>
    );
};