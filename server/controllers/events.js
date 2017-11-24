import { error } from 'util';

// import Event from './../models';
const Event = require('./../models').Event;
// const Center = require('./../models').Center;

module.exports = {
  createEvent(req, res) {
    if (dateIsFree(req, res)) {
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
    }
  },

  deleteEvent(req, res){
    if (isOwner(req, res)){
      req.event.destroy(); 
      res.status(202).send({
        message: event + ' event deleted',
      }); 
    }
  },

  modifyEvent(req, res){
    if (isOwner) {
      const valName = req.body.eventName || req.event.eventName
      const valTime = req.body.eventTime || req.event.eventTime;
      const valStatus = req.body.eventStatus || req.event.eventStatus;
      const valServices = req.body.eventServices || req.event.eventServices;
      req.event.update({
        eventName: valName,
        eventTime:valTime,
        eventStatus: valStatus;
        eventServices: valServices
      });
      res.status(200).json({
        message: 'event updated',
      })
    }
  },

  getEvent(req, res){
    const eventId = parseInt(req.params.userId);
    if (!eventId){
      return res.status(400).json({
        message: 'wrong request format, use decimal for params',
      })
    }
    if (isOwner){
      return res.status(200).json({
        message: 'event found',
        event: req.event,
      })
    }
  },

  getAllEvents(req, res) {
    Event.findAll({where: {userId: req.userId}})
    .then((events) => {
      if (events){
        res.status(200).json({
          message: 'user events returned',
          events,
        });
      }else {
        res.status(400).json({
          message: 'you have no events',
        });
      }
    });
  },
};

function isOwner(req, res){
  Event.findById(parseInt(req.params.eventId))
  .then((event) => {
    if(event) {
      if (event.userId !== req.userId){
        res.status(400).json({
          message: 'you don\'t have such an event',
        });
        return false;
      }
      req.event = event;
      return true;
    }else {
      res.status(400).json({
        message: 'you don\'t have such an event',
      });
      return false;
    }
  }); 
}

function dateIsFree (req, res){
  Event.findOne({where :{centerId: req.centerId, eventTime: req.eventTime}})
  .then((event) => {
    if (event){
      res.status(400).json({
        message: 'The date has been scheduled for another event'
      });
      return false;
    }
    return true;
  })
}