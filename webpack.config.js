const path = require('path');

const rootDir = path.resolve(__dirname, 'src');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: 'app-bundle.js',
    chunkFilename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png)$/,
        use: {
          loader: 'url-loader?name=scripts/shared/images/[name].[ext]',
          options: {
            limit: 1000,
            fallback: 'file-loader?name=scripts/shared/images/[name].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/scripts/',
    port: 3000,
    open: true,
  },
  devtool: 'inline-source-map',
};
