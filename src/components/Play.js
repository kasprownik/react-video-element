import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'Play',

  contextTypes: {
    play: PropTypes.func,
    isPlaying: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func
  },

  componentDidMount() {
    this.context.onPlay(() => this.forceUpdate());
    this.context.onPause(() => this.forceUpdate());
  },

  render() {
    return !this.context.isPlaying() ? <button {...this.props} onClick={this.context.play}/> : null;
  }
});