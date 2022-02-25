const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.d.ts']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "bin/*.jar", to: "." },
      ],
    }),
  ],
}