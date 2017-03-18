const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/',
  },
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
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx'],
  },
  node: {
    // When you try to import a file or directory named 'constants' using its absolute path, it
    // will not import the user created 'constants' file or directory. Instead, it will import
    // node_modules/constants-browserify/constants.json, which is a node.js built-in module, and
    // node.js built-in modules have a higher priority than any user modules. So this is a
    // workaround that customizes the node.js environment. See
    // https://github.com/webpack/webpack/issues/4159 from more details.
    constants: false,
  },
  devServer: {
    hot: true,
    inline: false,
    contentBase: path.join(__dirname, 'src'),
    publicPath: '/assets/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
