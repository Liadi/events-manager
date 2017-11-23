import {createEvent} from '../controllers/events';
import {createUser, empty, signIn} from '../controllers/users';
import {cleanData, validateCreateUserFields, validateUserSigninFields} from '../controllers/middleware';

import app from './../../index';

module.exports = (app) => {
  app.get('/api/v1/', (req, res) => 
  {
    res.status(200).send({
      message: 'Welcome to EM api',
      status: true
    });
  });
  
  app.post('/api/v1/users/signup', cleanData, validateCreateUserFields, createUser);
  app.post('/api/v1/users/signin', cleanData, validateUserSigninFields, signIn);

}