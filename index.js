import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';


const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);


// app.get('*', (req, res) => {
//   res.status(200).send({
//     message: 'Welcome to EM!',
//     status: true
//   });
// });
const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port, () => console.log('App running!'));

module.exports = app;