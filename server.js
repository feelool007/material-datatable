var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')

config.devtool = 'cheap-module-eval-source-map'
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(express.static('examples'))

app.listen(8080, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(`...running 🏃🏿 🏃🏻 `);
  console.log('🌏 Listening at http://localhost:8080  👏 👏 👌 ');
})