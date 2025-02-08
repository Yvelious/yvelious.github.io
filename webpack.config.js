const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const InlineCriticalCSSPlugin = require('./InlineCriticalCSSPlugin'); // Укажите путь к файлу плагина

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isDevServer = process.env.NODE_ENV === "server";

const getCssFilename = (isProd, chunkName) => {
    if (isProd) {
        if (chunkName === 'main') {
            return 'critical.css';
        }
        return '[name].[contenthash].css';
    }
    return '[name].css';
};

class InlineCriticalCSSPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('InlineCriticalCSSPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
                'InlineCriticalCSSPlugin',
                (data) => {
                    // Получаем критический CSS из ассетов
                    const criticalCSS = compilation.assets['critical.css']
                        ? compilation.assets['critical.css'].source()
                        : '';

                    // Создаем тег <style> с критическим CSS
                    const inlineStyleTag = {
                        tagName: 'style',
                        voidTag: false,
                        attributes: { type: 'text/css' },
                        innerHTML: criticalCSS,
                    };

                    // Фильтруем теги, исключая <link href="critical.css">
                    data.assetTags.styles = data.assetTags.styles.filter(tag =>
                        !tag.attributes?.href?.includes('critical.css')
                    );

                    // Добавляем инлайн-стили в теги <head>
                    data.assetTags.styles.push(inlineStyleTag);

                    return data;
                }
            );
        });
    }
};

module.exports = {
    mode: isProd ? "production" : "development",
    devtool: 'source-map', // Setting up source maps for faster debugging
    entry: {
        main: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
        sourceMapFilename: 'maps/[file].map',
        clean: true
    },
    resolve: {
        alias: {
            '@i': path.resolve(__dirname, 'i/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
            '@img': path.resolve(__dirname, 'src/assets/bootstrap/img/'),
        },
        extensions: ['.js'], // Specify only js file extension
    },

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDevServer ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: isProd ? 'assets/fonts/[name][ext][query]' : 'assets/fonts/[name][ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: isProd ? 'i/[name][hash][ext]' : 'i/[name][ext]',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',     // for ES6+ support
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true,
        }),
        ...(isProd ? [new InlineCriticalCSSPlugin()] : []),
        ...(!isDevServer ? [
            new MiniCssExtractPlugin({
                // filename: isProd ? "[name].[contenthash].css" : "[name].css",
                filename: (pathData) => getCssFilename(isProd, pathData.chunk.name),

            })] : []),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate, // Specify the optimization method
                options: {
                    // Now specify optimizers via "presets"
                    plugins: [
                        ["imagemin-mozjpeg", {quality: 75}], // JPEG compression
                        ["imagemin-pngquant", {quality: [0.65, 0.9]}], // PNG
                        [
                            "imagemin-svgo",
                            {
                                plugins: [
                                    {
                                        name: "preset-default",
                                        params: {
                                            overrides: {
                                                removeViewBox: false, // Do not remove the viewBox property in SVG
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'i'), // Folder with images in the source
                    to: 'i', // Target folder in dist
                },
                {
                    from: path.resolve(__dirname, 'src/assets/js'), // Folder with scripts in the source
                    to: 'assets/js', // Target folder in dist
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            `...`, // Extend Webpack's default JS minimizers
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false, // Remove comments
                    },
                },
                extractComments: false, // Do not output separate files with comments
            }),
            new CssMinimizerPlugin(), // Minimize CSS

        ], // CSS minimization is enabled by default in Webpack 5
        splitChunks: {
            cacheGroups: {
                critical: {
                    name: 'critical', // For separating critical.scss
                    test: /critical\.scss$/,
                    chunks: 'all',
                    enforce: false, // Force creating a separate bundle
                },
                enhanced: {
                    name: 'enhanced', // For separating enhanced.scss
                    test: /enhanced\.scss$/,
                    chunks: 'all',
                    enforce: false, // Force creating a separate bundle
                },
                default: false,
            },
        },
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        hot: true, // 🔥 Enable HMR!
        liveReload: false, // DISABLE liveReload as it reloads the page
        watchFiles: ['src/**/*.{html,js,scss}'],
        open: true,
    },
};