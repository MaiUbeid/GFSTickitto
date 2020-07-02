const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  ['use-babel-config', '.babelrc'],
  (config) => {
    const newConfig = config;
    let rule = newConfig.module.rules.find((rule) => rule.oneOf);
    const paletteLess = fs.readFileSync(
      './src/styles/less/variables.less',
      'utf8'
    );

    const variables = lessToJs(paletteLess);

    const options = {
      antDir: path.join(__dirname, './node_modules/antd'),
      stylesDir: path.join(__dirname, './src/styles/less'),
      varFile: path.join(__dirname, './src/styles/less/variables.less'),
      mainLessFile: path.join(__dirname, './src/styles/less/index.less'),
      themeVariables: Object.keys(variables),
      indexFileName: 'index.html',
      generateOnce: true,
    };

    const themePlugin = new AntDesignThemePlugin(options);
    /*
      this is inserted right before the scss compilation, 
      so that our custom styles sit after the antd ones and have higher specicifity by default
    */
    rule.oneOf.splice(6, 0, {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader, //To have cleaner dev antd css remove this for production env build, use style-loader instead
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: variables,
          },
        },
      ],
    });
  
    newConfig.plugins.push(themePlugin);

    //To have cleaner dev antd css remove this for production env build
    newConfig.plugins.push( new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name]antdcoloroverrides.[contenthash:8].css',
      chunkFilename: 'static/css/[name]antdcoloroverrides.[contenthash:8].chunk.css',
    }))
    return newConfig;
  },
];
