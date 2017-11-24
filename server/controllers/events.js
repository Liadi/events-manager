import { error } from 'util';

// import Event from './../models';
const Event = require('./../models').Event;
// const Center = require('./../models').Center;

module.exports = {
  createEvent(req, res) {
    Event.findOne({where: { centerId: req.centerId, eventTime: req.eventTime}})
    .then(() => {
      return res.status(400).json({
        message: 'an event already exists for the specified time',
      });
    })
    .catch((error) => {
      Event.create({
        eventName: req.body.eventName,
        eventTime: req.body.eventStartTime,
        eventStatus: req.body.eventStatus,
        eventServices: req.eventServices,
        userId: req.userId,
        centerId: req.centerId,
      }).then((event) => {
        return res.status(201).json({
          message: 'event created',
          center,
        });
      }).catch((error) => {
        const err = error.errors[0].message;
        return res.status(400).send({
          message: `${err} Pls fill in the field appropritely`,
        });
      });
    })
    
  },

  deleteEvent(req, res){
    Event
    .findOne({
      where:{id: req.params.eventId, userId: req.userId}
    })
    .then(event => {
      if (!event){
        res.status(404).send({
          message: `You don't have any such event`,
        });
      }
      else{
        let tempName = event.name
        event.destroy();
        res.status(202).send({
          message: event + ' event deleted',
        });
      }
    })
  }, 
    

  modifyEvent(req, res){
    Event.findOne({where: {id: req.eventId, userId: req.userId}}
    )
    .then((event) => {
      const valName = req.body.eventName || event.eventName
      const valTime = req.body.eventTime || event.eventTime;
      const valStatus = req.body.eventStatus || event.eventStatus;
      const valServices = req.body.eventServices || event.eventServices;
      
      event.update({
        eventName: valName,
        eventTime:valTime,
        eventStatus: valStatus;
        eventServices: valServices
      })
    })
  },
  getEvent(req, res){
    const eventId = parseInt(req.params.userId);
    if (!eventId){
      return res.status(400).json({
        message: 'wrong center format, pick an appropriate center',
      })
    }
    Event.findById(eventId)
    .then((event) => {
      if (!event){
        return res.status(400).json({
          message: 'You don\'t have such an event', 
        });
      }
      if (event.userId === req.userId){
        return res.status(200).json({
          message: 'event found',
          event,
        })
      }
      return res.status(400).json({
        message: 'You don\'t have such an event',
      })
    });
  }
};
