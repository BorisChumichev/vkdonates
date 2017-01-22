import './paper.sass'

import React, { Component } from 'react'

export default class Paper extends Component {
  render() {
    return (
      <div className="paper">
        {this.props.children}
      </div>
    )
  }
}
