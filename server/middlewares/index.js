import jwt from 'jsonwebtoken';

process.env.SECRET_KEY = 'mysecretkey';
const secret = process.env.SECRET_KEY;

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
      req.userPassword = (req.body.userPassword && req.body.userPassword.trim()) || null;
      req.userPhoneNumber = (req.body.userPhone && req.body.userPhone.trim()) || null;
      req.userType = null;

      // event fields
      req.eventName = (req.body.eventName && req.body.eventName.trim()) || null;
      req.eventStatus = (req.body.eventStatus && req.body.eventStatus.trim().toLowerCase()) || null;
      req.eventAmountPaid = (req.body.eventAmountPaid && req.body.eventAmountPaid.trim()) || null;
      req.eventTime = (req.body.eventTime && req.body.eventTime.trim()) || null;

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

  validateUserFields(req, res, next) {
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

  determineUser(req, res, next) {
    // find token
    req.token = req.headers.token || req.body.token;
    if (req.token) {
      let verifiedJWT;
      try {
        verifiedJWT = jwt.verify(req.token, secret);
      } catch (err) {
        req.userType = null;
      }
      if (verifiedJWT) {
        req.userType = verifiedJWT.userType;
      }
    }
    else{
      req.userType = null;
    }
    next();
  },

  validateEventFields(req, res, next) {
    // validate time
    if ((req.method === 'PUT' && req.eventTime) || (req.method === 'POST')){
      if (!validTime(req.eventTime, req, res)) {
        return 1;
      }
    }

    // validate centerId
    req.centerId = parseInt((req.body.centerId && req.body.centerId.trim()) || null);
    if ((req.method === 'PUT' && req.centerId) || (req.method === 'POST')){
      if (!req.centerId){
        return res.status(400).json({
          message: 'invalid input, centerId should be an integer',
          status: false,
        });
      }
    }

    next();
  },
};

function validTime(time, req, res) {
  if (!time) {
    res.status(400).json({
      message: 'invalid eventTime. eventTime should not be null',
      status: false,
    });
    return false;
  }
  const timeArray = time.split('-');
  if (timeArray && timeArray.length !== 3) {
    res.status(400).json({
      message: 'invalid eventTime. Year, month and date should be numbers. Date format: yyyy-mm-dd (2050-06-30)',
      status: false,
    });
    return false;
  }

  let [year, month, date] = timeArray;
  [year, month, date] = [parseInt(year), parseInt(month), parseInt(date)];

  // null(NaN) value
  if (!year || !month || !date){
    res.status(400).json({
      message: 'invalid eventTime. Year, month and date should be numbers. Date format: yyyy-mm-dd (2050-06-30). Zero (0) is not a valid input' ,
      status: false,
    });
    return false;
  }

  if (month > 12) {
    res.status(400).json({
      message: 'invalid eventTime month',
      status: false,
    });
    return false;
  }

  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) { // leap year
    if (month === 2 && date > 29) { 
      res.status(400).json({
        message: `invalid eventTime. For leap year ${year}, february should not exceed 29 days`,
        status: false,
      });
      return false;
    }
  } else if (month === 2 && date > 28) {
    res.status(400).json({
      message: `invalid eventTime. For year ${year}, february should not exceed 28 days`,
      status: false,
    });
    return false;
  }

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    if (date > 30) {
      res.status(400).json({
        message: `invalid eventTime. For month ${month}, date should not exceed 30 days`,
        status: false,
      });
      return false;
    }
  } else {
    if (date > 31) {
      res.status(400).json({
        message: `invalid eventTime. For month ${month}, date should not exceed 31 days`,
        status: false,
      });
      return false;
    }
  }

  const now = new Date();
  const today = new Date (now.getFullYear(), now.getMonth(), now.getDate());
  const eventDate = new Date (year, month - 1, date);

  // too far in future (2 years)
  if ((eventDate - today)/1000/60/60/24/365.4 > 2) {
    res.status(400).json({
      message: 'cannot book an event 2 years before eventTime',
      status: false,
    });
    return false;
  }

  // check if time in past
  if ((eventDate - today) < 0) {
    res.status(400).json({
      message: 'invalid eventTime. Time in the past',
      status: false,
    });
    return false;
  }

  // check if time is 3 days or less (reject)
  if ((eventDate - today)/1000/60/60 <= 72) {
    res.status(400).json({
      message: 'invalid eventTime. Event cannot be scheduled in 3 days or less',
      status: false,
    });
    return false;
  }
  req.eventTime = eventDate;
  return true;
}
