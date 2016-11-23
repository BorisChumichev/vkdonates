'use strict';

const configureAssetsHash = app =>
  app.set(
    'assets',
    JSON.parse(
      require('fs').readFileSync(require('path').join(process.cwd(), 'assets.json'))
    )
  )

const configureWebpackServer = app => {
  const webpack = require('webpack')
    , WebpackDevServer = require('webpack-dev-server')
    , webpackDevConfig = require('../../webpack.config.development')
    , port = app.get('dev-server-port')

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: 'http://localhost:3031/',
    contentBase: '../../client/',
    inline: false,
    hot: true,
    bail: true,
    stats: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': `http://localhost:${app.get('port')}`,
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(port, 'localhost', function (err) {
    if (err) return console.log(err)
    console.log(`webpack dev server listening on localhost:${port}`)
  })
}

module.exports = app =>
  app.get('env') === 'production'
    ? configureAssetsHash(app)
    : configureWebpackServer(app)
