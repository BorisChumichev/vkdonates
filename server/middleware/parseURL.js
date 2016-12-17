'use strict';

const { merge } = require('ramda')

const OWNER_TYPE = 4 // https://vk.com/dev/apps_init?f=2.%20viewer_type

const parseGroupData = q => {
    try {
      return merge(
        { group_id: q.group_id },
        JSON.parse(q.api_result).response[0]
      )
    } catch(e) {
      return null
    }
  }

const parseUserData = q => (
    { isAdmin: q.viewer_type == OWNER_TYPE
    , user_id: q.viewer_id
    , token: (parseInt(q.viewer_id) + parseInt(q.group_id)).toString(16).replace('.', '')
    }
  )

module.exports = (req, res, next) => {
  req.group = parseGroupData(req.query)
  req.user = parseUserData(req.query)

  return (req.group && req.group.group_id)    
    ? next()
    : res.render('titlepage', {}) // assume app is opened without group context
}
