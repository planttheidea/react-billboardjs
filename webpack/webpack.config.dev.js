'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaultConfig = require('./webpack.config');
const statics = require('./statics');

module.exports = Object.assign({}, defaultConfig, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    inline: true,
    lazy: false,
    noInfo: false,
    port: statics.DEV_SERVER_PORT,
    quiet: false,
    stats: {
      colors: true,
      progress: true,
    },
  },

  entry: [path.resolve(statics.ROOT, 'examples', 'App.js')],

  externals: undefined,

  module: Object.assign({}, defaultConfig.module, {
    rules: [
      ...defaultConfig.module.rules.map((rule) => {
        if (rule.loader === 'eslint-loader') {
          return Object.assign({}, rule, {
            options: Object.assign({}, rule.options, {
              emitError: undefined,
              failOnWarning: false,
            }),
          });
        }

        return rule;
      }),
      {
        include: [path.resolve(statics.ROOT, 'src')],
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  }),

  output: Object.assign({}, defaultConfig.output, {
    publicPath: `http://localhost:${statics.DEV_SERVER_PORT}/`,
  }),

  plugins: defaultConfig.plugins.concat([new HtmlWebpackPlugin()]),
});
