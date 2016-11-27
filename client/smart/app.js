import React, { Component } from 'react'
import { connect } from 'react-redux'
import { configureApp, setRoute } from 'actions/app'
import Message from 'dumb/message'
import PaymentForm from 'dumb/payment-form'
import SettingsForm from 'dumb/settings-form'
import Main from 'dumb/main'
import mocks from '../mocks'


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
  constructor() {
    super()
  }

  navigateTo(route) {
    this.props.setRoute(route)
  }

  handlePayment(options) {
    window.top.location = `https://money.yandex.ru/quickpay/cps-preparation.xml?receiver=${
      this.props.wallet
    }&sum=${
      options.amount
    }&form-comment=${
      encodeURIComponent(`Пожертвование для ${group.name}`)
    }&short-dest=Пожертвование%20Вконтакте&paymentType=AC&quickpay-form=donate&quickpay-back-url=https%3A%2F%2Fvk.com%2Fvkdonates&successURL=https%3A%2F%2Fvk.com%2Fvkdonates&shop-host=vkdonates.com&targets=Пожертвование%20Вконтакте&label=${
      options.incognito ? 0 : user.user_id
    }&comment=`
  }

  render() {
    return (
      <div id="wrapper">
        {{ main:
          <Main
            groupName={group.name}
            groupAvatarURL={group.avatar}
            onPaymentIntent={() => this.navigateTo('payment')}
            onShowGoals={() => this.navigateTo('goals')}
            onShowSettings={() => this.navigateTo('settings')}
            numberOfIncomes={stats[0]}
            sponsorsCount={stats[1]}
            totalIncome={stats[2]}
            averageIncome={stats[3]}
            latestIncomes={latestIncomes}
            largestIncomes={largestIncomes}
            currentUserIsAdmin={user.isAdmin}
            users={users}
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
            groupId={group.group_id}
            wallet={this.props.wallet}
            />
        , comelater:
          <Message>Администратор сообщества еще не настроил приложение. Вернитесь позже</Message>
        , goals:
          <Message>{group.description}</Message>
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
