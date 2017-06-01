const path = require('path')
const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools')
const ip = process.env.IP || '0.0.0.0'
const port = (+process.env.PORT + 1) || 3001
const DEBUG = process.env.NODE_ENV !== 'production'
const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')

const isVendor = ({userRequest}) => (
  userRequest &&
  userRequest.indexOf('node_modules') >= 0 &&
  userRequest.match(/\.js$/)
)

/**
 * webpack.config.js
 * This file exports a config object used by the server and dev-server.
 * The goal is to take our src/client app, bundle it, and make it available in our dist folder
 *
 */
const config = {
  // Each module is executed with "eval" and "//@ sourceURL" on non-production
  devtool: DEBUG ? 'eval' : false,

  // We start with src/client, our client facing app...
  entry: {
    app: ['babel-polyfill', path.join(__dirname, '../src/client')]
  },
  // ...and move it to our dist/public folder
  output: {
    path: path.join(__dirname, '../dist/public'),
    filename: '[name].[hash].js',
    publicPath: DEBUG ? `http://${ip}:${port}/` : PUBLIC_PATH
  },

  // Load our our javascript code when webpack starts
  resolve: {
    modules: ['src', 'node_modules']
  },

  // define globals which are configured at compile time
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH)
    }),
  ],

  // use babel to transform .js code
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ],
  },
}

if (DEBUG) {
  console.log('--------DEBUG--------')
  config.entry.app.unshift(`webpack-dev-server/client?http://${ip}:${port}/`)

  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)
  ])
} else {
  config.output.filename = '[name].[chunkHash].js'

  // This plugin puts our common code (node_models) into a vendor.js file
  config.plugins = config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isVendor,
    }),
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)
  ])
}

module.exports = config
