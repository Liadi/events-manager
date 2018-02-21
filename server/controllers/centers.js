import db from './../models';
import { log } from './util';

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
      res.status(201).json({
        message: 'center created',
        center,
        status: true,
      });
      const logData = {
        entityName: center.centerName,
        entity: 'Center',
        entityId: center.id,
        userId: req.userId,
        action: 'POST',
        before: JSON.stringify({}),
        after: JSON.stringify({
          centerName: center.centerName,
          centerAddress: center.centerAddress,
          centerState: center.centerState,
          centerCity: center.centerCity,
          centerCountry: center.centerCountry,
          centerDescription: center.centerDescription,
          centerMantra: center.centerMantra,
          centerCapacity: center.centerCapacity,
          centerRate: center.centerRate,
          centerStatus: center.centerStatus,
          centerAmenities: center.centerAmenities,
        }),
      };

      log(logData);

    }).catch((error) => {
      console.log('logger => ', error);
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
      const oldCenter = {...center.dataValues};
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
        res.status(200).json({
          message: 'center updated',
          center,
          status: true,
        });

        const logData = {
          entityName: oldCenter.centerName,
          entity: 'Center',
          entityId: center.id,
          userId: req.userId,
          action: 'UPDATE',
          before: JSON.stringify({
            centerName: oldCenter.centerName,
            centerAddress: oldCenter.centerAddress,
            centerState: oldCenter.centerState,
            centerCity: oldCenter.centerCity,
            centerCountry: oldCenter.centerCountry,
            centerDescription: oldCenter.centerDescription,
            centerMantra: oldCenter.centerMantra,
            centerCapacity: oldCenter.centerCapacity,
            centerRate: oldCenter.centerRate,
            centerStatus: oldCenter.centerStatus,
            centerAmenities: oldCenter.centerAmenities,
          }),
          after: JSON.stringify({
            centerName: center.centerName,
            centerAddress: center.centerAddress,
            centerState: center.centerState,
            centerCity: center.centerCity,
            centerCountry: center.centerCountry,
            centerDescription: center.centerDescription,
            centerMantra: center.centerMantra,
            centerCapacity: center.centerCapacity,
            centerRate: center.centerRate,
            centerStatus: center.centerStatus,
            centerAmenities: center.centerAmenities,
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
        attributes: ['id', 'eventTime'],
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
          id: center.id,
          centerName: center.centerName,
          centerAddress: center.centerAddress,
          centerCountry: center.centerCountry,
          centerState: center.centerState,
          centerCity: center.centerCity,
          centerCapacity: center.centerCapacity,
          centerDescription: center.centerDescription,
          centerMantra: center.centerMantra,
          centerAmenities: center.centerAmenities,
          
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
      const oldCenter = {...center.dataValues};
      center.destroy();
      res.status(200).json({
        message: 'center deleted',
        status: true,
      });

      const logData = {
        entityName: oldCenter.centerName,
        entity: 'Center',
        entityId: oldCenter.id,
        userId: req.userId,
        action: 'DELETE',
        before: JSON.stringify({
          centerName: oldCenter.centerName,
          centerAddress: oldCenter.centerAddress,
          centerState: oldCenter.centerState,
          centerCity: oldCenter.centerCity,
          centerCountry: oldCenter.centerCountry,
          centerDescription: oldCenter.centerDescription,
          centerMantra: oldCenter.centerMantra,
          centerCapacity: oldCenter.centerCapacity,
          centerRate: oldCenter.centerRate,
          centerStatus: oldCenter.centerStatus,
          centerAmenities: oldCenter.centerAmenities,
        }),
        after: JSON.stringify({}),
      }

      log(logData);


    });
  },

  getAllCenters(req, res){
    const tempParams = req.query;
    const finalParams = {};

    for (let field in tempParams) {
      if (tempParams.hasOwnProperty(field) && tempParams[field] !== undefined && tempParams[field] !== '') {
        finalParams[field] = tempParams[field];
      }
    }
    if (req.userType){
      Center.findAll().then((centers) => {
        return findCenters(centers, finalParams, res);
      })
      .catch((error) => {
        console.log('error => ', error);
        return res.status(400).json({
          message: 'invalid query',
          status: false,
        });
      });
    } else {
      Center.findAll({
        attributes: { exclude: ['centerStatus'] },
      }).then((centers) => {
        return findCenters(centers, finalParams, res);
      })
      .catch((error) => {
        return res.status(400).json({
          message: 'invalid query',
          status: false,
        });
      });
    }
  },
};

const searchCenters = ((centers, finalParams) => {
  const retCenters = [];
  for(let i in centers) {
    const center = centers[i];
    console.log('in loop, id is => ', center.id);
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

const findCenters = ((centers, finalParams, res ) => {
  let retCenters = searchCenters(centers, finalParams)
  if (finalParams['sort']) {
    const tempSortObj = JSON.parse(finalParams['sort']);
    retCenters.sort((a, b) => {
      if (tempSortObj['order'] === 'decreasing'){
        return b[tempSortObj['item']] - a[tempSortObj['item']];
      }
      return a[tempSortObj['item']] - b[tempSortObj['item']];
    });
  }
  const n = retCenters.length;
  const [limit, page] = [parseInt(finalParams['limit']), parseInt(finalParams['page'])];
  if ( limit && limit > 0) {
    if (page && page > 0) {
      retCenters = retCenters.slice((page - 1) * limit, page * limit);
    } else {
      retCenters = retCenters.slice(0, limit);
    }
  }

  if (retCenters.length > 0){
    return res.status(200).json({
      message: 'centers found',
      status: true,
      centers: retCenters,
      n,
    });
  }
  return res.status(404).json({
    message: 'centers not found',
    status: false,
  })
});