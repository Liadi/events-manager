const Event = require('../models').Event;

module.exports = {
	createEvent(req, res){
		Event.create({
			eventName: req.body.eventName,
			
		})
	}
}