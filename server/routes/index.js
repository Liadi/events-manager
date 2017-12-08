import { createEvent, modifyEvent, getEvent, deleteEvent, getAllEvents } from '../controllers/events';
import { createCenter, modifyCenter, getAllCenters, getCenter, deleteCenter } from '../controllers/centers';
import { createUser, signIn } from '../controllers/users';
import { cleanData, validateToken, isAdmin, determineUser, validateUserFields, validateEventFields } from '../middlewares/';

import app from './../../index';

module.exports = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to EM api',
      status: true,
    });
  });

  // users route
  app.post('/api/v1/users/signup/', cleanData, validateUserFields, createUser);
  app.post('/api/v1/users/signin/', cleanData, signIn);
  // add admin
  app.post('/api/v1/users/', cleanData, validateToken, isAdmin, validateUserFields, createUser); 

  // centers route
  app.post('/api/v1/centers/', cleanData, validateToken, isAdmin, createCenter);
  app.put('/api/v1/centers/:centerId', cleanData, validateToken, isAdmin, modifyCenter);
  app.get('/api/v1/centers/:centerId', cleanData, determineUser, getCenter);
  app.delete('/api/v1/centers/:centerId', cleanData, validateToken, isAdmin, deleteCenter);
  app.get('/api/v1/centers/', cleanData, validateToken, getAllCenters);

  // event route
  app.post('/api/v1/events/', cleanData, validateToken, validateEventFields, createEvent);
  app.put('/api/v1/events/:eventId', cleanData, validateToken, validateEventFields, modifyEvent);
  app.get('/api/v1/events/:eventId', cleanData, validateToken, getEvent);
  app.delete('/api/v1/events/:eventId', cleanData, validateToken, deleteEvent);
  app.get('/api/v1/events/', cleanData, validateToken, getAllEvents);  

  // other routes (404)
  app.all('*', (req, res) => {
    res.status(404).json({
      message: 'request not found, wrong url',
      status: false,
    });
  });
};
