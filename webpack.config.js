const {
  addPlugins, createConfig, defineConstants, entryPoint,
  env, setOutput, sourceMaps,
} = require('@webpack-blocks/webpack2');

const html = require('webpack-blocks-html');
const babel = require('@webpack-blocks/babel6');
const devServer = require('@webpack-blocks/dev-server2');
const { productionPlugins } = require('./webpack.plugins');

module.exports = createConfig([
  setOutput('./dist/bundle.js'),
  babel(),
  html({ template: 'templates/index.html' }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
  }),
  env('development', [
    entryPoint('./src/index.dev.js'),
    sourceMaps(),
    devServer(),
  ]),
  env('production', [
    entryPoint('./src/index.js'),
    addPlugins(productionPlugins),
  ]),
]);
