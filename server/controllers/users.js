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
        userPhoneNumber: req.userPhoneNumber,
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
            userPhoneNumber: user.userPhoneNumber,
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
            const token = jwt.sign({ userId, userType }, secret, { expiresIn: '1d' });
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

  modifyUser(req, res) {
    User.findById(req.userId).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'user data not found',
          status: false,
        }); 
      }
      // Password Confirmation (if exists)
      if (req.oldUserPassword && req.newUserPassword){
        if(bcryptjs.compareSync(req.oldUserPassword, user.userPassword)){
          if(req.newUserPassword.length < 6) {
            return res.status(400).json({
              message: 'password should have at least 6 characters',
              status: false,
            });
          }
          req.userPassword = bcryptjs.hashSync(req.newUserPassword, 8);
        } else {
          return res.status(400).json({
            message: 'wrong password',
            status: false,
          })
        }
      } else {
        req.userPassword = null;
      }

      const oldUser = {...user.dataValues};
      let nothingToChange = true;
      const tempFields = [req.userFirstName, req.userLastName, req.userEmail, req.userPassword, req.userPhoneNumber];
      for (let i in tempFields) {
         if (tempFields[i]) {
          nothingToChange = false;
          break;
        }
      }
      if (nothingToChange) {
        return res.status(400).json({
          message: 'No new entry',
          status: false,
        });
      }
      user.update({
        userFirstName: req.userFirstName || user.userFirstName,
        userLastName: req.userLastName || user.userLastName,
        userEmail: req.userEmail || user.userEmail,
        userPassword: req.userPassword || user.userPassword,
        userPhoneNumber: req.userPhoneNumber || user.userPhoneNumber,
      }).then((user) => {
        res.status(200).json({
          message: 'user updated',
          user: {
            userId: user.id,
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userEmail: user.userEmail,
            userPhoneNumber: user.userPhoneNumber,
            userType: user.userType,
          },
          status: true,
        });
        
        const logData = {
          entityName: oldUser.userFirstName,
          entity: 'User',
          entityId: user.id,
          userId: req.userId,
          action: 'UPDATE',
          before: JSON.stringify({
            userFirstName: oldUser.userFirstName,
            userLastName: oldUser.userLastName,
            userEmail: oldUser.userEmail,
            userPassword: oldUser.userPassword === user.userPassword? '****' : '***',
            userPhoneNumber: oldUser.userPhoneNumber,
          }),
          after: JSON.stringify({
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userEmail: user.userEmail,
            userPassword: '****',
            userPhoneNumber: user.userPhoneNumber,
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
};
