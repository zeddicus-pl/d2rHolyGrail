const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: require('./rules.webpack'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // the "./stream" is a hack, for some reason for the "stream" webpack config if outputs files
        // one directory up in the filesystem and I don't know how to fix this
        // By outputing it to ""./stream" it outputs to root of "stream" public files and to "/stream" in "main_window"
        // public files
        { context: "./public/fonts", from: "*.woff2", to: "./stream" },
      ],
    }),
  ],
}