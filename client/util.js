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
  }
}