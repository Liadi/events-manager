// import { error } from 'util';
import db from './../models';
import { log } from './util';

const { Center, Event } = db;

module.exports = {
  createEvent(req, res) {
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
      for (let i in center.events) {
        if (center.events[i].eventTime.getTime() === req.eventTime.getTime()) {
          return res.status(404).json({
            message: 'date taken',
            status: false,
          });
        }
      }
      Event.create({
        eventName: req.eventName,
        eventTime: req.eventTime,
        centerId: req.centerId,
        userId: req.userId,
        eventDescription: req.eventDescription,
      }).then((event) => {
        res.status(201).json({
          message: 'event created',
          event,
          status: true,
        });

        const logData = {
          entityName: event.eventName,
          entity: 'Event',
          entityId: event.id,
          userId: req.userId,
          action: 'POST',
          before: JSON.stringify({}),
          after: JSON.stringify({
            eventName: event.eventName,
            eventTime: event.eventTime,
            centerId: event.centerId,
            userId: event.userId,
            eventDescription: event.eventDescription,
          }),
        };

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

  modifyEvent(req, res) {
    if (!req.eventId){
      return res.status(400).json({
        message: 'invalid eventId param',
        status: false,
      });
    }

    Event.findOne({
      where: {id: req.eventId, userId: req.userId},
      include: [{
        model: Center,
        as: 'center',
        attributes: [
        'id',
        'centerName',
        'centerAddress',
        ],
      }],
      attributes: [
      'id',
      'eventName',
      'eventStatus',
      'eventTime',
      'eventAmountPaid',
      'centerId',
      'userId',
      ],
    }).then((event) => {
      if (!event) {
        return res.status(404).json({
          message: 'event does not exist',
          status: false,
        });
      }
      Center.findOne({
        where:{id: event.center.id},
        include:[{
          model: Event,
          as: 'events',
          attributes: ['eventTime', 'id'],
        }],
      }).then((center) => {
        // check for time clash with another event
        if (req.eventTime) {
          for (let i in center.events) {
            if (center.events[i].id !== req.eventId && center.events[i].eventTime.getTime() === req.eventTime.getTime()) {
              return res.status(404).json({
                message: 'date taken',
                status: false,
              });
            }
          }
        }
        const oldEvent = {...event.dataValues};
        event.update({
          eventName: req.eventName || event.eventName,
          eventAmountPaid: req.eventAmountPaid || event.eventAmountPaid,
          eventTime: req.eventTime || event.eventTime,
          centerId: req.centerId || event.centerId,
        }).then((event) => {
          res.status(200).json({
            message: 'event updated',
            event,
            status: true,
          });

          const logData = {
            entityName: oldEvent.eventName,
            entity: 'Event',
            entityId: event.id,
            userId: req.userId,
            action: 'UPDATE',
            before: JSON.stringify({
              eventName: oldEvent.eventName,
              eventTime: oldEvent.eventTime,
              centerId: oldEvent.centerId,
              userId: oldEvent.userId,
            }),
            after: JSON.stringify({
              eventName: event.eventName,
              eventTime: event.eventTime,
              centerId: event.centerId,
              userId: event.userId,
            }),
          };
          log(logData);
        }).catch((error) => {
          const err = error.errors[0].message;
          return res.status(400).json({
            message: err,
            status: false,
          });
        });
      })
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
      attributes: [
      'id',
      'eventName',
      'eventDescription',
      'eventStatus',
      'eventTime',
      'eventAmountPaid',
      'centerId',
      'userId',
      ],
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
      where: {id: req.eventId, userId: req.userId},
      attributes: [
      'id',
      'eventName',
      'eventDescription',
      'eventStatus',
      'eventTime',
      'eventAmountPaid',
      'centerId',
      'userId',
      ],
    }).then((event) => {
      if (!event) {
        return res.status(404).json({
          message: 'event does not exist',
          status: false,
        });
      }
      const oldEvent = {...event.dataValues};
      event.destroy();
      res.status(200).json({
        message: 'event deleted',
        status: true,
      });


      const logData = {
        entityName: oldEvent.eventName,
        entity: 'Event',
        entityId: oldEvent.id,
        userId: req.userId,
        action: 'DELETE',
        before: JSON.stringify({
          eventName: oldEvent.eventName,
          eventDescription: oldEvent.eventDescription,
          eventTime: oldEvent.eventTime,
          centerId: oldEvent.centerId,
          userId: oldEvent.userId,
        }),
        after: JSON.stringify({}),
      };

      log(logData);

    });
  },

  getAllEvents(req, res) {
    const tempParams = req.query;
    const finalParams = {};

    for (let field in tempParams) {
      if (tempParams.hasOwnProperty(field) && tempParams[field] !== undefined && tempParams[field] !== '') {
        finalParams[field] = tempParams[field];
      }
    }

    if (req.userType === 'admin') {
      Event.findAll({
        include: [{
          model: Center,
          as: 'center',
          attributes: [
            'id',
            'centerName',
            'centerAddress',
            'centerRate',
          ],
        }],
        attributes: [
        'id',
        'eventName',
        'eventDescription',
        'eventStatus',
        'eventTime',
        'eventAmountPaid',
        'centerId',
        'userId',
        ],
      }).then((events) => {
        return findEvents(events, finalParams, res);
      }).catch((error) => {
        console.log('error => ', error);
        return res.status(400).json({
          message: 'invalid query',
          status: false,
        });
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
            'centerRate',
          ],
        }],
        attributes: [
        'id',
        'eventName',
        'eventDescription',
        'eventStatus',
        'eventTime',
        'eventAmountPaid',
        'centerId',
        'userId',
        ],
      }).then((events) => {
        return findEvents(events, finalParams, res);
      }).catch((error) => {
        return res.status(400).json({
          message: 'invalid query',
          status: false,
        });
      });
    }
  },
};


