import jwt from 'jsonwebtoken';

module.exports = {
	validateUser(token, userId) {
	  const [ decoded, currentTime, tempUserId ] = [ jwt.decode(token), (Date.now().valueOf() / 1000), parseInt(userId) ];
	  if (!tempUserId || !token) {
	    return false;
	  }
	  if ( tempUserId === decoded.userId && decoded.exp >= currentTime) {
	    return true;
	  }
	  return false;
	},

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  getTimeOptions(setEventTimeFunc, event, init = false, initVal = undefined) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lowerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4);
    const future = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (365 * 2));

    if (init) {
      if (initVal) {
        let tempInitVal = new Date(initVal);
        setEventTimeFunc('year', tempInitVal.getFullYear());
        setEventTimeFunc('month', tempInitVal.getMonth() + 1);
        setEventTimeFunc('date', tempInitVal.getDate());
      } else {
        setEventTimeFunc('year', lowerTime.getFullYear());
        setEventTimeFunc('month', lowerTime.getMonth() + 1);
        setEventTimeFunc('date', lowerTime.getDate());
      }
    }

    let [year, month, date] = [ event.eventTime.year, event.eventTime.month, event.eventTime.date ];
    const [yearOptions, monthOptions, dateOptions] = [[], [], []];
    for (let i = lowerTime.getFullYear(); i <= future.getFullYear(); i++) {
      yearOptions.push(i);
    }

    for (let i = 1; i <= 12; i++) {
      if (year === lowerTime.getFullYear() && (i - 1) < lowerTime.getMonth()) {
        continue;
      }
      if (year === future.getFullYear() && (i - 1) > future.getMonth()) {
        continue;
      }
      monthOptions.push(i);
    }
    if (month < monthOptions[0] || month > monthOptions[monthOptions.length - 1]) {
      setEventTimeFunc('month', monthOptions[0])
      month = event.eventTime.month
    }

    for (let i = 1; i <= 31; i++) {
      if ((month === 4 || month === 6 || month === 9 || month === 11) && ( i === 31)){
        continue;
      } 
      if (month === 2) {
        if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) { // leap year
          if (i > 29) {
            continue;
          }
        } else if (i > 28) {
          continue;
        }
      } 

      let tempTime = new Date(year, month - 1, i);
      if (tempTime >= lowerTime && tempTime <= future) {
        dateOptions.push(i);
      }
    }
    if (date < dateOptions[0] || date > dateOptions[dateOptions.length - 1]) {
      setEventTimeFunc('date', dateOptions[0]);
      date = event.eventTime.date;
    }

    return [yearOptions, monthOptions, dateOptions];
  }
}