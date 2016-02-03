import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'FullScreen',

  contextTypes: {
    fullScreen: PropTypes.func
  },

  render() {
    return <button {...this.props} onClick={this.context.fullScreen}/>;
  }
});