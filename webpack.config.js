const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src") + "/scripts/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  resolve: { extensions: [".js"] },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src") + "/index.html",
      filename: path.resolve(__dirname, "dist") + "/index.html",
    }),
    new ESLintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src") + "/assets",
          to: path.resolve(__dirname, "dist") + "/assets",
        },
      ],
    }),
  ],
};
