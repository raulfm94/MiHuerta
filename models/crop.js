var mongoose = require('mongoose');

// User schema
var cropSchema = mongoose.Schema({
	cropname:{
		type: String,
		required: true
	},
	croptype:{
		type: String,
		required: true
	},
	cropsize:{
		type: String,
		required: true	
	},
	cropstatus:{
		type: String,
		required: true
	},
	cropaddress:{
		type: String,
		required: true
	}
});

var Crop = module.exports = mongoose.model('Crop', cropSchema);