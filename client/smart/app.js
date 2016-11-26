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
  render() {
    return (
      <div id="wrapper">
        { true && 
          <Main
            groupName={"Благотворительный фонд «ПОДАРИ ЖИЗНЬ»"}
            groupAvatarURL={"https://cs7051.vk.me/c626128/v626128515/2891b/NxH6b4w-XKs.jpg"}
            onPaymentIntent={() => console.log('payment intent')}
            onShowGoals={() => console.log('on show goals')}
            numberOfIncomes={100}
            sponsorsCount={100}
            totalIncome={100}
            averageIncome={100}
            latestIncomes={mocks.latestIncomes}
            largestIncomes={mocks.largestIncomes}
           />
        }
        { true && 
          <PaymentForm
            onClose={() => console.log('close')}
            action={options => console.log(options)}
            />
        }
        { true && 
          <SettingsForm
            onClose={() => console.log('close')}
            action={options => console.log(options)}
            initialSetup={false}
            groupId={123123}
            />
        }
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
