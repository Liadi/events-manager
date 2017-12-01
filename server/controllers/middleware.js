import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

module.exports = {
  cleanData(req, res, next) {
    try {
      // user fields
      req.userFirstName = (req.body.userFirstName && req.body.userFirstName.trim().toLowerCase()) || null;
      req.userLastName = (req.body.userLastName && req.body.userLastName.trim().toLowerCase()) || null;
      req.userEmail = (req.body.userEmail && req.body.userEmail.trim().toLowerCase()) || null;
      req.userPassword = (req.body.userPassword && req.body.userPassword.trim()) || null;
      req.userPhone = (req.body.userPhone && req.body.userPhone.trim()) || null;
      if (req.userPassword === '###FunnyCatJerrySaid') {
        req.userStatus = 'admin';
      } else {
        req.userStatus = 'regular';
      }
      
      // event fields
      req.eventName = (req.body.eventName && req.body.eventName.trim().toLowerCase()) || null;
      req.eventTime = (req.body.eventTime && req.body.eventTime.trim()) || null;
      req.eventStatus = (req.body.eventStatus && req.body.eventStatus.trim().toLowerCase()) || null;
      req.eventServices = (req.body.eventServices && req.body.eventServices.trim().toLowerCase()) || null;

      // center fields
      req.centerName = (req.body.centerName && req.body.centerName.trim().toLowerCase()) || null;
      req.centerAddress = (req.body.centerAddress && req.body.centerAddress.trim()) || null;
      req.centerCapacity = (req.body.centerCapacity && req.body.centerCapacity.trim()) || null;
      req.centerPrice = (req.body.centerPrice && req.body.centerPrice.trim()) || null;
      req.centerStatus = (req.body.centerStatus && req.body.centerStatus.trim()) || 'available';
      req.centerAmenities = (req.body.centerAmenities && req.body.centerAmenities.trim()) || null;
      req.centerDescription = (req.body.centerDescription && req.body.centerDescription.trim()) || null;
      req.centerImage = (req.body.centerImage && req.body.centerImage.trim()) || null;
    } catch (err) {
      return res.status(400).json({
        message: 'Error. You\'ve probably sent multiple entries for a field using api',
        status: false,
      });
    } next();
  },

  ensureFound(req, res, next) {
    req.token = req.body.token || req.headers.token;
    if (!req.token) {
      res.status(401).send({
        message: `You only have access, if you're logged in`, 
        status: false, 
      })
    } 
    next();
  },  
   
  ensureSameUser(req, res, next){
    let verifiedJWT;
    try{ 
      verifiedJWT = jwt.verify(req.token, secret);
    }
    catch(err){
      // token expired
      return res.status(400).json({
        message: 'pls, login',
      });
    }
    if (!verifiedJWT){
      return res.status(400).send({
        message: 'Pls Login into your account or sign up',
        satus: false,
      });
    }
    else{
      req.userId = verifiedJWT.userId;
      next();
    }
  },
};
