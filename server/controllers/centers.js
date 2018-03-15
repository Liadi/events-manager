import fs from 'fs';
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
      const images = [];
      if (req.centerImagePropArray) {
        let imageCreatePromise = 0; 
        for (let i = 0; i < req.centerImagePropArray.length; i++) {
          Image.create({
            imagePath: req.centerImagePropArray[i].path,
            imageDescription: req.centerImagePropArray[i].description,
            imageOrder: i + 1,
            centerId: center.id,
          }).then((image) => {
            images.push({
              id: image.id,
              imagePath: image.imagePath,
              imageDescription: image.imageDescription,
              imageOrder: image.imageOrder,
            });
            imageCreatePromise += 1;
            if (imageCreatePromise === req.centerImagePropArray.length) {
              centerCreatedResponse(req, res, {...center.dataValues}, images);
            }
          }).catch((error) => {
            console.log('error => ', error);
            fs.unlink(process.cwd()+ '/client/images/' + req.centerImagePropArray[i].path, (err) => {if (err) console.log('Ooops, ', err)});
            imageCreatePromise += 1;
            if (imageCreatePromise === req.centerImagePropArray.length) {
              centerCreatedResponse(req, res, {...center.dataValues}, images);
            }
          })
        }
      } else {
        centerCreatedResponse(req, res, {...center.dataValues});
      }
    }).catch((error) => {
      if (req.centerImagePropArray){
        for (let i in req.centerImagePropArray) {
          // delete image file
          fs.unlink(process.cwd() + '/client/images/' + req.centerImagePropArray[i].path, (err) => {if (err) console.log('Ooops, ', err)});
        }
      }
      let err
      try {
        err = error.errors[0].message;
      } catch(e) {
        err = 'server error';
      }
      return res.status(400).json({
        message: err,
        status: false,
      });
    });
  },

  modifyCenter(req, res) {
    if (!req.centerId){
      if (req.centerImagePropArray){
        for (let i in req.centerImagePropArray) {
          // delete image file
          fs.unlink(process.cwd() + '/client/images/' + req.centerImagePropArray[i].path, (err) => {if (err) console.log('Ooops, ', err)});
        }
      }
      return res.status(400).json({
        message: 'invalid centerId param',
        status: false,
      });
    }
    Center.findOne({
      where: {id: req.centerId},
      include: [{
        model: Image,
        as: 'images',
        attributes: ['id', 'imagePath', 'imageDescription', 'imageOrder'],
      },{
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
        console.log('req center Image Prop Array => ', req.centerImagePropArray);
        if (req.centerImagePropArray) {
          for (let i = 0; i < center.images.length; i++) {
            console.log('images id => ', center.images[i].dataValues.id);
            Image.findById(center.images[i].dataValues.id).then((singleImage) => {
              if (singleImage) {
                console.log('destroying!!!');
                fs.unlink(process.cwd() + '/client/images/' + singleImage.imagePath, (err) => {if (err) console.log('Ooops, ', err)});
                singleImage.destroy();
              }  
            })
          }
          const images = [];
          let imageCreatePromise = 0; 
          for (let i = 0; i < req.centerImagePropArray.length; i++) {
            Image.create({
              imagePath: req.centerImagePropArray[i].path,
              imageDescription: req.centerImagePropArray[i].description,
              imageOrder: i + 1,
              centerId: center.id,
            }).then((image) => {
              images.push(image);
              imageCreatePromise += 1;
              if (imageCreatePromise === req.centerImagePropArray.length) {
                centerUpdatedResponse(req, res, {...center.dataValues}, oldCenter, images);
              }
            }).catch((error) => {
              console.log('error => ', error);
              fs.unlink(process.cwd()+ '/client/images/' + req.centerImagePropArray[i].path, (err) => {if (err) console.log('Ooops, ', err)});
              imageCreatePromise += 1;
              if (imageCreatePromise === req.centerImagePropArray.length) {
                centerUpdatedResponse(req, res, {...center.dataValues}, oldCenter, images);
              }
            })
          }
        } else {
          centerUpdatedResponse(req, res, {...center.dataValues}, oldCenter);
        }

      }).catch((error) => {
        if (req.centerImagePropArray){
          for (let i in req.centerImagePropArray) {
            // delete image file
            fs.unlink(process.cwd() + '/client/images/' + req.centerImagePropArray[i].path, (err) => {if (err) console.log('Ooops, ', err)});
          }
        }
        let err;
        try {
          err = error.errors[0].message;
        } catch(e) {
          err = 'server error';
        }
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
      }, {
        model: Image,
        as: 'images',
        attributes: ['id', 'imagePath', 'imageDescription', 'imageOrder'],
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
          images: center.images,
          
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
    Center.findOne({
      where: {id: req.centerId},
      include: [{
        model: Image,
        as: 'images',
        attributes: ['id', 'imagePath'],
      }],
    }).then((center) => {
      if (!center) {
        return res.status(404).json({
          message: 'center does not exist',
          status: false,
        });
      }
      
      const oldCenter = {...center.dataValues};
      for (let i in center.images) {
        // delete image file
        fs.unlink(process.cwd() + '/client/images/' + center.images[i].imagePath, (err) => {if (err) console.log('Ooops, ', err)});
      }

      // images casceded and deleted;
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
          images: oldCenter.images,
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
      if (tempParams.hasOwnProperty(field) && tempParams[field]) {
        finalParams[field] = tempParams[field];
      }
    }
    if (req.userType){
      Center.findAll().then((centers) => {
        return findCenters(centers, finalParams, res);
      })
      .catch((error) => {
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
    let foundIndex = 0;
    for (let key in finalParams) {
      switch(key) {
        case 'centerName':{
          foundIndex = (center[key].toLowerCase()).search(finalParams[key].toLowerCase())
          break;
        }

        case 'centerCountry':{
          if (center[key].toLowerCase() !== finalParams[key].toLowerCase()){
            foundIndex = -1;
          }
          break;
        }

        case 'centerState':{
          if (center[key].toLowerCase() !== finalParams[key].toLowerCase()){
            foundIndex = -1;
          }
          break;
        }

        case 'centerCity':{
          if (center[key].toLowerCase() !== finalParams[key].toLowerCase()){
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
          if (parseInt(center['centerRate']) < parseInt(finalParams[key])){
            foundIndex = -1;
          }
          break;
        }

        case 'centerPriceUpper':{
          if (parseInt(center['centerRate']) > parseInt(finalParams[key])){
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
      if (tempSortObj['order'] === 'INC'){
        return a[tempSortObj['item']] - b[tempSortObj['item']];
      }
      return b[tempSortObj['item']] - a[tempSortObj['item']];
    });
  }
  const totalElement = retCenters.length;
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
      totalElement,
    });
  }
  return res.status(404).json({
    message: 'centers not found',
    status: false,
  })
});

const centerCreatedResponse = ((req, res, center, images=[]) => {
  center['images'] = images;
  center['events'] = [];
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
      images: JSON.stringify(images),
    }),
  };
  log(logData);
});

const centerUpdatedResponse = ((req, res, center, oldCenter, images=[]) => {
  center['images'] = images;
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
      images: JSON.stringify(oldCenter.images),
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
      images: JSON.stringify(images),
    }),
  }

  log(logData);
});