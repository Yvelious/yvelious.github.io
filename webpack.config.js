const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const isProd = process.env.NODE_ENV === "production";
const isDevServer = process.env.NODE_ENV === "server";

const getCssFilename = (isProd, chunkName) => {
    if (isProd) {
        // needs because a stringed case created main instead of enhance
        if (chunkName === 'main') {
            return 'enhanced.[contenthash].css';
        }
    }
    return '[name].css';
};

class optimizedCriticalandEnhancedCSSPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('InlineCriticalCSSPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
                'InlineCriticalCSSPlugin',
                (data) => {
                    // get a source of critical CSS
                    const criticalCSS = compilation.assets['critical.css']
                        ? compilation.assets['critical.css'].source()
                        : '';

                    // create tag <style> with critical CSS
                    const inlineStyleTag = {
                        tagName: 'style',
                        voidTag: false,
                        attributes: {
                            type: 'text/css',
                            id: 'critical-css',
                        },
                        innerHTML: criticalCSS,
                    };

                    // remove a link to critical CSS
                    data.assetTags.styles = data.assetTags.styles.filter(tag =>
                        !tag.attributes?.href?.includes('critical')
                    );
                    data.assetTags.styles = data.assetTags.styles.map(tag => {
                            if (/^enhanced.*\.css$/i.test(tag.attributes?.href)) {
                                tag.attributes.rel = 'preload';
                                tag.attributes.as = 'style';
                                tag.attributes.onload = "this.onload=null;this.rel='stylesheet'";
                            }
                            return tag;
                        }
                    );

                    // add inline CSS inside <head>
                    data.assetTags.styles.unshift(inlineStyleTag);
                    return data;
                }
            );
        });
    }
}

module.exports = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? false : 'source-map', // Setting up source maps for faster debugging
    entry: {
        main: './src/main.js',
        preloader: './src/js/_preloader.js',
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
                    ...(isProd ? [{
                        loader: 'postcss-loader', // connect PostCSS
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-import'),
                                    require('autoprefixer')(
                                        {
                                            overrideBrowserslist: ['last 2 versions', '> 1%'], // Настройка браузеров
                                        }
                                    ),
                                    require('postcss-preset-env'),
                                ],
                            },
                        },
                    }] : []),
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
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            favicon: './i/favicon.ico',
            inject: true,
            chunks: ['preloader', 'main'],
        }),
        new HtmlInlineScriptPlugin({
            scriptMatchPattern: [/preloader\..*\.js$/],
        }),
        ...(isProd ? [new optimizedCriticalandEnhancedCSSPlugin()] : []),
        ...(!isDevServer ? [
            new MiniCssExtractPlugin({
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
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        runtimeChunk: 'single',
        minimizer: [
            `...`, // Extend Webpack's default JS minimizes
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
                    priority: 2,
                },
                enhanced: {
                    name: 'enhanced', // For separating enhanced.scss
                    test: /enhanced\.scss$/,
                    chunks: 'all',
                    enforce: false, // Force creating a separate bundle
                    priority: 1,
                },
                default: false,
            },
        },
    },
    stats: {
        warnings: false, // Disable warnings in the console
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
            watch: true,
        },
        compress: true,
        port: 3000,
        hot: true,
        liveReload: true,
        watchFiles: {
            paths: ['index.html'],
        },
        headers: {
            'Cache-Control': 'no-store', // Disable caching
        },
        client: {
            overlay: false, // disable overlay with errors and warnings in the browser
        },
    },
    performance: isProd ? {
        hints: 'warning',
        maxEntrypointSize: 512000,    // 500KB
        maxAssetSize: 512000          // 500KB
    } : false
};