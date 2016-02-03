import React, { PropTypes } from 'react';

export default React.createClass({
  displayName: 'ProgressBar',

  contextTypes: {
    getProgress: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.func.isRequired,
    moveProgress: PropTypes.func.isRequired
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

  move(ev) {
    this.context.moveProgress((
        ev.clientX - this.refs.container.getClientRects()[0].left
      ) / this.refs.container.clientWidth);
  },

  render() {
    return (
      <div onClick={this.move} style={{width:'100%'}} ref="container">
        <div
          onClick={this.move}
          className={this.props.className}
          style={{width: (this.context.getProgress() * 100) + '%'}}/>
      </div>
    );
  }
});