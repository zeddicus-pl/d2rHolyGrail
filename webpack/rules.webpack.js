module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    exclude: /node_modules\/get-port/,
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules\/(?!(d2-holy-grail)\/).*/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-url-loader',
      },
    ],
  },
  {
    test: /\.mp3$/,
    loader: 'file-loader'
  },
  {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  },
]