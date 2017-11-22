module.exports = {
	cleanData(req, res, next) {
		try{
      //user fields
      console.log("aaaaa ",req.body.userFirstName);
			req.userFirstName = (req.body.userFirstName && req.body.userFirstName.trim()) || null;
			req.userLastName = (req.body.userLastName && req.body.userLastName.trim()) || null;
			req.userEmail = (req.body.userEmail && req.body.userEmail.trim()) || null;
			req.userPassword = (req.body.userPassword && req.body.userPassword.trim()) || null;
			req.userPhone = (req.body.userPhone && req.body.userPhone.trim()) || null;
			req.userStatus = (req.body.userStatus && req.body.userStatus.trim()) || 'regular';

			//image fields
			req.imageType = (req.body.imageType && req.body.imageType.trim()) || 'others';
			req.imageDescription = (req.body.imageDescription && req.body.imageDescription.trim()) || null;
			
			//event fields
			req.eventName = (req.body.eventName && req.body.eventName.trim()) || null;
			req.eventStartTimeYear = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventStartTimeMonth = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventStartTimeDate = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventStartTimeTime = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      
			req.eventEndTime = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;
			req.eventStatus = (req.body.eventStatus && req.body.eventStatus.trim()) || null;
			req.eventServices = (req.body.eventServices && req.body.eventServices.trim()) || null;

			//center fields
			req.centerName = (req.body.eventName && req.body.eventName.trim()) || null;
			req.centerCountry = (req.body.eventStartTime && req.body.eventStartTime.trim()) || 'Nigeria';
			req.centerState = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;
			req.centerCity = (req.body.eventStatus && req.body.eventStatus.trim()) || null;
			req.centerCapacity = (req.body.eventServices && req.body.eventServices.trim()) || null;
			req.centerPrice = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;
			req.centerStatus = (req.body.eventStatus && req.body.eventStatus.trim()) || 'available';
			req.centerAmenities = (req.body.eventServices && req.body.eventServices.trim()) || null;
			req.centerDescription = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;

		}catch(err){
      return res.status(400).json({
        message: `Consuming api? You'd probably sent multiple entries for a field`,
        status: false
      });
    } 
    next();
	},

	validateCreateEventFields(req, res, next){
    if(req.eventName) {


    }else{
      res.status(400).json({
        message: 'event name cannot be empty',
        status: false
      });
    }

    req.eventStartTimeYear
    req.eventStartTimeMonth
    req.eventStartTimeDate
    req.eventStartTimeTime
	},

  validateCreateUserFields(req, res, next){
    // validate firstname
    console.log(req.userFirstName, "aaaa");
    if (req.userFirstName) {
      console.log(req.userFirstName, "c");
      // validate firstname type (letters only)/^[a-z]+$/
      if (!(req.userFirstName).match(/^[a-z]+$/)){
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
      console.log(req.userFirstName, "d");
      return res.status(400).json({
        message: 'firstname field cannot be empty',
        status: false
      });
    }

    // validate lastname
    if (req.userLastName) {
      // validate type (letters only)/^[a-z]+$/
      if (!((req.userLastName).match(/^[a-z]+$/))){
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
      console.log(req.userFirstName, "d");
      return res.status(400).json({
        message: 'lastname field cannot be empty',
        status: false
      });
    }

    // validate email
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

    if (req.userPhone) {
      if (req.userPhone.match(/^[0-9]+$/)){
        return res.status(400).json({
          message: 'phone number is invalid',
          status: false
        });
      }
    }

    if (req.userStatus){
      if (req.userStatus !== 'regular'){
        return res.status(400).json({
          message: 'status can only be regular or admin',
          status: false
        });
      }
    }
   next(); 
  }
  // validateEditEventFields(req, res, next){

  // },

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