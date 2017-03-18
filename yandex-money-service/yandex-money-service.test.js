import { merge } from 'ramda'
import micro, { send } from 'micro'
import test from 'ava'
import listen from 'test-listen'
import request from 'request-promise'
import yandexMoneyService from './yandex-money-service'
import groupService from '../group-service/group-service'
import incomeService from '../income-service/income-service'
import mockNotificationRequest from './fixtures/notification-request'
import createMockGroup from './fixtures/group'
import db from '../common/util/db'
import bb from 'bluebird'

test('Handle Yandex Money Notification', async t => {
  const mockGroupId = '192'
    , groupServiceURL = await listen(micro(groupService))
    , incomeServiceURL = await listen(micro(incomeService))
    , yandexMoneyServiceURL = await listen(micro(yandexMoneyService))

  process.env = merge(process.env,
    { 'GROUP_SERVICE_URL': groupServiceURL
    , 'INCOME_SERVICE_URL': incomeServiceURL
    }
  )

  //create test group
  await request(
      { method: 'POST'
      , uri: groupServiceURL
      , body: createMockGroup(mockGroupId)
      , json: true
      }
    )

  //send income notification to notification service
  const notificationResponse = await request(
      { method: 'POST'
      , uri: yandexMoneyServiceURL + '/notify/' + mockGroupId
      , resolveWithFullResponse: true
      , form: mockNotificationRequest
      }
    )

  //check wether notification service responds correctly
  t.is(notificationResponse.statusCode, 200)

  //check new income persistance
  const incomePersistance = await request(
      { method: 'GET'
      , uri: `${incomeServiceURL}/latest?groupid=${mockGroupId}&limit=2&offset=0`
      , json: true
      }
    )

  t.is(incomePersistance.length, 1)

  //teardown
  await db.query(`DELETE FROM incomes WHERE "groupId" = '${ mockGroupId }'`)
})
