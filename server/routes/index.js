import { createEvent, modifyEvent, getEvent, deleteEvent, getAllEvents } from '../controllers/events';
import { createCenter, modifyCenter, allCenters, getCenter, deleteCenter } from '../controllers/centers';
import { createUser, signIn } from '../controllers/users';
import { cleanData } from '../middlewares/';

import app from './../../index';

module.exports = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to EM api',
      status: true,
    });
  });

  // users route
  app.post('/api/v1/users/signup/', cleanData, createUser);
  // app.post('/api/v1/users/signin/', cleanData, validateUserSigninFields, signIn);

  // // centers route
  // app.post('/api/v1/centers/', cleanData, ensureFound, ensureSameUser, validateCreateCenterFields, createCenter);
  // app.put('/api/v1/centers/:centerId', cleanData, ensureFound, ensureSameUser, modifyCenter);
  // app.get('/api/v1/centers/:centerId', cleanData, getCenter);
  // app.delete('/api/v1/centers/:centerId', cleanData, ensureFound, ensureSameUser, deleteCenter);
  // app.get('/api/v1/centers/', cleanData, ensureFound, ensureSameUser, allCenters);

  // // event route
  // app.post('/api/v1/events/', cleanData, ensureFound, ensureSameUser, validateTime, validateEventFields, createEvent);
  // app.put('/api/v1/events/:eventId', cleanData, ensureFound, ensureSameUser, validateTime, modifyEvent);
  // app.get('/api/v1/events/:eventId', cleanData, ensureFound, ensureSameUser, getEvent);
  // app.delete('/api/v1/events/:eventId', cleanData, ensureFound, ensureSameUser, deleteEvent);
  // app.get('/api/v1/events/', cleanData, ensureFound, ensureSameUser, getAllEvents);
};
