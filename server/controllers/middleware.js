module.exports = {
	cleanData(req, res, next) {
		try{
			//user fields
			req.userFirstName = (req.body.userFirstName && req.body.userFirstName.trim()) || null;
			req.userLastName = (req.body.userLastName && req.body.userLastName.trim()) || null;
			req.userEmail = (req.body.userEmail && req.body.userEmail.trim()) || null;
			req.userPassword = (req.body.userPassword && req.body.userPassword.trim()) || null;
			req.userPhone = (req.body.userPhone && req.body.userPhone.trim()) || null;
			req.userStatus = (req.body.userStatus && req.body.userStatus.trim()) || null;

			//image fields
			req.imageType = (req.body.imageType && req.body.imageType.trim()) || null;
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
			req.centerCountry = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
			req.centerState = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;
			req.centerCity = (req.body.eventStatus && req.body.eventStatus.trim()) || null;
			req.centerCapacity = (req.body.eventServices && req.body.eventServices.trim()) || null;
			req.centerPrice = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;
			req.centerStatus = (req.body.eventStatus && req.body.eventStatus.trim()) || null;
			req.centerAmenities = (req.body.eventServices && req.body.eventServices.trim()) || null;
			req.centerDescription = (req.body.eventEndTime && req.bodyeventEndTime.trim()) || null;

		}catch(err){
      res.status(400).json({
        message: `Consuming api? You'd probably sent multiple entries for a field`,
        status: false
      });
      return -1
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

  validateEditEventFields(req, res, next){

  },

  validateDeleteEventFields(req, res, next){

  },
  
  validateCreateCenterFields(req, res, next){

  },
  
  validateGetCenterFields(req, res, next){

  },
  validateCreateCenterFields(req, res, next){

  },
  validateCreateCenterFields(req, res, next){

  },
  validateCreateCenterFields(req, res, next){

  },

}