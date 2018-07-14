const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
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