// forge.config.js
const path = require('path');

// Be flexible about how the plugin exports itself across versions
let WebpackPlugin = require('@electron-forge/plugin-webpack');
if (WebpackPlugin && WebpackPlugin.default) {
  WebpackPlugin = WebpackPlugin.default;            // default export style
  WebpackPlugin.mainConfig = path.resolve(__dirname, './webpack.main.config.js');
  WebpackPlugin.renderer = {
    config: path.resolve(__dirname, './webpack.renderer.config.js'),
  };
} else if (WebpackPlugin && WebpackPlugin.WebpackPlugin) {
  WebpackPlugin = WebpackPlugin.WebpackPlugin;      // named export style
}

module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [],
  plugins: [
    new WebpackPlugin({
      mainConfig: path.resolve(__dirname, './webpack/main.webpack.js'),
      renderer: {
        config: path.resolve(__dirname, './webpack/renderer.webpack.js'),
        entryPoints: [
          {
            html: './public/index.html',
            js: './src/index.tsx',
            name: 'main_window',
            preload: { js: './electron/bridge.ts' },
          },
          {
            html: './src/stream/index.html',
            js: './src/stream/stream.tsx',
            name: 'stream',
          },
        ],
      },
    }),
  ],
};