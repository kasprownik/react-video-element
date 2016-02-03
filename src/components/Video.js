import React, {PropTypes} from 'react';
import Source from './Source';

export default React.createClass({
  displayName: 'Video',

  propTypes: {
    sources: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
      type: PropTypes.string
    }))
  },

  childContextTypes: {
    play: PropTypes.func,
    pause: PropTypes.func,
    setVolume: PropTypes.func,
    getProgress: PropTypes.func,
    onPlay: PropTypes.func,
    isPlaying: PropTypes.func,
    onPause: PropTypes.func,
    moveProgress: PropTypes.func,
    fullScreen: PropTypes.func,
    getCurrentTime: PropTypes.func,
    getDuration: PropTypes.func
  },

  getDefaultProps() {
    return {
      sources: []
    };
  },

  getChildContext() {
    return {
      play: this.play,
      pause: this.pause,
      setVolume: this.setVolume,
      getProgress: this.getProgress,
      isPlaying: this.isPlaying,
      onPlay: this.registerOnPlayCallback,
      onPause: this.registerOnPauseCallback,
      moveProgress: this.moveProgress,
      fullScreen: this.fullScreen,
      getCurrentTime: this.getCurrentTime,
      getDuration: this.getDuration
    };
  },

  playCallbacks: [],

  pauseCallbacks: [],

  registerOnPlayCallback(ref) {
    this.playCallbacks = [...this.playCallbacks, ref];
    if (this.isPlaying()) {
      ref();
    }
  },

  registerOnPauseCallback(ref) {
    this.pauseCallbacks = [...this.pauseCallbacks, ref];
    if (!this.isPlaying()) {
      ref();
    }
  },

  fireOnPlayCallbacks(){
    this.playCallbacks.forEach(callback => callback());
  },

  fireOnPauseCallbacks(){
    this.pauseCallbacks.forEach(callback => callback());
  },

  play() {
    this.refs.video.play();
  },

  isPlaying() {
    return this.refs.video && !this.refs.video.paused && !this.refs.video.ended;
  },

  pause() {
    this.refs.video.pause();
  },

  setVolume(val) {
    this.refs.video.volume = val;
  },

  getProgress() {
    return this.refs.video ? this.refs.video.currentTime / this.refs.video.duration : 0;
  },

  toggle() {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  },

  fullScreen(){
    if (this.refs.video.requestFullscreen) {
      this.refs.video.requestFullscreen();
    } else if (this.refs.video.msRequestFullscreen) {
      this.refs.video.msRequestFullscreen();
    } else if (this.refs.video.mozRequestFullScreen) {
      this.refs.video.mozRequestFullScreen();
    } else if (this.refs.video.webkitRequestFullscreen) {
      this.refs.video.webkitRequestFullscreen();
    }
  },

  moveProgress(progress){
    this.refs.video.currentTime = progress * this.refs.video.duration;
    this.play();
  },

  getCurrentTime() {
    console.log(this.refs.video ? this.refs.video.currentTime : 0)
    return this.refs.video ? this.refs.video.currentTime : 0;
  },

  getDuration() {
    return this.refs.video ? this.refs.video.duration : 0;
  },

  render() {
    return (
      <div className={this.props.className}>
        <video
          onPlay={this.fireOnPlayCallbacks}
          onPause={this.fireOnPlayCallbacks}
          onClick={this.toggle}
          type={this.props.type}
          src={this.props.src} ref="video">
          {this.props.sources.map(source => <Source src={source.src} type={source.type}/>)}
        </video>
        {this.props.children}
      </div>
    );
  }
});