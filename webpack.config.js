require('babel-polyfill');

const webpack = require('webpack');
const mix = require('laravel-mix');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDev = (process.env.NODE_ENV === 'development') ? true : false;
const basePath = process.cwd();

const nunjucksContext = require('./resources/data/index');
const nunjucksDevConfig = require('./resources/html/config.dev.json');
const nunjucksProdConfig = require('./resources/html/config.prod.json');

nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = JSON.stringify({
  searchPaths: basePath + '/resources/html/',
  context: nunjucksContext
});

const pages = glob.sync('**/*.njk', {
  cwd: path.join(basePath, 'resources/html/pages/'),
  root: '/',
}).map(page => new HtmlWebpackPlugin({
  filename: page.replace('njk', 'html'),
  template: `resources/html/pages/${page}`,
}));

mix
  .js('./resources/assets/js/index.js', 'assets/js/bundle.js')
  .sass('./resources/assets/scss/main.scss', 'assets/css')
  .setPublicPath('dist');

module.exports = {
  plugins: [
    ...pages
  ],
  devServer: {
    contentBase: basePath + '/resources',
    hot: true,
    open: true,
    watchContentBase: true
  }
}

if (!isDev) {
  module.exports.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin()
  )
}