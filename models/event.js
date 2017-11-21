var mongoose = require('mongoose');

// Event schema
var eventSchema = mongoose.Schema({
	eventname:{
		type: String,
		required: true
	},
	eventtype:{
		type: String,
		required: true
	},
	eventdescription:{
		type: String,
		required: true
	},
	eventdate:{
		type: Date,
		required: true	
	},
	eventaddress:{
		type: String,
		required: true
	},
	eventstatus:{
		type: String,
		required: true
	}
});

var Event = module.exports = mongoose.model('Event', eventSchema);