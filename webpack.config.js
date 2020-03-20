const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDevMode = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };
  if (!isDevMode) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config;
};

const filename = ext => isDevMode ? `[name].${ext}` : `[name].[hash].${ext}`;

const jsLoaders = (isDevMode) => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
              // debug: true
            }
          ]
        ]
      }
    }
  ];

  if (isDevMode) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'), // Путь откуда вебпак должен начинать смотреть
  //mode: 'development', // можно установить через --mode в scripts
  entry: {
    main: ['@babel/polyfill', './js/index.js'],
    analytics: './js/analytics.js'
  },
  output: {
    filename: 'js/' + filename('js'),
    path: path.resolve(__dirname, 'build'),  // Папка куда все ляжет на выходе
  },
  optimization: optimization(),
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 4200,
    // hot: isDevMode
  },
  devtool: isDevMode ? 'source-map' : '',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDevMode,
        removeComments: !isDevMode,
        removeRedundantAttributes: !isDevMode,
        removeScriptTypeAttributes: !isDevMode,
        removeStyleLinkTypeAttributes: !isDevMode,
        useShortDoctype: !isDevMode
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      moduleFilename: ({name}) => `css/${name}.css`
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(isDevMode)
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevMode,
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: filename('[ext]'),
          outputPath: 'assets/images'
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: filename('[ext]'),
          outputPath: 'assets/fonts'
        },
      }
    ]
  },

//Vue:
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: isDevMode ? 'vue/dist/vue.common.dev' : 'vue/dist/vue.min'
    }
  }
};