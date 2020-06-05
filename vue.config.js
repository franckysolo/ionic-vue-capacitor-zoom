const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const path = require('path')
const pattern =  /\@angular(\\|\/)core(\\|\/)fesm5/
const sourceDirectory = path.join(__dirname, 'src')

module.exports = {
  configureWebpack: {
      optimization: {
         splitChunks: {
           minSize: 10000,
           maxSize: 250000,
         }
      },
      plugins: [
        new webpack.ContextReplacementPlugin(pattern, sourceDirectory),
        new BundleAnalyzerPlugin()
      ]
   },
   chainWebpack: config => {
     config.module
       .rule('angular-core-js')
       .test(/[\/\\]@angular[\/\\].+\.js$/)
       .use('cache-loader')
       .loader('cache-loader')
       .end()
       .use('babel-loader')
       .loader('babel-loader')
       .end()
       .parser({ system: true })
   }
}
