'use strict';

const { merge } = require('ramda')
const sha1 = require('sha1')

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

const parseUserData = (q, secret) => (
    { isAdmin: q.viewer_type == OWNER_TYPE
    , user_id: q.viewer_id
    , token: sha1(q.viewer_id + q.group_id + secret)
    }
  )

module.exports = app => (req, res, next) => {
  req.group = parseGroupData(req.query)
  req.user = parseUserData(req.query, app.get('VK_SECRET_KEY'))

  return (req.group && req.group.group_id)    
    ? next()
    : res.render('titlepage', {}) // assume app is opened without group context
}
