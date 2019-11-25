'use strict'

const path = require('path');
const webpack = require('webpack')
// 压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 分析体积大小插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 检查当前环境：npm run serve 默认是dev;build时默认为pro，也可以自我更改；
const isProd = () => {
    return process.env.NODE_ENV === 'production';
}
// 处理路径为绝对路径
const resolve = (dir) => {
    return path.join(__dirname, './', dir);
}
const genPlugins = () => {
    const plugins = [];
    if (isProd()) {
        plugins.push(
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
                cache: true
            })
        )
    }

    // 安装jquery
    plugins.push(
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
        })
    )
    return plugins;
}


module.exports = {
    publicPath: './', // 配置为相对路径，这样打出来的包可以被部署在服务端的任意路径上，同时可以定义开发与线上路径
    outputDir: 'dist', // 默认是dist，可以不配置此项
    assetsDir: 'static', // 默认'',打包的静态资源放置位置，不配置会零散的放置在dist目录下
    indexPath: 'index.html', // 默认是idnex.html
    lintOnSave: !isProd, // 只在开发环境生效，输出编译警告，前提是你安装了对应的插件
    productionSourceMap: false, // 打包时不生成map文件，提高编译速度
    configureWebpack: () => ({ // 提供配置webpack的方法，这里的配置会被合入到webpack内
        resolve: {
            alias: {
                '@': resolve('src'),
                '@views': resolve('src/views'),
                '@assets': resolve('src/assets'),
                '@components': resolve('src/components'),

                'variable': resolve('src/assets/less/variable.less')
            }
        },
        plugins: genPlugins()
    }),
    chainWebpack: config => { // 更细粒化的修改webpack的配置
        // runtime.js 内联的形式嵌入
        config
            .plugin('preload')
            .tap(args => {
                args[0].fileBlacklist.push(/runtime\./);
                return args;
            })
        config
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )
        // plugin
        // webpack-html-plugin
        config
            .plugin('html')
            .tap(args => {
                args[0].minify = {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
                return args
            })
        config
            .when(process.env.IS_ANALYZ,
                config => config
                    .plugin('webpack-bundle-analyzer')
                    .use(BundleAnalyzerPlugin, [{
                        analyzerPort: 8888,
                        generateStatsFile: false
                    }])
            )
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
        // optimization
        // https://imweb.io/topic/5b66dd601402769b60847149
        config
            .when(process.env.NODE_ENV === 'production',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/,
                        }])
                    config
                        .optimization
                        .splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                vendors: {
                                    name: 'chunk-vendors',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // 只打包初始时依赖的第三方
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // 可自定义拓展你的规则
                                    minChunks: 3, // 最小公用次数
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: isProd() ? true : false,
        // 开启 CSS source maps?
        sourceMap: isProd() ? true : false,
        modules: false
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        }
    },
}