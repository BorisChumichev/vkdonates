import './button.sass'

import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    return (
      <div
        onClick={this.props.action}
        className={`button${this.props.isEmpty ? ' button_empty' : ''}`}>
        {this.props.children}
      </div>
    )
  }
}
