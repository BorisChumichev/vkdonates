import './settings-form.sass'

import React, { Component } from 'react';
import Paper from 'dumb/paper'
import { partial } from 'ramda'

class SettingsForm extends Component {

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.action(
      { wallet: this.refs.wallet.value
      , secret: this.refs.secret.value
      , token: user.token
      , user_id: user.user_id
      , group_id: group.group_id
      , update: !this.props.initialSetup
      }
    )
  }

  render() {
    const { action, onClose, initialSetup, groupId, wallet } = this.props

    return (
      <form onSubmit={evt => this.handleSubmit(evt)} className="settingsForm">
        <div className="settingsForm-title">Настройки кошелька</div>
        <div className="settingsForm-wrapper">
          <input ref="wallet" defaultValue={initialSetup ? '' : wallet } className="settingsForm-input" type="number" placeholder="Яндекс кошелёк" />
          <input ref="secret" className="settingsForm-input" type="password" placeholder={initialSetup ? 'Ключ уведомлений' : 'Сменить ключ'} />
        </div>
        <input className="settingsForm-submit" type="submit" value="Сохранить" />
        {!initialSetup && <div onClick={onClose} className="settingsForm-back">Вернуться назад</div> }
        <div className="settingsForm-tutorial">
          Чтобы получить <strong>ключ уведомлений</strong> подключите HTTP уведомления в сервисе Яндекс.Деньги. Для этого зайдите в <strong>Яндекс.Деньги → Настройки → Всё остальное</strong> и нажмите <strong>«подключить»</strong> напротив опции <strong>«Уведомления»</strong>. Следуйте инструкциям, в качестве адреса уведомлений укажите: <strong>https://vkdonates.ru/notify/{groupId}</strong>.
        </div>
      </form>
    )
  }
}

export default SettingsForm;
