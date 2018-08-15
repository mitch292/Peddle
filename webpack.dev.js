const path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: {
    app: ['babel-polyfill', `${SRC_DIR}/index.jsx`]
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  }, 
  module: {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        options: { presets: ['react', 'env', 'stage-0'] }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  target: 'node',
  externals: [
    'pg-native'
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};