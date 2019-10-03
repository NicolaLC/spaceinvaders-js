const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/gameScripts/main.ts',
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyPlugin([
      { from: 'index.html', to: '' },
      { from: 'src/assets', to: 'assets' },
      { from: 'src/**/*.css', to: 'gameStyles', flatten: true }
    ]),
  ],
  watch: true,
  watchOptions: {
    ignored: '/node_modules/'
  }
};