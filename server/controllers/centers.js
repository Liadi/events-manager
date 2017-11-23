const Center = require('./../models').Center;

module.exports = {
  createCenter(req, res) {
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
  },

  modifyCenter(req, res) {
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
              message: `${center.name} center updated`,
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
        res.status(400).send({
          message: `${err}, Pls fill in the field appropriately`,
        });
      });
  },

};
