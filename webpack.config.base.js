var path = require('path')
var webpack = require('webpack')

var NODE_ENV = process.env.NODE_ENV

var env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
}

Object.assign(env, {
  build: (env.production || env.staging)
})

module.exports = {
  target: 'web',

  entry: [
    './client/index.js'
  ],

  output: {
    path: path.join(process.cwd(), '/public'),
    pathInfo: true,
    publicPath: 'http://localhost:3031/',
    filename: 'index.js'
  },

  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    })
  ],

  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json'}
    ],

    loaders: [
      {test: /\.sass$/, loader: 'style!css!autoprefixer?browsers=last 4 version!sass?indentedSyntax=true'},
      {test: /\.css$/, loader: 'style!css'}
    ],

    noParse: /\.min\.(js|css)/
  }
}
