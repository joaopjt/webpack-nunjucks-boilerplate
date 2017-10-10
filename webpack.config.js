const path = require('path');
const glob = require('glob');
const extractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = (process.env.NODE_ENV === 'development') ? true : false;

const nunjucksContext = require('./resources/data/index');
const nunjucksOptions = JSON.stringfy({
  searchPaths: process.cwd() + '/resources/html/',
  context: nunjucksContext,
  query: {
    config: process.cwd() + '/resources/html/config.dev.js'
  }
});

const pages = glob.sync('**/*.njk', {
  cwd: path.join(sourceDir, 'html/pages/'),
  root: '/',
}).map(page => new HtmlWebpackPlugin({
  filename: page.replace('njk', 'html'),
  template: `html/pages/${page}`,
}));


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
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: `nunjucks-loader?${nunjucksOptions}`,
        options: nunjucksOptions
      }
    ]
  },
  output: {
    path: process.cwd() + '/dist',
    filename: 'js/bundle.js'
  },
  plugins: [
    ...pages,
    new extractTextPlugin('css/main.css')
  ]
}

if (!isDev) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}