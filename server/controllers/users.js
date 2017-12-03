import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './../models';

const { User } = db;


process.env.SECRET_KEY = 'mysecretkey';
const secret = process.env.SECRET_KEY;

module.exports = {
  createUser(req, res) {
    req.userPassword = bcryptjs.hashSync(req.userPassword, 8);

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
        userType: req.userType,
      }).then(() => {
        return res.status(201).json({
          message: 'user created',
          status: true,
        });
      }).catch((error) => {
        const err = error.errors[0].message;
        return res.status(400).json({
          message: `${err}, pls fill in the fields appropriately`,
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
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                userEmail: user.userEmail,
                userType: user.userType,
                userPhoneNumber: user.userPhoneNumber,
              },
              token,
              message: 'Successfully signed in',
              status: true,
            });
          }
          return res.status(400).send({
            message: 'Authentication failed: Wrong email or password!',
            status: false,
          });
        });
      } else {
        return res.status(400).send({
          message: 'Authentication failed: Wrong email or password?',
          status: false,
        });
      }
    }).catch((error) => {
      const err = error.errors[0].message;
      return res.status(400).send({
        message: `${err}, Pls fill in the field appropritely`,
        status: false,
      });
    });
  },
};
