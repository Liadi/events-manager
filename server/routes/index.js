import express from 'express';
import { centerControllers, eventControllers, userControllers, logControllers } from '../controllers';
import { centerMiddlewares, eventMiddlewares, userMiddlewares, cleanData } from '../middlewares/';
import app from '../index';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to EM api',
    status: true,
  });
});

// users route
router.post('/users/signup/', cleanData, userMiddlewares.validateUserFields, userControllers.createUser);
router.post('/users/signin/', cleanData, userControllers.signIn);
router.put('/users/', cleanData, userMiddlewares.validateToken, userMiddlewares.validateUserFields, userControllers.modifyUser);

// add admin
router.post('/users/admin', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, userMiddlewares.validateUserFields, userControllers.createUser);

// centers route
router.post('/centers/', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.createCenter);
router.put('/centers/:centerId', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.modifyCenter);
router.get('/centers/:centerId', cleanData, userMiddlewares.determineUser, centerControllers.getCenter);
router.delete('/centers/:centerId', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.deleteCenter);
router.get('/centers/', cleanData, userMiddlewares.determineUser, centerControllers.getAllCenters);

// event route
router.post('/events/', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.createEvent);
router.put('/events/:eventId', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.modifyEvent);
router.get('/events/:eventId', cleanData, userMiddlewares.validateToken, eventControllers.getEvent);
router.delete('/events/:eventId', cleanData, userMiddlewares.validateToken, eventControllers.deleteEvent);
router.get('/events/', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.getAllEvents);

// log
router.get('/logs/', cleanData, userMiddlewares.validateToken, logControllers.getAllLogs);

export default router;
