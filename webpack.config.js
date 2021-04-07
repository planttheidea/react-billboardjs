'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const DEV_SERVER_PORT = 3000;
const ROOT = __dirname;

module.exports = {
  cache: true,

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    inline: true,
    lazy: false,
    noInfo: false,
    port: DEV_SERVER_PORT,
    quiet: false,
    stats: {
      colors: true,
      progress: true,
    },
  },

  entry: [path.resolve(ROOT, 'examples', 'App.js')],

  mode: 'development',

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [path.resolve(ROOT, 'src')],
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          failOnError: true,
          failOnWarning: false,
          formatter: require('eslint-friendly-formatter'),
        },
        test: /\.js$/,
      },
      {
        include: [path.resolve(ROOT, 'src'), path.resolve(ROOT, 'examples')],
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        include: [path.resolve(ROOT, 'node_modules', 'billboard.js')],
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  output: {
    filename: 'react-billboard.js',
    library: 'BillboardChart',
    libraryTarget: 'umd',
    path: path.resolve(ROOT, 'dist'),
    publicPath: `http://localhost:${DEV_SERVER_PORT}/`,
    umdNamedDefine: true,
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin(),
  ],
};
