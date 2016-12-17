'use strict';

module.exports = app =>
  app.use(
    app.loopback.Router()
      .get
        ( '/'
        , require('../middleware/parseURL')
        , require('../middleware/request-signature-check')(app)
        , require('../middleware/resolveGroup')(app)
        , require('../middleware/home')(app)
        )
      .post
        ( '/configure'
        , require('../middleware/setupGroup')(app)
        )
      .post
        ( '/notify/:group_id'
        , require('../middleware/handleYMNotification')(app)
        )
  )
