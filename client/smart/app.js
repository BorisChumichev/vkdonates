import React, { Component } from 'react'
import { connect } from 'react-redux'

import { paymentURL } from '../util'
import { configureApp, setRoute } from 'actions/app'
import Message from 'dumb/message'
import PaymentForm from 'dumb/payment-form'
import PaperButton from 'dumb/paper-button'
import SettingsForm from 'dumb/settings-form'
import Paper from 'dumb/paper'
import Main from 'dumb/main'


const mapStateToProps = (state, ownProps) => {
  return {
    wallet: state.wallet,
    route: state.route
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    configure: data => dispatch(configureApp(data)),
    setRoute: route => dispatch(setRoute(route))
  }
}

class App extends Component {
  navigateTo(route) {
    this.props.setRoute(route)
  }

  handlePayment(options) {
    const url = paymentURL(
      '/quickpay/cps-preparation.xml',
      { 'receiver': this.props.wallet
      , 'sum': options.amount
      , 'successURL': `https://vk.com/${window.group.group_id}`
      , 'label': options.incognito ? 0 : window.user.user_id
      , 'form-comment': window.group.name
      }
    )

    try {
      window.open(url)
    } catch(e) {
      window.top.location = url
    }
  }

  render() {
    return (
      <div id="wrapper">
        {{ main:
          <Main
            groupName={window.group.name}
            groupAvatarURL={window.group.avatar}
            onPaymentIntent={() => this.navigateTo('payment')}
            onShowGoals={() => this.navigateTo('goals')}
            onShowSettings={() => this.navigateTo('settings')}
            numberOfIncomes={window.stats[0]}
            sponsorsCount={window.stats[1]}
            totalIncome={window.stats[2]}
            averageIncome={window.stats[3]}
            latestIncomes={window.latestIncomes}
            largestIncomes={window.largestIncomes}
            currentUserIsAdmin={window.user.isAdmin}
            users={window.users}
           />

        , payment:
          <PaymentForm
            onClose={() => this.navigateTo('main')}
            action={options => this.handlePayment(options)}
            />

        , settings:
          <SettingsForm
            onClose={() => this.navigateTo('main')}
            action={data => this.props.configure(data)}
            initialSetup={!this.props.wallet}
            groupId={window.group.group_id}
            wallet={this.props.wallet}
            user={window.user}
            group={window.group}
            />

        , comelater:
          <Message>Администратор сообщества еще не настроил приложение. Вернитесь позже</Message>

        , goals:
          <div>
            <PaperButton action={() => this.navigateTo('main')}>Вернуться назад</PaperButton>
            <Paper>
              <div
                style={{ padding: '20px', marginTop: '10px' }}
                dangerouslySetInnerHTML={{__html: window.group.description}}>
              </div>
            </Paper>
          </div>

        }[this.props.route]
      }
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
