const User = require('../models').User;
import bcryptjs from 'bcryptjs';
module.exports = {
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
  signIn(req, res){ 
    if (req.userEmail === null){ 
      return res.status(400).send({ 
      message:'email field is required', 
      status: false, 
    });  
    if (req.userPassword === null){
      return res.status(400).send({
        message: 'password is required',
        status: false,
      })
    }
  }   
  req.userPassword = bcryptjs.hashSync(req.userPassword, 10);
  User
  .findOne({ 
    where: {userEmail: req.userEmail}, 
  }) 
    .then((user) =>{ 
      if (bcryptjs.compare(req.userPassword, user.userPassword)){ 
        // let userId = user.id; 
        // const token = jwt.sign({userId}, secret, {expiresIn: '60m'}); 
        return res.status(200).send({
          feed: { 
            'userFirstName': user.userFirstName, 
            'id':user.id, 
            'userLastName': user.userLastName, 
            'userEmail':user.userEmail, 
            'userStatus': user.userStatus 
          },
          // token: token, 
          message: 'Successfully signed in',
          status: true, 
        }); 
      } 
      return res.status(400).send({ 
        message: "Authentication failed: Wrong email or password", 
        status: false, 
      });
    }) 
    .catch(error => {
      const err = error.errors[0].message; 
      return res.status(400).send({ 
        message: err + " Pls fill in the field appropritely", 
        status: false 
      }) 
    }); 
      
  },
}