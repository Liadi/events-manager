import { error } from 'util';

// import Event from './../models';
const Event = require('./../models').Event;
const Center = require('./../models').Center;

module.exports = {
  createEvent(req, res) {
    console.log("centerId", req.centerId);
    Center.findOne({
      where:{id: req.centerId},
      include:[{
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
      // check for time clash with another event
      center.events.forEach((event) => {
        if (event.eventTime === req.eventTime) {
          return res.status(404).json({
            message: 'date taken',
            status: false,
          });
        }
      });

      Event.create({
        eventName: req.eventName,
        eventTime: req.eventTime,
        centerId: req.centerId,
        userId: req.userId,
      }).then((event) => {
        return res.status(201).json({
          message: 'event created',
          event,
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

  modifyEvent(req, res) {
    if (!req.eventId){
      return res.status(400).json({
        message: 'invalid eventId param',
        status: false,
      });
    }
    Event.findOne({
      where: {id: req.centerId, userId: req.userId},
      include: [{
        model: Center,
        as: 'center',
        attributes: [
        'id',
        'centerName',
        'centerAddress',
        ],
      }],
    }).then((event) => {
      if (!event) {
        return res.status(404).json({
          message: 'event does not exist',
          status: false,
        });
      }
      event.update({
        eventName: req.eventName || event.eventName,
        eventAmountPaid: req.eventAmountPaid || event.eventAmountPaid,
        eventTime: req.eventTime || event.eventTime,
        centerId: req.centerId || event.centerId,
      }).then((event) => {
        return res.status(200).json({
          message: 'event updated',
          event,
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

  getEvent(req, res) {
    if (!req.eventId){
      return res.status(400).json({
        message: 'invalid eventId param',
        status: false,
      });
    }
    Event.findOne({
      where: {id: req.eventId },
      include: [{
        model: Center,
        as: 'center',
        attributes: [
        'id',
        'centerName',
        'centerAddress',
        ],
      }],
    }).then((event) => {
      if (!event) {
        return res.status(404).json({
          message: 'event not found',
          status: false,
        });
      }
      if (req.userType === 'admin' || req.userId === event.userId){
        return res.status(200).json({
          message: 'event found',
          event,
          status: true,
        });
      }
      return res.status(404).json({
        message: 'event not found',
        event,
        status: true,
      });
    })
  },

  deleteEvent(req, res) {
    if (!req.eventId){
      return res.status(400).json({
        message: 'invalid eventId param',
        status: false,
      });
    }
    Event.findOne({
      where: {id: req.centerId, userId: req.userId},
    }).then((event) => {
      if (!event) {
        return res.status(404).json({
          message: 'event does not exist',
          status: false,
        });
      }
      event.destroy();
      return res.status(200).json({
        message: 'event deleted',
        status: true,
      });
    });
  },

  getAllEvents(req, res) {
    if (req.userType === 'admin') {
      Event.findAll({
        include: [{
          model: Center,
          as: 'center',
          attributes: [
            'id',
            'centerName',
            'centerAddress',
          ],
        }],
      }).then((events) => {
        if (events.length > 0){
          return res.status(200).json({
            message: 'all events found',
            status: true,
            events,
          });
        }
        return res.status(200).json({
          message: 'no events',
          status: true
        })
      });
    } else {
      Event.findAll({
        where: {userId: req.userId},
        include: [{
          model: Center,
          as: 'center',
          attributes: [
            'id',
            'centerName',
            'centerAddress',
          ],
        }],
      }).then((events) => {
        if (events.length > 0){
          return res.status(200).json({
            message: 'all events found',
            status: true,
            events,
          });
        }
        return res.status(200).json({
          message: 'no events',
          status: true
        })
      });
    }
  },
};
