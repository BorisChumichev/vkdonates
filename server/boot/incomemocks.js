'use strict';

module.exports = function(app, cb) {
  app.models.Income.create([
  {
    user_id: 210700240,
    amount: 300,
    group_id: 43864417,
    date: new Date('2016-11-24T02:25:37.000Z')
  },
  {
    user_id: 210700241,
    amount: 400,
    group_id: 43864417,
    date: new Date('2016-11-21T02:25:37.000Z')
  },
  {
    user_id: 210700286,
    amount: 1300,
    group_id: 43864417,
    date: new Date('2016-11-23T02:25:37.000Z')
  },
  {
    user_id: 0,
    amount: 311,
    group_id: 43864417,
    date: new Date('2016-11-26T02:25:37.000Z')
  },
  {
    user_id: 210700283,
    amount: 1300,
    group_id: 43864417,
    date: new Date('2016-11-24T02:25:37.000Z')
  },
  {
    user_id: 210700283,
    amount: 100,
    group_id: 43864417,
    date: new Date('2016-11-20T02:25:37.000Z')
  },
  {
    user_id: 210700281,
    amount: 130,
    group_id: 43864417,
    date: new Date('2016-11-21T02:25:37.000Z')
  },
  {
    user_id: 210700181,
    amount: 150,
    group_id: 43864417,
    date: new Date('2016-10-20T02:25:37.000Z')
  },
  {
    user_id: 210700184,
    amount: 655,
    group_id: 43864417,
    date: new Date('2016-10-21T02:25:37.000Z')
  }
  ]).then(() => cb())
};
