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

      User.findOne({
        where: { 
          userEmail: req.userEmail.toLowerCase(),
        },
      }).then((tempUser) => {
        if (tempUser) {
          if (tempUser.id === user.id) {
            return res.status(400).json({
              message: `new email same with the old email, use a new email for update`,
              status: false, 
            })
          }
          return res.status(400).json({
            message: 'account with email already exists',
            status: false, 
          })
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
    });
  },

  deleteAccount(req, res) {
    User.findById(req.userId).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Server error',
          status: false,
        });  
      }
      const oldUser = {...user.dataValues};
      user.destroy();
      
      res.status(200).send({
        message: 'Account deleted',
        status: true,
      });

      const logData = {
        entityName: oldUser.userFirstName,
        entity: 'User',
        entityId: oldUser.id,
        userId: req.userId,
        action: 'DELETE',
        before: JSON.stringify({
          userFirstName: oldUser.userFirstName,
          userLastName: oldUser.userLastName,
          userEmail: oldUser.userEmail,
          userPassword: '****',
          userPhoneNumber: oldUser.userPhoneNumber,
        }),
        after: JSON.stringify({}),
      }

      log(logData);

    }).catch((err) => {
      return res.status(400).send({
        message: `Something went wrong, it's on us. Pls try again or report situation if it persists`,
        status: false,
      });
    })
  },

  deleteUser(req, res) {

  },

  getAllUsers(req, res) {
    const tempParams = req.query;
    const finalParams = {};

    for (let field in tempParams) {
      if (tempParams.hasOwnProperty(field) && tempParams[field]) {
        finalParams[field] = tempParams[field];
      }
    }

    User.findAll({
      attributes: ['id', 'userFirstName', 'userLastName', 'userEmail', 'userPhoneNumber', 'userType', 'createdAt', 'updatedAt'],
    }).then((users) => {
      return findUsers(users, finalParams, res);
    })
    .catch((error) => {
      return res.status(400).json({
        message: 'invalid query',
        status: false,
      });
    });
  },
};


const searchUsers = ((users, finalParams) => {
  const retUsers = [];
  for(let i in users) {
    const user = users[i];
    let foundIndex = 0;
    for (let key in finalParams) {
      switch(key) {
        case 'userFirstName': {
          if (user[key].toLowerCase() !== finalParams[key].toLowerCase()){
            foundIndex = -1;
          }
          break;
        }

        case 'userLastName': {
          if (!user[key]) {
            foundIndex = -1;
          } else if (user[key].toLowerCase() !== finalParams[key].toLowerCase()) {
            foundIndex = -1;
          }
          break;
        }

        case 'userEmail': {
          if (user[key].toLowerCase() !== finalParams[key].toLowerCase()){
            foundIndex = -1;
          }
          break;
        }

        case 'userPhoneNumber': {
          if (user[key] !== finalParams[key]){
            foundIndex = -1;
          }
          break;
        }

        case 'userType': {
          if (user[key].toLowerCase() !== finalParams[key]){
            foundIndex = -1;
          }
          break;
        }
      }
      if (foundIndex === -1) {
        break;
      }
    }
    if (foundIndex !== -1) {
      // user['searchIndex'] = foundIndex;
      retUsers.push(user);
    }
  }
  return retUsers;
});

const findUsers = ((users, finalParams, res ) => {
  let retUsers = searchUsers(users, finalParams);
  if (finalParams['sort']) {
    const tempSortObj = JSON.parse(finalParams['sort']);
    retUsers.sort((a, b) => {
      if (tempSortObj['order'] === 'INC'){
        return a[tempSortObj['item']] - b[tempSortObj['item']];
      }
      return b[tempSortObj['item']] - a[tempSortObj['item']];
    });
  }
  const totalElement = retUsers.length;
  const [limit, page] = [parseInt(finalParams['limit']), parseInt(finalParams['page'])];
  if ( limit && limit > 0) {
    if (page && page > 0) {
      retUsers = retUsers.slice((page - 1) * limit, page * limit);
    } else {
      retUsers = retUsers.slice(0, limit);
    }
  }

  if (retUsers.length > 0){
    return res.status(200).json({
      message: 'users found',
      status: true,
      users: retUsers,
      totalElement,
    });
  }
  return res.status(404).json({
    message: 'users not found',
    status: false,
  })
});