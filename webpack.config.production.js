'use strict'

const webpack = require('webpack')
const config = require('./webpack.config.base.js')

const SaveAssetsJson = require('assets-webpack-plugin')

config.bail = true
config.debug = false
config.profile = false
config.devtool = null

config.output = {
  path: './public/dist',
  pathInfo: true,
  publicPath: '/',
  filename: 'bundle.[hash].min.js'
}

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      screw_ie8: true
    }
  }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
])

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel'
  }
])

module.exports = config
