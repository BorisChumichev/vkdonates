'use strict';

module.exports = app => (req, res, next) => {
  app.models.Income.summaryForGroup(req.group.group_id)
    .then(incomeSummary =>
      res.render
        ( 'index'
        , { app
          , group: req.group
          , user: req.user
          , latestIncomes: JSON.stringify(incomeSummary.latestIncomes)
          , largestIncomes: JSON.stringify(incomeSummary.largestIncomes)
          , users: JSON.stringify(incomeSummary.users)
          , stats: incomeSummary.stats
          }
        )
    )
    .catch(next)
}
