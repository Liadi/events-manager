// const centersController = require('../controllers').centers;
// const evenr

// module.exports = (app) => {
//   app.get('/api', (req, res) => res.status(200).send({
//     message: 'Welcome to EM API!',
//   }));

//   app.post('/api/center', centersController.test);
// };

import {createEvent} from '../controllers/events';
import {createUser, empty} from '../controllers/users';
import {cleanData, validateCreateUserFields} from '../controllers/middleware';

import app from './../../index';

module.exports = (app) => {

  // //create a new event
  // app.post('/api/v1/events', createEvent);

  // create a new user account 

  app.get('/api/v1/', (req, res) => 
  {
    res.status(200).send({
      message: 'Welcome to EM api',
      status: true
    });
  });
  
  app.post('/api/v1/users', cleanData, validateCreateUserFields, createUser);
}