var mongoose = require('mongoose');

// User schema
var userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true	
	},
	password:{
		type: String,
		required: true
	}
});

var User = module.exports = mongoose.model('User', userSchema);