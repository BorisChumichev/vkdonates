import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayBye } from 'actions/app'
import Paper from 'dumb/paper'
import MainHeading from 'dumb/main-heading'
import Button from 'dumb/button'
import ButtonNest from 'dumb/button-nest'
import Stat from 'dumb/stat'
import StatsRow from 'dumb/stats-row'

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
          <ButtonNest>
            <Button action={() => console.log('click')}>Сделать взнос</Button>
            <Button isEmpty={true} action={() => console.log('click2')}>Цели сборов</Button>
          </ButtonNest>
          <StatsRow>
            <Stat value={311} caption={'взносов'}/>
            <Stat value={139} caption={'спонсоров'}/>
            <Stat value={149000} caption={'привлечено'} isCurrency={true}/>
            <Stat value={523} caption={'сред. взнос'} isCurrency={true}/>
          </StatsRow>
        </Paper>
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
