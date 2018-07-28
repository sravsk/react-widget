const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  //target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  //entry: `${SRC_DIR}/index.js`,
  entry: './client/src/outputs/Embeddable-Widget.js',
  output: {
   // filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/',
    filename: 'widget.js',
    library: 'EmbeddableWidget',
    libraryExport: 'default',
    libraryTarget: 'window',
  },
  plugins: [
    new MinifyPlugin()
  ],
  serve: {
    content: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: [["es2015", { "modules": false }], "react"],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};