import { error } from 'util';

// import Event from './../models';
const Event = require('./../models').Event;
// const Center = require('./../models').Center;

module.exports = {
  createEvent(req, res) {
    Event.findOne({where: { id: req.centerId, eventTime: req.eventTime}})
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

  slatedEvents(req, res){
    
  }
};
