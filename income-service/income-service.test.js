import { omit, take, prop } from 'ramda'
import micro, { send } from 'micro'
import test from 'ava'
import listen from 'test-listen'
import request from 'request-promise'
import incomeService from './income-service'
import fixtures from './fixtures/incomes'
import db from '../common/util/db'
import bb from 'bluebird'

test('Income creation', async t => {
  const url = await listen(micro(incomeService))

    , income = take(1, fixtures('0'))[0]

    , response = await request(
        { method: 'POST'
        , uri: url
        , body: income
        , json: true
        }
      )

  t.deepEqual(income, omit([ 'createdAt', 'updatedAt', 'id' ], response))

  await db.query(`DELETE FROM incomes WHERE id = ${ response.id }`)
})

test('Incomes report for group', async t => {
  const persistedIncomeIds = await bb.resolve(fixtures('2'))
      .map(db.models.income.create.bind(db.models.income))
      .map(prop('id'))

    , url = await listen(micro(incomeService))
    
    , response = await request(
        { method: 'GET'
        , uri: url + '/group-report?groupid=2'
        , json: true
        }
      )

  t.deepEqual(
    { incomesCount: 3
    , averageIncome: 200
    , sponsorsCount: 2
    , totalIncome: 600
    }, response)

  await db.query(`DELETE FROM incomes WHERE id in (${ persistedIncomeIds.join(', ') })`)
})

test('Latest incomes for group', async t => {
  const persistedIncomeIds = await bb.resolve(fixtures('3'))
      .map(db.models.income.create.bind(db.models.income))
      .map(prop('id'))

    , url = await listen(micro(incomeService))

    , response = await request(
        { method: 'GET'
        , uri: url + '/latest?groupid=3&limit=2&offset=1'
        , json: true
        }
      )

  t.is(response[0].date, fixtures('3')[2].date)
  t.is(response[1].date, fixtures('3')[3].date)

  await db.query(`DELETE FROM incomes WHERE id in (${ persistedIncomeIds.join(', ') })`)
})

test('Largest incomes for group', async t => {
  const persistedIncomeIds = await bb.resolve(fixtures('4'))
      .map(db.models.income.create.bind(db.models.income))
      .map(prop('id'))

    , url = await listen(micro(incomeService))

    , response = await request(
        { method: 'GET'
        , uri: url + '/largest?groupid=4&limit=2&offset=1'
        , json: true
        }
      )

  t.is(response[0].date, fixtures('3')[2].date)
  t.is(response[1].date, fixtures('3')[1].date)

  await db.query(`DELETE FROM incomes WHERE id in (${ persistedIncomeIds.join(', ') })`)
})
