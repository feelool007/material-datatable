const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./examples/src/index",
  output: {
    filename: "bundle.js",
    path: path.resolve("./examples/")
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /.jsx$|.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader", options: { presets: ["@babel/preset-react", "@babel/preset-env"] } }
      }
    ]
  },
  devServer: {
    port: 8080
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./examples/index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
};
