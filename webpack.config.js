const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/assets',
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
        test: /.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
  eslint: {
    emitWarning: true,
    emitError: true,
    failOnWarning: true,
    failOnError: true,
  },
  devServer: {
    contentBase: path.join(__dirname, '/src'),
  },
};
