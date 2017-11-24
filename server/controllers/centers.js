const Center = require('./../models').Center;
const User = require('./../models').User;
import jwt from  'jsonwebtoken';
process.env.SECRET_KEY = 'mysecretkey'; 
const secret = process.env.SECRET_KEY; 

module.exports = {
  createCenter(req, res) {
    if (!req.userId){
      return res.status(400).json({
        message: 'access denied, login or signup',
      })
    }
    User.findById(req.userId)
    .then((user) => {
      console.log(user);
      if (user.userStatus === 'regular'){
        return res.status(400).json({
          message: 'access right denined',
        })
      }
      Center.create({
        centerName: req.centerName,
        centerAddress: req.centerAddress,
        centerAmenities: req.centerAmenities,
        centerCapacity: req.centerCapacity,
        centerDescription: req.centerDescription,
        centerPrice: req.centerPrice,
        centerStatus: req.centerStatus
      }).then((center) => {
        return res.status(201).json({
          message: 'center created',
          status: true,
          feed: center,
        });
      }).catch((error) => {
        return res.status(400).json({
          message: error.errors[0].message
        });
      });
    })
    
  },

  modifyCenter(req, res) {
    const output = getStatus(req, res)
    if (output === 'admin'){
      Center.findOne({ where: { id: req.params.centerId } })
      .then((center) => {
        const valName = req.body.centerName || center.centerName;
        const valAddress = req.body.centerAddress || center.centerAddress;
        const valCapacity = req.body.centerCapacity || center.centerCapacity;
        const valPrice = req.body.centerCapacity || center.centerPrice;
        const valStatus = req.body.centerStatus || center.centerStatus;
        const valAmenities = req.body.centerAmenities || center.centerAmenities;
        const valDescription = req.body.centerDescription || center.centerDescription;
        const valImage = req.body.centerImage || center.centerImage;
        center
          .update(
            {
              centerName: valName,
              centerAddress: valAddress,
              centerCapacicty: valCapacity,
              centerPrice: valPrice,
              centerStatus: valStatus,
              centerAmenities: valAmenities,
              centerDescription: valDescription,
              centerImage: valImage
            },
            {
              where: {
                id: req.params.centerId,
              }
            }
          )
          .then((center) => {
            return res.status(200).send({
              message: `${center.centerName} center updated`,
              center,
            });
          })
          .catch((error) => {
            const err = error.errors[0].message;
            res.status(400).send({
              message: `${err} Pls fill in the field appropriately`,
              status: false
            });
            return -1;
          });
      })
      .catch(() => {
        res.status(404).send({
          message: 'You don\'t have any such center',
          status: false
        });
      });
    }
  },
  allCenters(req, res) {
    Center.findAll()
    .then((centers) => {
      if (centers.length === 0) {
        return res.status(404).send({
          message: 'We presently don\'t have a center',
        });
      }
      res.status(200).send({
        message: 'All centers found',
        centers,
      });
    })
    .catch((error) => {
      const err = error.errors[0].message;
      res.status(400).json({
        message: `${err}, Pls fill in the field appropriately`,
      });
    });
  },
  getCenter(req, res){
    let user = true
    const centerId = parseInt(req.params.centerId);
    if(!centerId){
      return res.status(400).json({
        message: 'specify an appropriate centerId',
      })
    }
    Center.findById(centerId)
    .then((center) => {
      if (!center){
        return res.status(400).json({
          message: 'no such center',
        });
      }
      req.token = req.body.token || req.headers.token;
      if (req.token) {
        let verifiedJWT; 
        try { 
          verifiedJWT = jwt.verify(req.token, secret);   
        }catch (err) {
          user = false;
        }
        if (verifiedJWT){
          user = true;
          if (!verifiedJWT.userId){
            return res.status(400).json({
              message: 'User not verified, sign in appropriately.',
            });
          }
        }
        else{
          user = false
        }
        
      }
      else{
        user = false;
      }
      if (!user){
        res.status(200).json({
          message: 'center sent',
          center: {
            id: center.id,
            name: center.centerName,
            address: center.centerAddress,
            capacicty: center.centerCapacity,
            description: center.centerDescription,
            amenities: center.centerAmenities,
            image: center.centerImage,
          },
        });
      }
      else {
        res.status(400).json({
          message: 'center sent!',
          center,
        });
      }
    });
  },

  deleteCenter(req, res) {
    const output = getStatus(req, res)
    if (output === 'admin'){
      Center.findById(parseInt(req.params.centerId))
      .then((center) => {
        if (!center){ 
          res.status(404).send({ 
            message: 'requested center does not exist',  
          }); 
        } 
        else{ 
          let tempName = center.name 
          center.destroy(); 
          res.status(202).send({ 
            message: tempName + ' center deleted',
          }); 
        }     
      });
    }
  }

};

function getStatus(req, res) {
  if (!req.userId){
    return res.status(400).json({
      message: 'access denied, login or signup',
    })
  }
  User.findById(req.userId)
  .then((user) => {
    console.log(user);
    if (user.userStatus === 'regular'){
      return res.status(400).json({
        message: 'access right denined',
      })
    }
  })
  return 'admin';  
}
