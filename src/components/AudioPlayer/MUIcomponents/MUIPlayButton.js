import { React, useEffect, useState, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

function MUIPlayButton({ audioPlayer, fileObjURLInState }) {
    const theme = useTheme();
    // const duration = 200; // seconds
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(false);
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    const playAudio = () => {
        if (fileObjURLInState != null) {
            setIsPlaying(true);
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            // progressBar.current.max = seconds;
            audioPlayer.current.play();
        } else {
            return null;
        };
    };

    return (
        <>
            <IconButton onClick={playAudio} >
                <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            </IconButton>
        </>
    );
};

export default MUIPlayButton