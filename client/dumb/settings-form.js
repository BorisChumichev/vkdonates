import './settings-form.sass'

import React, { Component } from 'react';
import Paper from 'dumb/paper'
import { partial } from 'ramda'

class SettingsForm extends Component {
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.action(
      { wallet: this.refs.wallet.value
      , secret: this.refs.secret.checked
      }
    )
  }

  componentDidMount() {
    //this.refs.wallet.focus()
  }

  render() {
    const { action, onClose, initialSetup, groupId } = this.props

    return (
      <form onSubmit={evt => this.handleSubmit(evt)} className="settingsForm">
        <div className="settingsForm-title">Настройка платежей</div>
        <div className="settingsForm-wrapper">
          <input ref="wallet" className="settingsForm-input" type="number" placeholder="Яндекс кошелёк" />
          <input ref="secret" className="settingsForm-input" type="text" placeholder="Ключ уведомлений" />
        </div>
        <input className="settingsForm-submit" type="submit" value="Сохранить" />
        {!initialSetup && <div onClick={onClose} className="settingsForm-back">Вернуться назад</div> }
        { initialSetup &&
          <div className="settingsForm-tutorial">
            Чтобы получить <strong>ключ уведомлений</strong> подключите HTTP уведомления в сервисе Яндекс.Деньги. Для этого зайдите в <strong>Яндекс.Деньги&nbsp;→&nbsp;Настройки&nbsp;→&nbsp;Всё&nbsp;остальное</strong> и нажмите <strong>«подключить»</strong> напротив опции <strong>«Уведомления»</strong>. Следуйте инструкциям, в качестве адреса уведомлений укажите: <strong>https://vkdonates.ru/notify/{groupId}</strong>.
          </div>
        }
      </form>
    )
  }
}

export default SettingsForm;
