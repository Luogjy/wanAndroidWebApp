'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const axios = require('axios');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // 【接口代理（原理是本地服务器向远程服务器请求）】
    before(app) {
      app.get('/api/getArticleList'/* 代理接口 */, function (req, res) {
        const url = req.query.url; // 通过参数把真正的url带过来用，嗯，没毛病
        axios.get(url, {
          headers: {},
          // params: req.query // 地址携带的参数
        }).then((response) => {
          // console.log(response); // response是本次请求返回的整个响应数据，包含状态码status
          res.json(response.data); // 只要响应体，这里是json
        }, (err) => { // 例如 Error: Request failed with status code 404
        }).catch((e) => { // 捕获应用错误
          console.log(e);
        });
      });

      app.get('/api/getBannerList', function (req, res) {
        const url = req.query.url;
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });

      app.get('/api/getTechnologySystem', function (req, res) {
        const url = req.query.url;
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });

      app.get('/api/getArticleListByTechnologySystem', function (req, res) {
        const url = req.query.url;
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });

      app.get('/api/getProjectTree', function (req, res) {
        const url = req.query.url;
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });

      app.get('/api/getProjectList', function (req, res) {
        const url = req.query.url;
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });

      app.get('/api/getAuthorArticleList', function (req, res) {
        /*
        把url当参数传过来使用，如果其中有中文(参数为用户昵称，可能出现中文)，这么直接作为url会发送请求失败(Chrome会出现Provisional headers are shown)，
        所以要先把它进行URI编码
        */
        const url = encodeURI(req.query.url);
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });

      app.get('/api/getNavDatas', function (req, res) {
        const url = req.query.url;
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });

      app.get('/api/getOftenVisitWebsiteList', function (req, res) {
        const url = req.query.url;
        axios.get(url, {
          headers: {},
        }).then((response) => {
          res.json(response.data);
        }, (err) => {
        }).catch((e) => {
          console.log(e);
        });
      });
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }));

      resolve(devWebpackConfig);
    }
  });
});
