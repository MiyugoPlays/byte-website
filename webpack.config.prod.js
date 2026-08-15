const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'data', to: 'data' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'js/receita.js', to: 'js/receita.js' },
        { from: 'js/receitas.js', to: 'js/receitas.js' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'receita.html', to: 'receita.html' },
        { from: 'receitas.html', to: 'receitas.html' },
        { from: 'sobre.html', to: 'sobre.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
