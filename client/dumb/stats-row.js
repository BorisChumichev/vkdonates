import './stats-row.sass'

import React, { Component } from 'react'

export default class StatsRow extends Component {
  render() {
    const { value, caption } = this.props

    return (
      <div className="statsRow">
        {this.props.children}
      </div>
    )
  }
}
