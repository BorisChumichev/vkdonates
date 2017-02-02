module.exports = groupId =>
  [ { 'userId': '1094041'
    , 'groupId': '1'
    , 'date': '2017-02-01T15:02:01.726Z'
    , 'amount': 100
    , 'actualAmount': 99
    }
  , { 'userId': '1094041'
    , 'groupId': groupId
    , 'date': '2017-02-01T15:01:01.726Z'
    , 'amount': 100
    , 'actualAmount': 99
    }
  , { 'userId': '1094041'
    , 'groupId': groupId
    , 'date': '2017-02-01T15:00:01.726Z'
    , 'amount': 200
    , 'actualAmount': 198
    }
  , { 'userId': '1094042'
    , 'groupId': groupId
    , 'date': '2017-02-01T15:00:00.726Z'
    , 'amount': 300
    , 'actualAmount': 297
    }
  ]
