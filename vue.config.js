const webpack = require('webpack')
const path = require('path')

module.exports = {
  configureWebpack: {
   plugins: [
     new webpack.ContextReplacementPlugin(
       /\@angular(\\|\/)core(\\|\/)esm5/,
       path.join(__dirname, './src'))
   ]
 }
}
