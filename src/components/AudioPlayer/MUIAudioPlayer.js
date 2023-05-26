import { React, useEffect, useState, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import MUIVolumeController from './MUIcomponents/MUIVolumeController';

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

function MusicPlayerSlider() {
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

    const [rawFileInState, setRawFileInState] = useState(null);
    const [fileObjURLInState, setFileObjURLInState] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volumeDisplay, setVolumeDisplay] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(100);

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

    // useEffect(() => {
    //     audioPlayer.current.volume = volumeLevel / 100;
    // }, [volumeLevel]);

    useEffect(() => {
        audioPlayer.current.currentTime = position;
        changePlayerCurrentTime();
    }, [position]);

    // useEffect(() => {
    //     progressBar.current.style.setProperty("background-size", `${progressBar.current.value / duration * 100}%`) 
    // }, [currentTime, duration]);

    const playAudio = () => {
        if (fileObjURLInState != null) {
            setIsPlaying(true);
            const fileSeconds = Math.floor(audioPlayer.current.duration);
            setDuration(fileSeconds);
            // progressBar.current.max = seconds;
            audioPlayer.current.play();
            // animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            return null;
        };
    };

    const pauseAudio = () => {
        if (fileObjURLInState != null) {
            audioPlayer.current.pause();
            // cancelAnimationFrame(animationRef.current);
        } else {
            return null;
        };
    };

    // const handleVolumeDisplay = () => {
    //     setVolumeDisplay(!volumeDisplay);
    // };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    // const whilePlaying = () => {
    //     position = audioPlayer.current.currentTime;
    //     changePlayerCurrentTime();
    //     animationRef.current = requestAnimationFrame(whilePlaying);
    // };

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
        setCurrentTime(audioPlayer.current.currentTime);
    };

    const handleFileInputChange = (e) => {
        if (e.target.files[0] != null) {
            audioPlayer.current.pause();
            setRawFileInState(null);
            setFileObjURLInState(null);
            console.log("Raw File", e.target.files[0]);
            let file = e.target.files[0];
            let fileObjURL = window.URL.createObjectURL(file); // This function is where the audio file/data needs to hit so it can be passed to temporary browser memory
            setIsPlaying(false);
            setRawFileInState(file);
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

            {/* MUI Componentry */}
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Widget>
                    <Slider
                        ref={progressBar}
                        size="small"
                        value={position}
                        min={0}
                        step={1}
                        max={duration}
                        onChange={(_, value) => setPosition(value)}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            height: 4,
                            '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                theme.palette.mode === 'dark'
                                    ? 'rgb(255 255 255 / 16%)'
                                    : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                            },
                            '& .MuiSlider-rail': {
                            opacity: 0.28,
                            },
                        }}
                    />
                    <Typography component="span" color="lightgray" width="85px" >
                    {isPlaying === false
                        ? "00:00/00:00"
                        : `${calculateTime(currentTime)}/${(duration && !isNaN(duration)) && calculateTime(duration)}`
                    }
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: -1,
                        }}
                    >
                        <IconButton onClick={playAudio} >
                            <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        </IconButton>
                        <IconButton onClick={pauseAudio} >
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        </IconButton>
                    </Box>
                    <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                        <MUIVolumeController audioPlayer={audioPlayer} />
                    </Stack>
                </Widget>
            </Box>
        </>
    );
};

export default MusicPlayerSlider