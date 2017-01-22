import './paper-button.sass'

import React, { Component } from 'react'
import Paper from 'dumb/paper'

export default class PaperButton extends Component {
  render() {
    return (
      <div onClick={this.props.action} className="paperButton">
        <Paper>
          {this.props.children}
        </Paper>
      </div>
    )
  }
}
