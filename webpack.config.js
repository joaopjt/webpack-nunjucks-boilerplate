const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const extractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = (process.env.NODE_ENV === 'development') ? true : false;
const basePath = process.cwd();

const nunjucksContext = require('./resources/data/index');
const nunjucksOptions = JSON.stringify({
  searchPaths: basePath + '/resources/html/',
  context: nunjucksContext,
  query: {
    config: (isDev) ? path.resolve(basePath, '/resources/html/config.dev.js') : path.resolve(basePath, '/resources/html/config.prod.js')
  }
});

const pages = glob.sync('**/*.njk', {
  cwd: path.join(basePath, 'resources/html/pages/'),
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
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true
        },
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          './resources/data/index.js'
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss/,
        use: extractTextPlugin.extract({
          use: [
            { 
              loader: "css-loader?url:false"
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
        loader: ['html-loader', `nunjucks-html-loader?${nunjucksOptions}`]
      }
    ]
  },
  output: {
    path: basePath + '/dist',
    filename: 'js/bundle.js'
  },
  plugins: [
    ...pages,
    new extractTextPlugin('css/main.css'),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

if (!isDev) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}