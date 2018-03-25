import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes'
import path from 'path';

const dist = path.join(__dirname, '');
const app = express();


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
console.log(process.cwd());
if (app.get('env') === 'development'){
  const config = require('../webpack.config.js');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
}

app.use(morgan('dev'));
app.use(express.static('dist'));

if (app.get('env') === 'development'){
  app.use(express.static('client'));
} else if (app.get('env') === 'production') {
  app.use(express.static('dist/client'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, '../client/index.html'));
});

// other routes (404)
app.all('*', (req, res) => {
  res.status(404).json({
    message: 'request not found, wrong url',
    status: false,
  });
});

module.exports = app;