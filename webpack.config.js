const path = require('path');

module.exports = {
  entry: [
    __dirname + "src/index.html",
    __dirname + "src/gameStyles/*.css",
    __dirname + "src/**/*.ts",
  ],

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
    extensions: ['.tsx', '.ts', '.js', '.css', '.html'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};