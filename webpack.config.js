const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LwcWebpackPlugin = require('lwc-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV !== 'production' ? 'inline-source-map' : 'nosources-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve('./', 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.html'],
        alias: {
            "@salesforce/apex/TodoAppService.todoWireAdapter": path.resolve(__dirname, 'mocks/todoWireAdapter.js')
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     // Unignore @lwc to properly load sourcemaps for @lwc/synthetic-shadow and @lwc/engine-dom
            //     exclude: /node_modules\/(?!@lwc)(.*)/, 
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // },
            // {
            //     test: /\.html$/,
            //     exclude: /index\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //     },
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ],
                exclude: [ /node_modules/, /force-app/ ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/resources/', to: 'resources' }
            ]
        }),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html',
            minify: false,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: {
                source: false
            }
        }),
        new LwcWebpackPlugin(),
    ],
    devServer: {
        liveReload: true,
        compress: true,
        port: 9000,
        open: false
    }
};