import './tabs-control.sass'

import React, { Component } from 'react';
import Paper from 'dumb/paper'
import { partial } from 'ramda'

class TabsControl extends Component {
  render() {
    const { tabs, current, action } = this.props

    return (
      <div className="tabsControl">
        <Paper>
          {tabs.map(
            tab => (tab === current)
              ? <div key={tab} className="tabsControl-tab tabsControl-tab_current">{tab}</div>
              : <div key={tab} className="tabsControl-tab" onClick={partial(action, [tab])}>{tab}</div>
          )}
        </Paper>
      </div>
    )
  }
}

export default TabsControl;
