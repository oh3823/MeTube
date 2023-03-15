const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const BASE = './src/client/js/';
module.exports = {
  entry: {
    main: BASE + 'main.js',
    videoPlayer: BASE + 'videoPlayer.js',
    recorder: BASE + 'recorder.js',
    commentSection: BASE + 'commentSection.js',
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
