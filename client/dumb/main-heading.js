import './main-heading.sass'

import React, { Component } from 'react'

export default class MainHeading extends Component {
  render() {
    return (
      <div className="mainHeading">
        <div className="mainHeading-title">Поддержка проекта</div>
        <div className="mainHeading-subtitle">{this.props.title}</div>
        <div
          className="mainHeading-avatar"
          style={{backgroundImage: `url('${this.props.avatarURL}')`}}>
        </div>
      </div>
    )
  }
}
