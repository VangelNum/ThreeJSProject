/* Определяет конфигурацию webpack для производственной сборки, включая оптимизации и плагины,
направленные на улучшение производительности и качества сборки для развертывания в продакшене. */

const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfiguration, {
    mode: 'production',
    plugins: [new CleanWebpackPlugin()],
});
