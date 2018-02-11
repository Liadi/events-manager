import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './../models';
import { log } from './util';

const { User } = db;

process.env.SECRET_KEY = 'mysecretkey';
const secret = process.env.SECRET_KEY;

module.exports = {
  createUser(req, res) {
    req.userPassword = bcryptjs.hashSync(req.userPassword, 8);

    if (req.userType && (req.userType === 'admin')) {
      req.newUserType = 'admin';
    }

    User.findOne({
      where: { userEmail: req.userEmail.toLowerCase() },
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          message: 'account with email already exists',
          status: false,
        });
      }
      User.create({
        userFirstName: req.userFirstName,
        userLastName: req.userLastName,
        userEmail: req.userEmail,
        userPassword: req.userPassword,
        userPhonNumber: req.userPhone,
        userType: req.newUserType || 'regular',
      }).then((user) => {
        res.status(201).json({
          message: 'user created',
          status: true,
        });
        const logData = {
          entityName: user.userFirstName,
          entity: 'User',
          entityId: user.id,
          userId: req.userId || user.id,
          action: 'POST',
          before: JSON.stringify({}),
          after: JSON.stringify({
            id: user.id,
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userEmail: user.userEmail,
            userPhonNumber: user.userPhone,
            userType: user.userType,
          }),
        }
        log(logData);
      }).catch((error) => {
        const err = error.errors[0].message;
        return res.status(400).json({
          message: err,
          status: false,
        });
      });

      

    });
  },

  signIn(req, res) {
    if (req.userEmail === null) {
      return res.status(400).send({
        message: 'email is required',
     
        status: false,
      });
    }
    if (req.userPassword === null) {
      return res.status(400).send({
        message: 'password is required',
        status: false,
      });
    }
    // req.userPassword = bcryptjs.hashSync(req.userPassword, 8);

    User.findOne({
      where: { userEmail: req.userEmail },
    }).then((user) => {
      if (user) {
        bcryptjs.compare(req.userPassword, user.userPassword).then((same) => {
          if (same) {
            const userId = user.id;
            const userType = user.userType;
            const token = jwt.sign({ userId, userType }, secret, { expiresIn: '60m' });
            return res.status(200).send({
              user: {
                userId: user.id,
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                userEmail: user.userEmail,
                userPhoneNumber: user.userPhoneNumber,
                userType: user.userType,
              },
              token,
              message: 'successfully signed in',
              status: true,
            });
          }
          return res.status(401).send({
            message: 'authentication failed: wrong email or password',
            status: false,
          });
        });
      } else {
        return res.status(401).send({
          message: 'authentication failed: wrong email or password',
          status: false,
        });
      }
    }).catch((error) => {
      const err = error.errors[0].message;
      return res.status(400).send({
        message: err,
        status: false,
      });
    });
  },
};
