import { centerControllers, eventControllers, userControllers } from '../controllers';
import { centerMiddlewares, eventMiddlewares, userMiddlewares, cleanData } from '../middlewares/';
import app from '../index';

module.exports = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to EM api',
      status: true,
    });
  });

  // users route
  app.post('/api/v1/users/signup/', cleanData, userMiddlewares.validateUserFields, userControllers.createUser);
  app.post('/api/v1/users/signin/', cleanData, userControllers.signIn);
  // add admin
  app.post('/api/v1/users/admin', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, userMiddlewares.validateUserFields, userControllers.createUser);

  // centers route
  app.post('/api/v1/centers/', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.createCenter);
  app.put('/api/v1/centers/:centerId', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.modifyCenter);
  app.get('/api/v1/centers/:centerId', cleanData, userMiddlewares.determineUser, centerControllers.getCenter);
  app.delete('/api/v1/centers/:centerId', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.deleteCenter);
  app.get('/api/v1/centers/', cleanData, userMiddlewares.validateToken, centerControllers.getAllCenters);

  // event route
  app.post('/api/v1/events/', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.createEvent);
  app.put('/api/v1/events/:eventId', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.modifyEvent);
  app.get('/api/v1/events/:eventId', cleanData, userMiddlewares.validateToken, eventControllers.getEvent);
  app.delete('/api/v1/events/:eventId', cleanData, userMiddlewares.validateToken, eventControllers.deleteEvent);
  app.get('/api/v1/events/', cleanData, userMiddlewares.validateToken, eventControllers.getAllEvents);

  // other routes (404)
  app.all('*', (req, res) => {
    res.status(404).json({
      message: 'request not found, wrong url',
      status: false,
    });
  });
};
