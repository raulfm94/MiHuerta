var mongoose = require('mongoose');

// Contact schema
var contactSchema = mongoose.Schema({
	contactname:{
		type: String,
		required: true
	},
	profession:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true	
	},
	phone:{
		type: String,
		required: true
	},
	address:{
		type: String,
		required: true
	}
});

var Contact = module.exports = mongoose.model('Contact', contactSchema);