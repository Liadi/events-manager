import { createEvent } from '../controllers/events';
import { createCenter, modifyCenter, allCenters, getCenter, deleteCenter } from '../controllers/centers';
import { createUser, signIn } from '../controllers/users';
import {
  cleanData, validateCreateUserFields,
  validateUserSigninFields, validateCreateCenterFields,
  ensureFound, ensureSameUser, validateTime
} from '../controllers/middleware';

import app from './../../index';

module.exports = (app) => {
  app.get('/api/v1/', (req, res) => 
  {
    res.status(200).send({
      message: 'Welcome to EM api',
      status: true
    });
  });
  app.post('/api/v1/users/signup/', cleanData, validateCreateUserFields, createUser);
  app.post('/api/v1/users/signin/', cleanData, validateUserSigninFields, signIn);
  app.post('/api/v1/centers/', cleanData, ensureFound, ensureSameUser, validateCreateCenterFields, createCenter);
  app.put('/api/v1/centers/:centerId', cleanData, ensureFound, ensureSameUser, modifyCenter);
  app.get('/api/v1/centers/:centerId', cleanData, getCenter);
  app.delete('/api/v1/centers/:centerId', cleanData, ensureFound, ensureSameUser, deleteCenter);
  app.get('/api/v1/centers/', cleanData, ensureFound, ensureSameUser, allCenters);
  app.post('/api/v1/events/', cleanData, ensureFound, validateTime, ensureSameUser, createEvent);
  // app.post('/api/v1/events/', cleanData, ensureFound, )
};