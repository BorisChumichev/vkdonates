import './paper.sass'

import React, { Component } from 'react';

class Paper extends Component {
  render() {
    return (
      <div className="paper">
        {this.props.children}
      </div>
    )
  }
}

export default Paper;
