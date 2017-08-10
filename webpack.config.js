const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const onProd = (process.env.NODE_ENV === 'prod') ? true : false;

module.exports = {
  entry: {
    app: [
      './resources/assets/js/index.js',
      './resources/assets/scss/main.scss'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss/,
        use: extractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false
              }
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  output: {
    path: process.cwd() + '/dist',
    filename: 'js/bundle.js'
  },
  plugins: [
    new extractTextPlugin('css/main.css')
  ]
}

if (onProd) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}