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

class SettingsForm extends Component {
  constructor() {
    super()
    this.state = {
      currentTab: 'Последние'
    }
  }
  render() {
    const {
      groupName,
      groupAvatarURL,
      onPaymentIntent,
      onShowGoals,
      numberOfIncomes,
      sponsorsCount,
      totalIncome,
      averageIncome,
      latestIncomes,
      largestIncomes
    } = this.props

    return (
      <div>
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
      {latestIncomes.length !== 0 &&
        <TabsControl
          tabs={[ 'Последние', 'Рейтинг' ]}
          current={this.state.currentTab}
          action={tab => this.setState({ currentTab: tab })}
          />
      }
      {latestIncomes.length === 0 &&
        <Message>Никто еще не совршал пожертвований, вы можете стать первым!</Message>
      }
      {{
        'Последние': latestIncomes.map(income =>
            <Income id={income.id} name={income.name} value={income.value} avatarURL={income.avatarURL} date={income.date} />
          ),
        'Рейтинг': largestIncomes.map((income, i) =>
            <Income id={income.id} name={income.name} value={income.value} avatarURL={income.avatarURL} place={i + 1} />
          )
      }[this.state.currentTab]}
    </div>
    )
  }
}

export default SettingsForm