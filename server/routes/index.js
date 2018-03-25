import express from 'express';
import multer from 'multer';
import { centerControllers, eventControllers, userControllers, logControllers } from '../controllers';
import { centerMiddlewares, eventMiddlewares, userMiddlewares, cleanData } from '../middlewares/';
import app from '../index';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'client', 'images'),

  filename: (req, file, cb) => {
    console.log("Multer called");
    if (!req.centerImagePropArray) {
      req.centerImagePropArray = [];
    }
    
    let [originalName, imageProp, ext] = [file.originalname.toLowerCase(), {}];

    if (file.mimetype === 'image/jpeg') {
      ext = '.jpeg';
    } else if (file.mimetype === 'image/jpg') {
      ext = '.jpg';
    } else if (file.mimetype === 'image/png') {
      ext = '.png';
    }

    originalName = originalName.slice(0, originalName.lastIndexOf('.'));
    [imageProp.description, imageProp.path] = [originalName, new Date().getTime().toString()];
    for(let i = 0; i < originalName.length; i++) {
      if (originalName[i] === " "){
        continue;
      } else if (i === 0 || originalName[i - 1] === " ") {
        imageProp.path += originalName[i].toUpperCase();
      } else {
        imageProp.path += originalName[i];
      }
      
      if (imageProp.path.length === 51) {
        imageProp.path = imageProp.path.slice(0, 50);
        break;
      }
    }
    imageProp.path += ext;
    
    req.centerImagePropArray.push(imageProp);
    cb(null, imageProp.path);    
  },
});


const fileFilter = (req, file, cb) => {
  console.log("Filter called!!! => ", file);
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter});


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to EM api',
    status: true,
  });
});

// user routes
router.post('/users/signup/', cleanData, userMiddlewares.validateUserFields, userControllers.createUser);
router.post('/users/signin/', cleanData, userControllers.signIn);
router.put('/users/', cleanData, userMiddlewares.validateToken, userControllers.modifyUser);
router.delete('/accounts/', cleanData, userMiddlewares.validateToken, userControllers.deleteAccount);
router.get('/users/', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, userControllers.getAllUsers);

// add admin
router.post('/users/admin', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, userMiddlewares.validateUserFields, userControllers.createUser);

// centers routes
router.post('/centers/', upload.array('file'), cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.createCenter);
router.put('/centers/:centerId', upload.array('file'), cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.modifyCenter);
router.get('/centers/:centerId', cleanData, userMiddlewares.determineUser, centerControllers.getCenter);
router.delete('/centers/:centerId', cleanData, userMiddlewares.validateToken, userMiddlewares.isAdmin, centerControllers.deleteCenter);
router.get('/centers/', cleanData, userMiddlewares.determineUser, centerControllers.getAllCenters);

// event routes
router.post('/events/', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.createEvent);
router.put('/events/:eventId', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.modifyEvent);
router.get('/events/:eventId', cleanData, userMiddlewares.validateToken, eventControllers.getEvent);
router.delete('/events/:eventId', cleanData, userMiddlewares.validateToken, eventControllers.deleteEvent);
router.get('/events/', cleanData, userMiddlewares.validateToken, eventMiddlewares.validateEventFields, eventControllers.getAllEvents);

// log routes
router.get('/logs/', cleanData, userMiddlewares.validateToken, logControllers.getAllLogs);

export default router;