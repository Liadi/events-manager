process.env.SECRET_KEY = 25;

module.exports = {
	cleanData(req, res, next) {
		try{
      //user fields
      req.userFirstName = (req.body.userFirstName && req.body.userFirstName.trim().toLowerCase()) || null;
			req.userLastName = (req.body.userLastName && req.body.userLastName.trim().toLowerCase()) || null;
			req.userEmail = (req.body.userEmail && req.body.userEmail.trim().toLowerCase()) || null;
			req.userPassword = (req.body.userPassword && req.body.userPassword.trim()) || null;
			req.userPhone = (req.body.userPhone && req.body.userPhone.trim()) || null;
			req.userStatus = (req.body.userStatus && req.body.userStatus.trim().toLowerCase()) || 'regular';

      

			//image fields
			req.imageType = (req.body.imageType && req.body.imageType.trim()) || 'others';
			req.imageDescription = (req.body.imageDescription && req.body.imageDescription.trim()) || null;
			
			//event fields
			req.eventName = (req.body.eventName && req.body.eventName.trim().toLowerCase()) || null;
			req.eventStartTimeYear = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventStartTimeMonth = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventStartTimeDate = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventStartTimeTime = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      
			req.eventEndTime = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;
			req.eventStatus = (req.body.eventStatus && req.body.eventStatus.trim()) || null;
			req.eventServices = (req.body.eventServices && req.body.eventServices.trim()) || null;

			//center fields
			req.centerName = (req.body.centerName && req.body.centerName.trim().toLowerCase()) || null;
			req.centerCountry = (req.body.centerCountry && req.body.centerCountry.trim()) || 'Nigeria';
			req.centerState = (req.body.centerState && req.body.centerState.trim()) || null;
			req.centerCity = (req.body.centerCity && req.body.centerCity.trim()) || null;
			req.centerCapacity = (req.body.centerCapacity && req.body.centerCapacity.trim()) || null;
			req.centerPrice = (req.body.centerPrice && req.body.centerPrice.trim()) || null;
			req.centerStatus = (req.body.centerStatus && req.body.centerStatus.trim()) || 'available';
			req.centerAmenities = (req.body.centerAmenities && req.body.centerAmenities.trim()) || null;
			req.centerDescription = (req.body.centerDescription && req.body.centerDescription.trim()) || null;

		}catch(err){
      return res.status(400).json({
        message:`Consuming api? You'd probably sent multiple entries for a field`,
        status: false
      });
    } 
    next();
	},

	// validateCreateEventFields(req, res, next){
  //   if(req.eventName) {


  //   }else{
  //     res.status(400).json({
  //       message: 'event name cannot be empty',
  //       status: false
  //     });
  //   }

  //   req.eventStartTimeYear
  //   req.eventStartTimeMonth
  //   req.eventStartTimeDate
  //   req.eventStartTimeTime
	// },

  validateCreateUserFields(req, res, next){
    validateUserFirstName(req, res);
    validateUserLastName(req, res);
    validateUserEmail(req, res);
    validateUserPassword(req, res);
    validateUserPhone(req, res);
    validateUserStatus(req, res);
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
  }

  // validateDeleteEventFields(req, res, next){

  // },
  
  // validateCreateCenterFields(req, res, next){

  // },
  
  // validateGetCenterFields(req, res, next){

  // },
  // validateCreateCenterFields(req, res, next){

  // },
  // validateCreateCenterFields(req, res, next){

  // },
  // validateCreateCenterFields(req, res, next){

  // },

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
function validateUserStatus(req, res) {
  if (req.userStatus){
    if (req.userStatus !== 'regular'){
      return res.status(400).json({
        message: 'status can only be regular or admin',
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
function validateEventStartTimeYear(req, res){}
function validateEventStartTimeMonth(req, res){}

function validateEventStartTimeDate(req, res){}

function validateEventEndTime(req, res){}
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

function validateCenterCountry(req, res){
  if (!req.centerCountry) {
    req.centerCountry = Nigeria
  }
}
function validateCenterState(req, res){
  if (!req.centerState) {
    return res.status(400).json({
      message: 'center state field cannot be empty',
      status: false,
    });
  }
}

function validateCenterCity(req, res){
  if (!req.centerCity) {
    return res.status(400).json({
      message: 'center city field cannot be empty',
      status: false,
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
