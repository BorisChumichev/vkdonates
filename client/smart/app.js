import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayBye } from 'actions/app'
import Paper from 'dumb/paper'
import MainHeading from 'dumb/main-heading'
import Button from 'dumb/button'
import ButtonNest from 'dumb/button-nest'
import Stat from 'dumb/stat'
import StatsRow from 'dumb/stats-row'
import TabsControl from 'dumb/tabs-control'
import Income from 'dumb/income'
import Message from 'dumb/message'


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
        <TabsControl
          tabs={[ 'Последние', 'Рейтинг' ]}
          current={'Последние'}
          action={tab => console.log(tab)}
          />
        <Income id="78195752" name="Evgeny Terskikh" value="500" avatarURL="https://pp.vk.me/c626829/v626829622/37ff/9edmvCaf2t4.jpg" date={Date.now() - 120000} />
        <Income id="78195752" name="Inkignito" value="1500" avatarURL={null} date={Date.now() - 12000000} />
        <Income id="78195752" name="Inkignito" value="1500" avatarURL={null} place={1} />
        <Message>Никто еще не совршал пожертвований, вы можете стать первым!</Message>
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
