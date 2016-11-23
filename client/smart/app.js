import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayBye } from 'actions/app'

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
        {this.props.greeting}
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
