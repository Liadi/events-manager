const Center = require('./../models').Center;

module.exports = {
  createCenter(req, res){
    Center.create({
      centerName: req.centerName,
      centerAddress: req.centerAddress,
      centerAmenities: req.centerAmenities,
      centerCapacity: req.centerCapacity,
      centerDescription: req.centerDescription,
      centerPrice: req.centerPrice,
      centerStatus: req.centerStatus,
    })
    .then(center => {
      return res.status(201).json({
        message: 'center created',
        status: true,
        feed: center,
      });
    })
    .catch(error => {
      console.log('-----', error);
      return res.status(400).json({
        message: error.errors[0].message
      });
    })
  } 
};
