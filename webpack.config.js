const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

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
        use: ["babel-loader"],
      },
    ],
  },
  resolve: { extensions: [".js"] },
  plugins: [new ESLintPlugin()],
};
