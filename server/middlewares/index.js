module.exports = {
  cleanData(req, res, next) {
    try {
      // user fields
      req.userFirstName = (req.body.userFirstName && req.body.userFirstName.trim().toLowerCase()) || null;
      req.userLastName = (req.body.userLastName && req.body.userLastName.trim().toLowerCase()) || null;
      req.userEmail = (req.body.userEmail && req.body.userEmail.trim().toLowerCase()) || null;
      req.userPassword = (req.body.userPassword && req.body.userPassword.trim()) || null;
      req.userPhoneNumber = (req.body.userPhone && req.body.userPhone.trim()) || null;
      req.userType = (req.body.userType && req.body.userType.trim().toLowerCase()) || 'regular';

      // event fields
      req.eventName = (req.body.eventName && req.body.eventName.trim().toLowerCase()) || null;
      req.eventStatus = (req.body.eventStatus && req.body.eventStatus.trim().toLowerCase()) || null;
      req.eventAmountPaid = (req.body.eventAmountPaid && req.body.eventAmountPaid.trim()) || null;
      req.eventStartTime = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventEndTime = (req.body.eventEndTime && req.body.eventEndTime.trim()) || null;

      // center fields
      req.centerName = (req.body.centerName && req.body.centerName.trim().toLowerCase()) || null;
      req.centerAddress = (req.body.centerAddress && req.body.centerAddress.trim()) || null;
      req.centerCountry = (req.body.centerCountry && req.body.centerCountry.trim().toLowerCase()) || null;
      req.centerState = (req.body.centerState && req.body.centerState.trim().toLowerCase()) || null;
      req.centerCity = (req.body.centerCity && req.body.centerCity.trim().toLowerCase()) || null;
      req.centerDescription = (req.body.centerDescription && req.body.centerDescription.trim()) || null;
      req.centerMantra = (req.body.centerMantra && req.body.centerMantra.trim()) || null;
      req.centerCapacity = (req.body.centerCapacity && req.body.centerCapacity.trim()) || null;
      req.centerRate = (req.body.centerRate && req.body.centerRate.trim()) || null;
      req.centerStatus = (req.body.centerStatus && req.body.centerStatus.trim().toLowerCase()) || 'available';
      req.centerAmenities = (req.body.centerAmenities && req.body.centerAmenities.trim()) || null;
    } catch (err) {
      return res.status(400).json({
        message: 'Error. You\'ve probably sent multiple entries for a field using api',
        status: false,
      });
    } next();
  },
};
