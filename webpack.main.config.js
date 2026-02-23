const mainConfig = require('@electron-forge/template-webpack/webpack.main.config');

mainConfig.externals = {
  ...(mainConfig.externals || {}),
  'get-port': 'commonjs get-port'
};

module.exports = mainConfig;