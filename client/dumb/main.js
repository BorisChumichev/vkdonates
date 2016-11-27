import React, { Component } from 'react';
import Paper from 'dumb/paper'
import { partial } from 'ramda'
import MainHeading from 'dumb/main-heading'
import Button from 'dumb/button'
import ButtonNest from 'dumb/button-nest'
import Stat from 'dumb/stat'
import StatsRow from 'dumb/stats-row'
import TabsControl from 'dumb/tabs-control'
import Income from 'dumb/income'
import Message from 'dumb/message'
import PaperButton from 'dumb/paper-button'
import R from 'ramda'

class SettingsForm extends Component {
  constructor() {
    super()
    this.state = {
      currentTab: 'Последние'
    }
  }
  
  componentDidMount() {
    VK.callMethod("resizeWindow", 795, document.getElementById('wrapper').offsetHeight)
  }

  render() {
    const {
      groupName,
      groupAvatarURL,
      onPaymentIntent,
      onShowGoals,
      onShowSettings,
      numberOfIncomes,
      sponsorsCount,
      totalIncome,
      averageIncome,
      latestIncomes,
      largestIncomes,
      currentUserIsAdmin,
      users
    } = this.props

    return (
      <div style={{ width: '100%' }}>
        <Paper>
        <MainHeading
          title={groupName}
          avatarURL={groupAvatarURL}
          />
        <ButtonNest>
          <Button action={onPaymentIntent}>Сделать взнос</Button>
          <Button isEmpty={true} action={onShowGoals}>Цели сборов</Button>
        </ButtonNest>
        <StatsRow>
          <Stat value={numberOfIncomes} caption={'взносов'}/>
          <Stat value={sponsorsCount} caption={'спонсоров'}/>
          <Stat value={totalIncome} caption={'привлечено'} isCurrency={true}/>
          <Stat value={averageIncome} caption={'средний взнос'} isCurrency={true}/>
        </StatsRow>
      </Paper>
      { currentUserIsAdmin &&
        <PaperButton action={onShowSettings}>Настройки приложения →</PaperButton>
      }
      {latestIncomes.length !== 0 &&
        <TabsControl
          tabs={[ 'Последние', 'Рейтинг' ]}
          current={this.state.currentTab}
          action={tab => this.setState({ currentTab: tab })}
          />
      }
      {latestIncomes.length === 0 &&
        <Message>Никто еще не совeршал пожертвований, вы можете стать первым</Message>
      }
      {{
        'Последние': latestIncomes.map((income, i) => {
            let user = R.find(R.propEq('uid', income.user_id))(users)
            if (!user) user = { first_name: 'Инкогнито', last_name: '' }
            return <Income key={i} userId={user.uid} name={`${user.first_name} ${user.last_name}` } value={income.amount} avatarURL={user.photo_100} date={income.date} />
          }
          ),
        'Рейтинг': largestIncomes.map((income, i) => {
            let user = R.find(R.propEq('uid', income.user_id))(users)
            if (!user) user = { first_name: 'Инкогнито', last_name: '' }
            return <Income key={i} userId={user.uid} name={`${user.first_name} ${user.last_name}`} value={income.amount} avatarURL={user.photo_100} place={i + 1} />
          }
          )
      }[this.state.currentTab]}
    </div>
    )
  }
}

export default SettingsForm
