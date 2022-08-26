const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');


module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV || "development",
  resolve: {
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    // static: './',
    // contentBase: path.join(__dirname, "src"),
    // historyApiFallback: true,
  },
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
      },
      {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,

          use: ["ts-loader"]
      },
      {
          test: /\.(css|scss)$/,
          use: ["style-loader",             {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]',
              },
            },
          }, "sass-loader"],
      },
      {
          test: /\.(jpg|jpeg|png|gif|mp3)$/,
          use: ["file-loader"]
      },
      // {
      //   test: /\.svg$/i,
      //   type: 'asset',
      // },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: "all" }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
    patterns: [
      {
      from: path.resolve(__dirname, 'src/assets'),
      to: path.resolve(__dirname, 'build/assets'),
      },
      // '_redirects',
    ],
    }),
    new MiniCssExtractPlugin({
    filename: '[name].css',
    }),
    new ESLintWebpackPlugin(),
  ],
  output: { path: path.join(__dirname, "build"), filename: "[name].js" },
};
