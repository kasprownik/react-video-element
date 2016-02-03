import React from 'react';
import ReactDOM from 'react-dom';
import {Video, ProgressBar, Volume, Play, Pause, FullScreen, Time} from './src/index';

ReactDOM.render((
  <Video
    className="container"
    src="https://bugwolf-videos.s3.amazonaws.com/2f4ce692-f9c3-46df-9396-0d5b879d8ad2-recording_1454046322042.mp4"
    type="video/webm">
    <div className="bar">
      <ProgressBar className="video-progress"/>
    </div>
    <div className="buttons">
      <Play>play!</Play>
      <Pause>pause!</Pause>
      <FullScreen>fullscreen!</FullScreen>
      <Volume/>
      <Time/>
    </div>
  </Video>
), document.getElementById('container'));