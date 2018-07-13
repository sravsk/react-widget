var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'production',
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
          presets: ['react', 'es2015'],
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