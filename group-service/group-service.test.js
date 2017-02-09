import { omit, take, prop } from 'ramda'
import micro, { send } from 'micro'
import test from 'ava'
import listen from 'test-listen'
import request from 'request-promise'
import incomeService from './group-service'
import fixtures from './fixtures/groups'
import db from '../common/util/db'
import bb from 'bluebird'

test('Group creation', async t => {
  const url = await listen(micro(incomeService))

    , group = take(1, fixtures('0'))[0]

    , response = await request(
        { method: 'POST'
        , uri: url
        , body: group
        , json: true
        }
      )

  t.deepEqual(group, omit([ 'createdAt', 'updatedAt', 'id' ], response))

  await db.query(`DELETE FROM groups WHERE id = ${ response.id }`)
})

test('Group retrieval', async t => {
  const url = await listen(micro(incomeService))
    , group = take(1, fixtures('1'))[0]

  await request(
    { method: 'POST'
    , uri: url
    , body: group
    , json: true
    }
  )

  const response = await request(
      { method: 'GET'
      , uri: `${url}?groupid=${group.groupId}`
      , json: true
      }
    )

  t.deepEqual(group, omit([ 'createdAt', 'updatedAt', 'id' ], response))

  await db.query(`DELETE FROM groups WHERE id = ${ response.id }`)
})
