const webpack = require('webpack')
const path = require('path')
const pattern =  /\@angular(\\|\/)core(\\|\/)fesm5/
const sourceDirectory = path.join(__dirname, 'src')

module.exports = {
  configureWebpack: {
      plugins: [
        new webpack.ContextReplacementPlugin(pattern, sourceDirectory)
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
