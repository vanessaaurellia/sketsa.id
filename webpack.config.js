const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    mode: "development",
    target: 'node',
    entry: "./app.js",
    output: {
      path: __dirname, 
      filename: 'bundle.js'
    },
    resolve: {
      alias: {
        Modules: path.resolve(__dirname, 'node_modules/'),
        Routes: path.resolve(__dirname, 'routes/')
      },
    }
};