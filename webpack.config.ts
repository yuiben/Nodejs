
const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ["webpack/hot/poll?100", "./src/index.ts"],
  watch: true,
  target: "node",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: ["/node_modules/", "/tests"]
      }
    ]
  },
  mode: "development",
  devtool: 'inline-source-map',
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".env"]
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new RunScriptWebpackPlugin({ 
      name: "index.js"
    })
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  },
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"]
    })
  ]
};