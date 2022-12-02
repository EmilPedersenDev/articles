const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  entry: './src/server.ts',
  mode: NODE_ENV,
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  watch: NODE_ENV === 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['npm run dev'],
        parallel: true,
      },
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: 'models', to: 'models' }],
    // }),
  ],
};
