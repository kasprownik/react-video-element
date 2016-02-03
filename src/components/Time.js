import React, { PropTypes } from 'react';
import moment from 'moment';

const formatTime = seconds => {

  const minutesFloor = Math.floor(seconds / 60);
  const secondsFloor = Math.floor(seconds);

  const displayMinutes = minutesFloor < 10 ? '0' + minutesFloor : minutesFloor;
  const displaySeconds = secondsFloor < 10 ? '0' + secondsFloor : secondsFloor;

  return `${displayMinutes}:${displaySeconds}`;
};

export default React.createClass({
  displayName: 'Time',

  contextTypes: {
    getProgress: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.func.isRequired,
    getCurrentTime: PropTypes.func.isRequired,
    getDuration: PropTypes.func.isRequired
  },

  getDefaultProps(){
    return {
      classNames: {}
    };
  },

  loop(){
    this.forceUpdate();
    if (this.context.isPlaying()) {
      this.intervalId = requestAnimationFrame(this.loop);
    }
  },

  componentWillMount(){
    this.context.onPlay(this.loop);
  },

  componentWillUnmount(){
    cancelAnimationFrame(this.intervalId);
  },

  render() {
    const duration = this.context.getDuration();
    const current = this.context.getCurrentTime();
    return (
      <span>{`${formatTime(current)} / ${formatTime(duration)}`}</span>
    );
  }
});