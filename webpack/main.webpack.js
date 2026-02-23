const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.d.ts']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
  externals: {
    'platform-folders': 'commonjs platform-folders',
    'get-port': 'commonjs get-port'
  },
}