'use strict';

const webpack = require('webpack');
const config = require('./webpack.config.base.js');

config.devtool = 'eval';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

config.entry = config.entry.concat(['webpack-dev-server/client?http://localhost:3031', 'webpack/hot/only-dev-server'])

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.jsx?$/,
    loaders: ['react-hot'],
    exclude: /(node_modules|semantic)/
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules|semantic/,
    loader: 'babel',
    query: {
      presets: ['es2015']
    }
  }
]);

module.exports = config;
