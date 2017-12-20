module.exports = {
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
