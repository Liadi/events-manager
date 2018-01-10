import db from './../models';

const { Center, Event, Image } = db;

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
  },

  getCenter(req, res) {
    if (!req.centerId){
      return res.status(400).json({
        message: 'invalid centerId param',
        status: false,
      });
    }
    Center.findOne({
      where: {id: req.centerId},
      include: [{
        model: Event,
        as: 'events',
        attributes: ['eventTime'],
      }],
    }).then((center) => {
      if (!center) {
        return res.status(404).json({
          message: 'center does not exist',
          status: false,
        });
      }
      if (req.userType){
        return res.status(200).json({
          message: 'center found',
          center,
          status: true,
        });
      }
      return res.status(200).json({
        message: 'center found',
        center: {
          centerName: center.centerName,
          centerAddress: center.centerAddress,
          centerCountry: center.centerCountry,
          centerState: center.centerState,
          centerCity: center.centerCity,
          centerCapacity: center.centerCapacity,
          centerDescription: center.centerDescription,
        },
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

  deleteCenter(req, res) {
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
      center.destroy();
      return res.status(200).json({
        message: 'center deleted',
        status: true,
      });
    });
  },

  getAllCenters(req, res){
    const tempParams = req.query;
    const finalParams = {};

    for (let field in tempParams) {
      if (tempParams.hasOwnProperty(field) && tempParams[field] !== undefined && tempParams[field] !== '') {
        finalParams[field] = tempParams[field].toLowerCase();
      }
    }

    if (req.userType){
      Center.findAll().then((centers) => {
        return findCenter(centers, finalParams, res);
      })
      .catch((error) => {
        return res.status(400).json({
          message: 'invalid query',
          status: false,
        });
      });
    }
    Center.findAll({
      attributes: { exclude: ['centerStatus'] },
    }).then((centers) => {
      return findCenter(centers, finalParams, res);
    })
    .catch((error) => {
      return res.status(400).json({
        message: 'invalid query',
        status: false,
      });
    });
  },
};

const searchCenters = ((centers, finalParams) => {
  const retCenters = [];
  for(let i in centers) {
    const center = centers[i];
    let foundIndex = 0;
    for (let key in finalParams) {
      switch(key) {
        case 'centerName':{
          foundIndex = center[key].search(finalParams[key])
          break;
        }

        case 'centerCountry':{
          if (center[key] !== finalParams[key]){
            foundIndex = -1;
          }
          break;
        }

        case 'centerState':{
          if (center[key] !== finalParams[key]){
            foundIndex = -1;
          }
          break;
        }

        case 'centerCity':{
          if (center[key] !== finalParams[key]){
            foundIndex = -1;
          }
          break;
        }

        case 'centerCapacity':{
          if (parseInt(center[key]) > parseInt(finalParams[key])){
            foundIndex = -1;
          }
          break;
        }

        case 'centerPriceLower':{
          if (parseInt(center[key]) < parseInt(finalParams[key])){
            foundIndex = -1;
          }
          break;
        }

        case 'centerPriceUpper':{
          if (parseInt(center[key]) > parseInt(finalParams[key])){
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
      center['searchIndex'] = foundIndex;
      retCenters.push(center);
    }
  }
  return retCenters;
});

const findCenter = ((centers, finalParams, res ) => {
  const retCenters = searchCenters(centers, finalParams)
  if (retCenters.length > 0){
    return res.status(200).json({
      message: 'centers found',
      status: true,
      centers: retCenters,
    });
  }
  return res.status(404).json({
    message: 'centers not found',
    status: false,
  })
});