import './message.sass'

import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        {this.props.children}
      </div>
    )
  }
}

export default Message;
