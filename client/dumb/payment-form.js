import './payment-form.sass'

import React, { Component } from 'react';
import Paper from 'dumb/paper'
import { partial } from 'ramda'

class PaymentForm extends Component {
  handleSubmit(evt) {
    evt.preventDefault()
    this.refs.amount.blur()
    this.props.action(
      { amount: this.refs.amount.value
      , incognito: this.refs.incognito.checked
      }
    )
  }

  componentDidMount() {
    this.refs.amount.focus()
  }

  render() {
    const { action, onClose } = this.props

    return (
      <form onSubmit={evt => this.handleSubmit(evt)} className="paymentForm">
        <div className="paymentForm-wrapper">
          <input min="100" max="15000" ref="amount" className="paymentForm-input" type="number" pattern="\d*" placeholder="Сумма (руб.)" />
          <div className="paymentForm-checkbox">
            <input id="incognito" ref="incognito" className="paymentForm-input" type="checkbox" />
            <label htmlFor="incognito">— инкогнито</label>
          </div>
        </div>
        <input className="paymentForm-submit" type="submit" value="Отправить" />
        <div onClick={() => {
          this.refs.amount.blur()
          onClose()
        }} className="paymentForm-back">Вернуться назад</div>
      </form>
    )
  }
}

export default PaymentForm;
