const path = require('path');

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../static')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};