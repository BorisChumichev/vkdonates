import './payment-form.sass'

import React, { Component } from 'react';
import Paper from 'dumb/paper'
import { partial } from 'ramda'

class PaymentForm extends Component {
  render() {
    const { action, onClose } = this.props

    return (
      <form className="paymentForm">
        <div className="paymentForm-wrapper">
          <input min="100" max="15000" ref="amount" className="paymentForm-input" type="number" placeholder="Сумма (руб.)" />
          <div className="paymentForm-checkbox">
            <input id="incognito" ref="incognito" className="paymentForm-input" type="checkbox" />
            <label htmlFor="incognito">— инкогнито</label>
          </div>
        </div>
        <input className="paymentForm-submit" type="submit" value="Отправить" />
      </form>
    )
  }
}

export default PaymentForm;
