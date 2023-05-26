import { React, useEffect, useState, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

function MUIVolumeController({ audioPlayer }) {
    const theme = useTheme();
    // const duration = 200; // seconds
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    const [volumeDisplay, setVolumeDisplay] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(100);

    // const audioPlayer = useRef();   // audio component

    useEffect(() => {
        audioPlayer.current.volume = volumeLevel / 100;
    }, [volumeLevel]);

    // const handleVolumeDisplay = () => {
    //     setVolumeDisplay(!volumeDisplay);
    // };

    return (
        <>
            <VolumeDownRounded htmlColor={lightIconColor} />
            <Slider
                // ref={volumeBar}
                value={volumeLevel}
                onChange={(_, value) => setVolumeLevel(value)}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                    '& .MuiSlider-track': {
                        border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                        width: 24,
                        height: 24,
                        backgroundColor: '#fff',
                        '&:before': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: 'none',
                        },
                    },
                }}
            />
            <VolumeUpRounded htmlColor={lightIconColor} />
        </>
    );
};

export default MUIVolumeController