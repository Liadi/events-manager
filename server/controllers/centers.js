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
    })
    .catch(error => {
      console.log('-----', error);
      return res.status(400).json({
        message: error.errors[0].message
      });
    })
  },

  modifyCenter(req, res){
    Center
    .findOne({where:{id: req.params.centerId, userId: req.userId}})
    .then( (center) => {
      const valName = req.body.centerName || center.name;
      const valIngredients = req.body.centerIngredients || center.ingredients;
      const valInstruction = req.body.centerInstruction || center.instruction;
      const valDescription = req.body.centerDescription || center.description;
      center
      .update({
        name : valName,
        ingredients: valIngredients,
        instruction: valInstruction,
        description: valDescription, 
      },{where:{id: req.params.centerId,}})
      .then((center) => {
        res.status(200).send({
          message: center.name + ' center updated',
          status: true,
          feed: center,
        })
        return -1;
      })
      .catch(error => {
        const err = error.errors[0].message;
        res.status(400).send({
          message: err + ` Pls fill in the field appropriately`,
          status: false
        });
        return -1;
      });
    })
    .catch(error =>
      {
        //console.log('You\'re trying to modify a center that doesn\'t exist') 
        res.status(404).send({
          message: `You don't have any such center`,
          status: false
        });
      });
    }, 
    
};
