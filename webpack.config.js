var path = require('path');
var webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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