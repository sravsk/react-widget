const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
 mode : 'production',
  plugins: [
    new CleanWebpackPlugin(['dist/']),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    devMode ? null : new JavaScriptObfuscator(),
  ].filter(i => i),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        //include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: [["es2015", { "modules": false }], "react"],
          plugins: ['transform-class-properties']
        }
      },
      {
         test: /\.(sa|sc|c)ss$/,
         use: [
          // fallback to style-loader in development
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
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
  devtool: 'source-map',
  watch : devMode,
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
  // plugins: [
  //   new MinifyPlugin()
  // ],
  // serve: {
  //   content: DIST_DIR
  // },
  
  
  // mode : devMode ? 'development' : 'production',
  //   watch : devMode,
  //   performance: {
  //       hints: process.env.NODE_ENV === 'production' ? "warning" : false
  //   }
};