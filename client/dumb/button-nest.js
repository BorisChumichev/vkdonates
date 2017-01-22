import './button-nest.sass'

import React, { Component } from 'react'

export default class ButtonNest extends Component {
  render() {
    const coupled = this.props.children.length === 2

    return (
      <div className={`buttonNest${coupled ? ' buttonNest_coupled' : ''}`}>
        {this.props.children}
      </div>
    )
  }
}
