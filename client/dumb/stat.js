import './stat.sass'

import React, { Component } from 'react';

class Stat extends Component {
  render() {
    const { value, caption, isCurrency } = this.props
    const addK = value =>
      value.toString() > 999
        ? (value / 1000).toString() + 'K'
        : value.toString()
    return (
      <div className="stat">
        <div className="stat-value">
          {addK(value) + (isCurrency ? ' руб.' : '')}
        </div>
        <div className="stat-caption">
          {caption}
        </div>
      </div>
    )
  }
}

export default Stat;
