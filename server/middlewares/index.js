import jwt from 'jsonwebtoken';

process.env.SECRET_KEY = 'mysecretkey';
const secret = process.env.SECRET_KEY;

module.exports = {
  cleanData(req, res, next) {
    try {
      // params
      req.centerId = parseInt(req.params.centerId);

      // user fields
      req.userFirstName = (req.body.userFirstName && req.body.userFirstName.trim().toLowerCase()) || null;
      req.userLastName = (req.body.userLastName && req.body.userLastName.trim().toLowerCase()) || null;
      req.userEmail = (req.body.userEmail && req.body.userEmail.trim().toLowerCase()) || null;
      req.userPassword = (req.body.userPassword && req.body.userPassword.trim()) || null;
      req.userPhoneNumber = (req.body.userPhone && req.body.userPhone.trim()) || null;
      req.userType = (req.body.userType && req.body.userType.trim().toLowerCase()) || 'regular';

      // event fields
      req.eventName = (req.body.eventName && req.body.eventName.trim()) || null;
      req.eventStatus = (req.body.eventStatus && req.body.eventStatus.trim().toLowerCase()) || null;
      req.eventAmountPaid = (req.body.eventAmountPaid && req.body.eventAmountPaid.trim()) || null;
      req.eventStartTime = (req.body.eventStartTime && req.body.eventStartTime.trim()) || null;
      req.eventEndTime = (req.body.eventEndTime && req.body.eventEndTime.trim()) || null;

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
      console.log('err', err);
      return res.status(400).json({
        message: 'Error. Invalid input(s). Probable solution: Enusure single entries, no multiple entries for a field; Ensure string(quotes) input, regardless of type, for raw inputs (e.g \'100\' not 100)',
        status: false,
      });
    } next();
  },

  validateToken(req, res, next) {
    // ensure token found
    req.token = req.body.token || req.headers.token;
    if (!req.token) {
      return res.status(401).json({
        message: 'You only have access, if you\'re logged in',
        status: false,
      });
    }

    // ensure same user
    let verifiedJWT;
    try {
      verifiedJWT = jwt.verify(req.token, secret);
    } catch (err) {
      // token expired
      return res.status(400).json({
        message: 'pls, login',
        status: false,
      });
    }
    if (!verifiedJWT) {
      return res.status(400).json({
        message: 'pls, login',
        satus: false,
      });
    }
    req.userId = verifiedJWT.userId;
    req.userType = verifiedJWT.userType;
    next();
  },

  isAdmin(req, res, next) {
    if (req.userType !== 'admin') {
      return res.status(403).json({
        message: 'access denied',
        status: false,
      });
    }
    next();
  },

  validateSignUpFields(req, res, next) {
    if (!req.userPassword) {
      return res.status(400).json({
        message: 'password required',
        status: false,
      });
    }
    if (!(req.userPassword.length >= 6)) {
      return res.status(400).json({
        message: 'password should have at least 6 characters',
        status: false,
      });
    }
    if (!req.userEmail) {
      return res.status(400).json({
        message: 'email required',
        status: false,
      });
    }
    next();
  },

};
