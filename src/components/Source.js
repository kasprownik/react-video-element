import React, {PropTypes} from 'react';

export default React.createClass({
  displayName: 'Source',

  propTypes: {
    children: PropTypes.node
  },

  render() {
    return <source {...this.props}/>;
  }
});