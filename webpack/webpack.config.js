'use strict';

const path = require('path');
const webpack = require('webpack');

const statics = require('./statics');

module.exports = {
  cache: true,

  devtool: '#source-map',

  entry: [path.resolve(statics.ROOT, 'src', 'index.js')],

  externals: {
    'billboard.js': {
      amd: 'billboard.js',
      commonjs: 'billboard.js',
      commonjs2: 'billboard.js',
      root: 'window'
    },
    d3: {
      amd: 'd3',
      commonjs: 'd3',
      commonjs2: 'd3',
      root: 'd3'
    },
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    },
    'react-dom': {
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM'
    }
  },

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
          formatter: require('eslint-friendly-formatter')
        },
        test: /\.js$/
      },
      {
        include: [path.resolve(statics.ROOT, 'src'), path.resolve(statics.ROOT, 'examples')],
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },

  output: {
    filename: 'react-billboard.js',
    library: 'BillboardChart',
    libraryTarget: 'umd',
    path: path.resolve(statics.ROOT, 'dist'),
    umdNamedDefine: true
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])]
};
