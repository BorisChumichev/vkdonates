import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayBye } from 'actions/app'
import Paper from 'dumb/paper'
import MainHeading from 'dumb/main-heading'

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
      <div onClick={() => this.props.sayBye()}>
        <Paper>
          <MainHeading
            title="Благотворительный фонд «ПОДАРИ ЖИЗНЬ»"
            avatarURL="https://cs7051.vk.me/c626128/v626128515/2891b/NxH6b4w-XKs.jpg"
            />
        </Paper>
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
