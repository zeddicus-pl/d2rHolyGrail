module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.d.ts']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  }
}