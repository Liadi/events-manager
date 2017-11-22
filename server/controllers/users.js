const User = require('../models').User;

module.exports = {
	createUser(req, res){
		User.create({
			userFirstName: req.userFirstName,
            userLastName: req.userLastName,
            userEmail: req.userEmail,
            userPassword: req.userPassword,
            userPhone: req.userPhone,
            userStatus: req.userStatus,

		}).then(user => {
            console.log("user created")
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
            console.log("error found", error);
            return res.status(400).json({
                message: "pls fill in the fields appropriately",
                status: false
            })
        });
	},
}