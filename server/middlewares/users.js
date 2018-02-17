import jwt from 'jsonwebtoken';

process.env.SECRET_KEY = 'mysecretkey';
const secret = process.env.SECRET_KEY;

module.exports = {
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
    if (!req.userId && !req.userPassword) {
      return res.status(400).json({
        message: 'password required',
        status: false,
      });
    }
    if (!req.userId && req.userPassword && req.userPassword.length < 6) {
      return res.status(400).json({
        message: 'password should have at least 6 characters',
        status: false,
      });
    }
    if (!req.userId && !req.userEmail) {
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
};
