import db from './../models';

const { Center } = db;

module.exports = {
  createCenter(req, res) {
    Center.create({
      centerName: req.centerName,
      centerAddress: req.centerAddress,
      centerState: req.centerState,
      centerCity: req.centerCity,
      centerCountry: req.centerCountry,
      centerDescription: req.centerDescription,
      centerMantra: req.centerMantra,
      centerCapacity: req.centerCapacity,
      centerRate: req.centerRate,
      centerStatus: req.centerStatus,
      centerAmenities: req.centerAmenities,

    }).then((center) => {
      return res.status(201).json({
        message: 'center created',
        center,
        status: true,
      });
    }).catch((error) => {
      const err = error.errors[0].message;
      return res.status(400).json({
        message: err,
        status: false,
      });
    });
  },

  modifyCenter(req, res) {
    if (!req.centerId){
      return res.status(400).json({
        message: 'invalid centerId param',
        status: false,
      });
    }
    Center.findById(req.centerId).then((center) => {
      if (!center) {
        return res.status(404).json({
          message: 'center does not exist',
          status: false,
        });
      }
      center.update({
        centerName: req.centerName || center.centerName,
        centerAddress: req.centerAddress || center.centerAddress,
        centerState: req.centerState || center.centerState,
        centerCity: req.centerCity || center.centerCity,
        centerCountry: req.centerCountry || center.centerCountry,
        centerDescription: req.centerDescription || center.centerDescription,
        centerMantra: req.centerMantra || center.centerMantra,
        centerCapacity: req.centerCapacity || center.centerCapacity,
        centerRate: req.centerRate || center.centerRate,
        centerStatus: req.centerStatus || center.centerStatus,
        centerAmenities: req.centerAmenities || center.centerAmenities,
      }).then((center) => {
        return res.status(200).json({
          message: 'center updated',
          center,
          status: true,
        });
      }).catch((error) => {
        const err = error.errors[0].message;
        return res.status(400).json({
          message: err,
          status: false,
        });
      });
    });
  }
};
