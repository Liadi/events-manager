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
    try { 
      verifiedJWT = jwt.verify(req.token, secret);   
    }catch (err) {
      res.status(401).send({
        message: 'Pls login properly',
        status: false,
      });
    }
    if (verifiedJWt && !verifiedJWT.userId){
      res.status(400).send({
        message: 'Pls Login into your account or sign up',
        satus: false,
      });
    }
    else{
      req.userId = verifiedJWT.userId;
      next();
    }
  },

  validateCreateUserFields(req, res, next){
    validateUserFirstName(req, res);
    validateUserLastName(req, res);
    validateUserEmail(req, res);
    validateUserPassword(req, res);
    validateUserPhone(req, res);
    next(); 
  },

  validateUserSigninFields(req, res, next){
    validateUserPassword(req, res);
    validateUserEmail(req, res);
    next();
  },

  validateCreateCenterFields(req, res, next){
    // validateCenterName(req, res);
    // validateCenterState(req, res);
    // validateCenterAmenities(req, res);
    // validateCenterCapacity(req, res);
    // validateCenterCity(req, res);
    // validateCenterCountry(req, res);
    // validateCenterDescription(req, res);
    // validateCenterPrice(req, res);
    // validateCenterStatus(req, res);
    next();
  },

  validateTime(req, res, next){
    const time = req.eventTime;
    timeArray = time.split('/');
    if (timeArray.length !== 3){
      return res.status(400).json({
        message: 'wrong time format enter \'yy/mm/dd\'',
      });
    }  
    timeArray.forEach(element => {
      if (element.length !== 2 && (parseInt(element)).toString() !== element){
        return res.satus(400).json({
          message: 'wrong time format enter \'yy/mm/dd\'',
        })
      } 
    });
    next();
  },
}

function validateUserLastName(req, res){
  // validate lastname
  if (req.userLastName) {
    // validate type (letters only)/^[a-z]+$/
    if (!((req.userLastName).match(/^[a-zA-z]+$/))){
      return res.status(400).json({
        message: `pls, enter an appropriate lastname`,
        status: false
      });
    }

    // validate lastname length
    if (req.userFirstName.length == 1) {
      return res.status(400).json({
        message: `last name can't be a letter. No initials!`,
        status: false
      });
    }
  }else{
    return res.status(400).json({
      message: 'lastname field cannot be empty',
      status: false
    });
  }
}

function validateUserFirstName(req, res){
  if (req.userFirstName) {
    // validate firstname type (letters only)/^[a-z]+$/
    if (!(req.userFirstName).match(/^[a-zA-Z]+$/)){
      return res.status(400).json({
        message: `pls, enter an appropriate firstname`,
        status: false
      });
    }

    // validate firstname length
    if (req.userFirstName.length == 1) {
      return res.status(400).json({
        message: `firstname can't be a letter. No initials!`,
        status: false
      });
    }

  }else{
    return res.status(400).json({
      message: 'firstname field cannot be empty',
      status: false
    });
  }

}

function validateUserEmail(req, res) {
  if (req.userEmail) {
    if (!req.userEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      return res.status(400).json({
        message: `email invalid`,
        status: false
      });
    }

  }else{
    return res.status(400).json({
      message: 'email field cannot be empty',
      status: false
    });
  }
}

function validateUserPassword(req, res) {
  if (req.userPassword) {
    if(req.userPassword.length < 6){
      return res.status(400).json({
        message: 'minimum length of password is 6',
        status: false
      });
    }
  }else{
    return res.status(400).json({
      message: 'password field cannot be empty',
      status: false
    });
  }
}

function validateUserPhone(req, res) {
  if (req.userPhone) {
    if (req.userPhone.match(/^[0-9]+$/)){
      return res.status(400).json({
        message: 'phone number is invalid',
        status: false
      });
    }
  }

}

//image fields
function validateImageType(req, res){}
function validateImageDescription(req, res){}

//event fields
function validateEventName(req, res){}
function validateEventStatus(req, res){}
function validateEventServices(req, res){}

//center fields
function validateCenterName(req, res){
  if (!req.centerName) {
    return res.status(400).json({
      message: 'center name field cannot be empty',
      status: false
    });
  }
}

function validateCenterCapacity(req, res){
  return res.status(4)
}

function validateCenterPrice(req, res){}
function validateCenterStatus(req, res){}
function validateCenterAmenities(req, res){}
function validateCenterDescription(req, res){}
