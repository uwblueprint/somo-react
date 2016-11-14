const webpack = require('webpack');
const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /.json$/,
        loader: 'json',
      },
    ],
  },
  resolve: {
    root: [path.join(__dirname, 'src'), path.join(__dirname)],
    extensions: ['', '.js', '.jsx'],
  },
  eslint: {
    emitWarning: true,
    emitError: true,
    failOnWarning: true,
    failOnError: true,
  },
};
