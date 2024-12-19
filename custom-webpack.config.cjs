const webpack = require('webpack');

module.exports = {
    // ... autres configurations de webpack ...
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        process: require.resolve('process/browser')
      }
    },

    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  };

  