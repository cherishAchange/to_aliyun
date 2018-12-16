const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPligin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  mode: "development",
	entry: {
    main: "./src/index.js",
	},
	output: {
    path: path.resolve(__dirname, '/dist'),
    filename: "[name]-[hash:8].js",
    publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loaders: ["babel-loader"],
        exclude: /node_modules/, 
      },
      {
        test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
        include: [
          /src/,
          '/node_modules/antd/dist/'   //增加此项
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              namedExport: true,
              camelCase: true,
              minimize: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                require('postcss-import')(),
                require('autoprefixer')({
                  browsers: ['last 15 versions'],
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              // modifyVars: themeVariables,
            },
          }],
          fallback: 'style-loader',
        }),
      }
    ]
  },
  // devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('./src'),
    hot: true,
    inline: true,
    host: 'localhost',
    open: false,
    port: 8008,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        lib: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: 'lib',
          chunks: 'all',
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPligin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: '上传照片',
      template: './src/index.html',
      filename: 'index.html',
      hash: true
    })
  ]
}
