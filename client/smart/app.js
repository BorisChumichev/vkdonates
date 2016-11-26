import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayBye } from 'actions/app'
import Message from 'dumb/message'
import PaymentForm from 'dumb/payment-form'
import SettingsForm from 'dumb/settings-form'
import Main from 'dumb/main'


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
      <div>
        { true && 
          <Main />
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
