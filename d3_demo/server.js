var config = require('./webpack.server.config');
var WebpackDevServer = require('webpack-dev-server');
var port = 8080;
var ip = 'localhost';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}).listen(port, ip, function (err) {
    if(err) {
        return console.log(err);
    }

    console.log('Listening at ' + ip + ':' + port);
});