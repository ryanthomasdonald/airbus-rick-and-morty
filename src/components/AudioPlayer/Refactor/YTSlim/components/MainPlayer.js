import React, { useEffect, useContext, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import PlayPauseButton from './PlayPauseButton';
// import TimelineController from './TimelineController';
// import VolumeController from './VolumeController';

const MainPlayer = () => {

  const [audioState, setAudioState] = useState(null);
  // there will be 4 states
  // loading, loaded, playing, paused

  const [playerState, setPlayerState] = useState(null);
  // there will be 3 states
  // maximized, minimized, playlist

  const [minimized, setMinimized] = useState(true);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [rating, setRating] = useState('none');
  const [isNextFromMini, setIsNextFromMini] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const body = document.querySelector('body');

  const audioPlayer = useRef();
  const player = audioPlayer.current;

      // var audioContext = new AudioContext();

      // var track = audioContext.createMediaElementSource(audioPlayer.current);
      // track.connect(audioContext.destination);

      // console.log(currentVideoSnippet);

  return (
      <>
        <Grid
            container
            direction="column"
            className="main-player-inner"
            style={{
              height: ' calc(100vh - 46px)',
              justifyContent: 'space-evenly',
            }}
          >
            {/* <TimelineController audioState={audioState} player={player} /> */}

            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              style={{ maxWidth: '290px', height: '80px', margin: '0 auto' }}
            >
              <PlayPauseButton player={player} audioState={audioState} />
            </Grid>
          </Grid>
          </>
  );
};

export default MainPlayer;
