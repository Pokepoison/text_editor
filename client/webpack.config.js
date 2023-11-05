const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files for your entry points
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),
      // Generate a Web App Manifest file
      new WebpackPwaManifest({
        name: 'Your PWA Name',
        short_name: 'PWA',
        description: 'Your PWA description',
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      // Configure Workbox to inject a service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        // Add CSS loaders
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        // Add Babel for JavaScript transpilation
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};