const searchEvents = ((events, finalParams) => {
  const retEvents = [];
  for(let i in events) {
    const event = events[i];
    let foundIndex = 0;
    for (let key in finalParams) {
      if (finalParams[key]) {
        switch(key) {
          case 'eventName': {
            foundIndex = event[key].toLowerCase().search(finalParams[key].toLowerCase())
            break;
          }

          case 'centerName': {
            foundIndex = event.center[key].toLowerCase().search(finalParams[key].toLowerCase())
            break;
          }

          case 'eventStatus': {
            if (event[key] !== finalParams[key]){
              foundIndex = -1;
            }
            break;
          }

          case 'eventAmountPaidLower': {
            if (parseInt(event.eventAmountPaid) < parseInt(finalParams[key])) {
              foundIndex = -1;
            }
            break;
          }

          case 'eventAmountPaidUpper': {
            if (parseInt(event.eventAmountPaid) > parseInt(finalParams[key])) {
              foundIndex = -1;
            }
            break;
          }

          case 'eventTime': {
            console.log('eventTime => ', finalParams[key]);
            if (event[key].getTime() > finalParams[key].getTime()) {
              foundIndex = -1;
            }
            break;
          }
        }
      }
      if (foundIndex === -1) {
        break;
      }
    }
    if (foundIndex !== -1) {
      event['searchIndex'] = foundIndex;
      retEvents.push(event);
    }
  }
  return retEvents;
});

const findEvents = (( events, finalParams, res ) => {
  let retEvents = searchEvents(events, finalParams);
  if (finalParams['sort']) {
    const tempSortObj = JSON.parse(finalParams['sort'])
    retEvents.sort((a, b) => {
      if (tempSortObj['order'] === 'DESC'){
        return b[tempSortObj['item']] - a[tempSortObj['item']];
      }
      return a[tempSortObj['item']] - b[tempSortObj['item']];
    });
  }
  const totalElement = retEvents.length;
  const [limit, page] = [parseInt(finalParams['limit']), parseInt(finalParams['page'])];
  if ( limit && limit > 0) {
    if (page && page > 0) {
      retEvents = retEvents.slice((page - 1) * limit, page * limit);
    } else {
      retEvents = retEvents.slice(0, limit);
    }
  }

  if (retEvents.length > 0){
    return res.status(200).json({
      message: 'events found',
      status: true,
      events: retEvents,
      totalElement,
    });
  }
  return res.status(404).json({
    message: 'events not found',
    status: false,
  })
});