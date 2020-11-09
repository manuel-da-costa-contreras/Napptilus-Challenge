const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const rootDir = path.resolve(__dirname, './src')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app-bundle.js',
    chunkFilename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            fallback: 'file-loader',
            name: 'shared/[folder]/[name].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(rootDir, 'index.html'),
    }),
    new webpack.ProgressPlugin(),
],
  devServer: {
    contentBase: path.resolve(rootDir),
    port: 3000,
    open: true,
  },
  devtool: 'inline-source-map',
};
