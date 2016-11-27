import './income.sass'

import React, { Component } from 'react';
import Paper from 'dumb/paper'
import moment from 'moment'
moment.locale('ru')

class Income extends Component {
  render() {
    const { name, value, avatarURL, date, place, userId } = this.props

    return (
      <Paper>
        <a target="_blank" href={`https://vk.com/id${userId}`} className="income">
          <div style={{
            backgroundImage: avatarURL
              ? `url('${avatarURL}')`
              : `url('https://media2.giphy.com/media/3xz2BQNrkb0FnzkELe/200w.gif')`
          }} className="income-avatar"></div>
          <div className="income-name">{name}</div>
          <div className="income-amount">Пожертвовал <span>{value} руб.</span></div>
          { place && <div className="income-corner">№{place}</div> }
          { date && <div className="income-corner">{moment(date).fromNow()}</div> }
        </a>
      </Paper>
    )
  }
}

export default Income;
