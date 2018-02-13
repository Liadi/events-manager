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
}