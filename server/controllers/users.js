const User = require('../models').User;
import bcryptjs from 'bcryptjs';
module.exports = {
  empty(req, res){
    return res.status(200).json({
      message: 'trying',
      status: true
    })
  },
	createUser(req, res){
    req.userPassword = bcryptjs.hashSync(req.userPassword, 10);
    User.findOne({ 
      where: {userEmail: req.userEmail.toLowerCase()}
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          message: 'account with email already exists',
          status: false,
        });
      }
      User.create({
        userFirstName: req.userFirstName.toLowerCase(),
        userLastName: req.userLastName.toLowerCase(),
        userEmail: req.userEmail.toLowerCase(),
        userPassword: req.userPassword,
        userPhone: req.userPhone,
        userStatus: req.userStatus,
      }).then(user => {
        return res.status(201).json({
          message: 'User created',
          status: true,
          feed: {
            'firstname': req.userFirstName,
            'lastname': req.userLastName,
            'email': req.userEmail,
            'phone': req.userPhone,
            'user status': req.userStatus,
          },
        })
      })
      .catch(error => {
        return res.status(400).json({
          message: "pls fill in the fields appropriately",
          status: false
        })
      });
    });    
	},
}