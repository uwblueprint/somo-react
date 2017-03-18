const webpack = require('webpack');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.jsx?$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              emitError: true,
              failOnWarning: true,
              failOnError: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    constants: false,
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx'],
  },
};
