'use strict';

const path = require('path');
const webpack = require('webpack');

const statics = require('./statics');

module.exports = {
  cache: true,

  devtool: '#source-map',

  entry: [path.resolve(statics.ROOT, 'src', 'index.js')],

  externals: ['billboard.js', 'd3', 'prop-types', 'react', 'react-dom'],

  mode: 'development',

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [path.resolve(statics.ROOT, 'src')],
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          emitError: true,
          failOnError: true,
          failOnWarning: true,
          formatter: require('eslint-friendly-formatter'),
        },
        test: /\.js$/,
      },
      {
        include: [path.resolve(statics.ROOT, 'src'), path.resolve(statics.ROOT, 'examples')],
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },

  output: {
    filename: 'react-billboard.js',
    library: 'BillboardChart',
    libraryTarget: 'umd',
    path: path.resolve(statics.ROOT, 'dist'),
    umdNamedDefine: true,
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
};
