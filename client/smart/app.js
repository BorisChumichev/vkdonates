import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayBye } from 'actions/app'
import Message from 'dumb/message'
import PaymentForm from 'dumb/payment-form'
import SettingsForm from 'dumb/settings-form'
import Main from 'dumb/main'
import mocks from '../mocks'


const mapStateToProps = (state, ownProps) => {
  return {
    greeting: state.greeting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sayBye: () => dispatch(sayBye())
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = { route: 'main' }
  }

  navigateTo(route) {
    this.setState({ route: route })
  }

  render() {
    return (
      <div id="wrapper">
        {{ main:
          <Main
            groupName={"Благотворительный фонд «ПОДАРИ ЖИЗНЬ»"}
            groupAvatarURL={"https://cs7051.vk.me/c626128/v626128515/2891b/NxH6b4w-XKs.jpg"}
            onPaymentIntent={() => this.navigateTo('payment')}
            onShowGoals={() => this.navigateTo('goals')}
            onShowSettings={() => this.navigateTo('settings')}
            numberOfIncomes={100}
            sponsorsCount={100}
            totalIncome={100}
            averageIncome={100}
            latestIncomes={mocks.latestIncomes}
            largestIncomes={mocks.largestIncomes}
            currentUserIsAdmin={true}
           />
        , payment:
          <PaymentForm
            onClose={() => this.navigateTo('main')}
            action={options => {
              window.top.location = `https://money.yandex.ru/quickpay/cps-preparation.xml?receiver=410012497185588&sum=${options.amount}&form-comment=Пожертвование%20Вконтакте&short-dest=Пожертвование%20Вконтакте&paymentType=AC&quickpay-form=donate&quickpay-back-url=https%3A%2F%2Fvk.com%2Fvkdonates&successURL=https%3A%2F%2Fvk.com%2Fvkdonates&shop-host=vkdonates.com&targets=Пожертвование%20Вконтакте&label=lllll&comment=`
            }}
            />
        , settings:
          <SettingsForm
            onClose={() => this.navigateTo('main')}
            action={options => console.log(options)}
            initialSetup={false}
            groupId={123123}
            wallet={982374523}
            />
        }[this.state.route]
      }
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
