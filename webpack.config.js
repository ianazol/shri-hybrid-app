const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env, argv) {
    const isProduction = env.production === true;

    return {
        entry: './src/index.js',
        output: {
            filename: './www/js/bundle.js'
        },
        devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /(\.js|\.jsx)$/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, "node_modules/react-onsenui/src/components/"),
                        path.resolve(__dirname, "src/")
                    ],
                    query: {
                        presets: ['react', 'es2015']
                    }
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: (isProduction === true),
                            }
                        }, {
                            loader: 'postcss-loader',
                        }]
                    })
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: (isProduction === true),
                                sourceMap: (isProduction === false)
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: (isProduction === false)
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: (isProduction === false)
                            }
                        }]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: '/www/css/style.css',
                allChunks: true,
            })
        ]
    }
}