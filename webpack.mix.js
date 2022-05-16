require('babel-polyfill');

const webpack = require('webpack');
const mix = require('laravel-mix');
require('laravel-mix-nunjucks-2');

const isDev = (process.env.NODE_ENV === 'development') ? true : false;
const basePath = process.cwd();

const nunjucksContext = require('./resources/data/index');
const nunjucksDevConfig = require('./resources/html/config.dev.json');
const nunjucksProdConfig = require('./resources/html/config.prod.json');

nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = {
  searchPaths: basePath + '/resources/html/',
  context: nunjucksContext
};

console.log(mix);

mix
  .njk('./resources/html', nunjucksOptions)
  .js('./resources/assets/js/index.js', 'assets/js/bundle.js')
  .sass('./resources/assets/scss/main.scss', 'assets/css')
  .setPublicPath('dist');