import * as centerMiddlewares from './centers';
import * as eventMiddlewares from './events';
import * as userMiddlewares from './users';

module.exports = { 
  cleanData(req, res, next) {
    try {
      // params
      req.centerId = parseInt(req.params.centerId);
      req.eventId = parseInt(req.params.eventId);

      // user fields
      req.userFirstName = (req.body.userFirstName && req.body.userFirstName.trim().toLowerCase()) || null;
      req.userLastName = (req.body.userLastName && req.body.userLastName.trim().toLowerCase()) || null;
      req.userEmail = (req.body.userEmail && req.body.userEmail.trim().toLowerCase()) || null;
      req.userPassword = req.body.userPassword || null;
      req.oldUserPassword = req.body.oldUserPassword || null;
      req.newUserPassword = req.body.newUserPassword || null;
      req.userPhoneNumber = (req.body.userPhoneNumber && req.body.userPhoneNumber.trim()) || null;
      req.userType = null;

      // event fields
      req.eventName = (req.body.eventName && req.body.eventName.trim()) || null;
      req.eventStatus = (req.body.eventStatus && req.body.eventStatus.trim().toLowerCase()) || null;
      req.eventAmountPaid = (req.body.eventAmountPaid && req.body.eventAmountPaid.trim()) || null;
      req.eventTime = (req.body.eventTime && req.body.eventTime.trim()) || null;
      req.eventDescription = (req.body.eventDescription && req.body.eventDescription.trim()) || null;

      // center fields
      req.centerName = (req.body.centerName && req.body.centerName.trim()) || null;
      req.centerAddress = (req.body.centerAddress && req.body.centerAddress.trim()) || null;
      req.centerCountry = (req.body.centerCountry && req.body.centerCountry.trim()) || null;
      req.centerState = (req.body.centerState && req.body.centerState.trim()) || null;
      req.centerCity = (req.body.centerCity && req.body.centerCity.trim()) || null;
      req.centerDescription = (req.body.centerDescription && req.body.centerDescription.trim()) || null;
      req.centerMantra = (req.body.centerMantra && req.body.centerMantra.trim()) || null;
      req.centerCapacity = (req.body.centerCapacity && req.body.centerCapacity.trim()) || null;
      req.centerRate = (req.body.centerRate && req.body.centerRate.trim()) || null;
      req.centerStatus = (((req.body.centerStatus && req.body.centerStatus.trim().toLowerCase()) === 'unavailable') && 'unavailable') || 'available';
      req.centerAmenities = (req.body.centerAmenities && req.body.centerAmenities.trim()) || null;
    } catch (err) {
      return res.status(400).json({
        message: 'Error. Invalid input(s). Probable solution: Enusure single entries, no multiple entries for a field; Ensure string(quotes) input, regardless of type, for raw inputs (e.g \'100\' not 100)',
        status: false,
      });
    } next();
  },
  centerMiddlewares,
  eventMiddlewares,
  userMiddlewares,
};
