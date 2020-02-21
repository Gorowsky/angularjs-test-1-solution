const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: `${__dirname}/app.js`,
  context: path.join(__dirname, '/'),
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" }
        ],
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "modules": "commonjs",
                  "targets": {
                    "node": "current"
                  }
                }
              ]
            ]
          },
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.html`,
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { from: './src/public' }
    ])
  ]
};