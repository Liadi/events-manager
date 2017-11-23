const Center = require('./../models').Center;

module.exports = {
  createCenter(req, res){
    Center.create({
      centerName: req.centerName,
      centerState: req.centerState,
      centerAmenities: req.centerState,
      centerCapacity: req.centerState,
      centerCity: req.centerState,
      centerCountry: req.centerState,
      centerDescription: req.centerState,
      centerPrice: req.centerState,
      centerStatus: req.centerState,
    })
    .then(center => {
      return res.status(201).json({
        message: 'center created',
        status: true,
        feed: center,
      });
    })
    .catch(error => {
      return res.status(400).json({
        message: `${error.errors[0].message}, fill field appropriately`
      });
    })
  } 
};
