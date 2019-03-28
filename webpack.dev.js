const path = require('path');

module.exports = {
  entry: {
    Watermark: './src/Watermark.js',
    'Watermark.min': './src/Watermark.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'Watermark',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
