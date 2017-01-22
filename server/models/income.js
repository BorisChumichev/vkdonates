const superagent = require('superagent')
const R = require('ramda')
const bb = require('bluebird')

module.exports = function(Income) {
  Income.summaryForGroup = group_id =>
    new bb((resolve, reject) => {
      Income.find({ where: { group_id: group_id } })
        .then(incomes => {
          
          if (!incomes.length)
            return resolve(
                { users: []
                , latestIncomes: []
                , largestIncomes: []
                , stats: [0, 0, 0, 0, 0]
                }
              )

          const desc = (a, b) => b.amount - a.amount
            , byDate = (a, b) => b.date - a.date
            , latestIncomes = R.take(20, R.sort(byDate, incomes))
            , largestIncomes = R.take(20, R.sort(desc, incomes))
            , user_ids = R.uniq(largestIncomes.concat(latestIncomes).map(R.prop('user_id')))

          superagent.get(`https://api.vk.com/method/users.get?user_ids=${user_ids.join(',')}&fields=photo_100`)
            .then(data => {
              const users = data.body.response
                , stats =
                  [ incomes.length
                  , users.length
                  , Math.floor(incomes.reduce((acc, inc) => acc + inc.amount, 0))
                  , Math.floor(incomes.reduce((acc, inc) => acc + inc.amount, 0) / incomes.length)
                  ]

              resolve({ users, latestIncomes, largestIncomes, stats })
            })
        })
        .catch(reject)
    })
}
