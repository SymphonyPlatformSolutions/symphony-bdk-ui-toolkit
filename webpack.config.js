const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
    library: 'sms-sdk-toolbox-ui',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'transform-react-remove-prop-types',
          ],
        },
      },
    ],
  },
  devtool: 'source-map',
  mode: 'production',
};
