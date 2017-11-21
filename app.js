const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/mihuerta',{
	useMongoClient:true
});
var db = mongoose.connection;

// Check connection
db.once('open', function(){
	console.log('Connected to MongoDB');
});

// Check for DB erros
db.on('error', function(err){
	console.log(err);
});

// Init app
const app = express();

// Bring in models
var User = require('./models/user');
var Contact = require('./models/contact');
var Event = require('./models/event');
var Crop = require('./models/crop');

// Load View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Main page route
app.get('/', function(req, res){
	res.render('login', {
		title:'Mi Huerta',
		body1: 'Contenido que poner'
	});
});

// Login --- authentication pending
app.get('/login', function(req, res){
	res.render('login', {
		title:'Log In to Mi Huerta'
	});
});

app.post('/login', function(req, res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.username;

	// user.find({})

	// user.(function(err){
	// 	if(err){
	// 		console.log(err);
	// 		return;
	// 	} else {
	// 		res.redirect('/');
	// 	}
	// });
});


app.get('/signup', function(req, res){
	res.render('signup', {
		title:'Sign Up to Mi Huerta'
	});
});

app.post('/signup', function(req, res){
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.username;

	// Saves new user
	user.save(function(err){
		if(err){
			console.log(err);
			return;
		} else {
			console.log("User " + user.username + " created")
			res.redirect('/');
		}
	});
});

// Main page -- must load contacts, events, and crops
app.get('/mainpage', function(req, res){
	Contact.find({}, function(err, contacts){
		console.log("Obteniendo contactos");
		if(err){
			console.log(err);
		} else {
			Event.find({}, function(err, events){
				console.log("Obteniendo Eventos");
				if(err){
					console.log(err);
				} else {
					Crop.find({}, function(err, crops){
						console.log("Obteniendo Crops");
						if(err){
							console.log(err);
						} else{
							res.render('mainpage', {
								title:'Welcome',
								contacts: contacts,
								events: events,
								crops: crops
							});
						}
					})
				}
			})			
		}
	});
});

app.post('/mainpage', function(req, res){

});


// Create Contact
app.get('/createcontact', function(req, res){
	res.render('createcontact', {
		title:'Create Contact'
	});
});

app.post('/createcontact', function(req, res){
	var contact = new Contact();
	contact.contactname = req.body.contactname;
	contact.profession = req.body.profession;
	contact.email = req.body.email;
	contact.phone = req.body.phone;
	contact.address = req.body.address;

	// Saves new contact
	contact.save(function(err){
		if(err){
			console.log(err);
			return;
		} else {
			console.log("Contact " + contact.contactname + " created")
			res.redirect('/mainpage');
		}
	});
});

// Create Event
app.get('/createevent', function(req, res){
	res.render('createevent', {
		title:'Create Event'
	});
});

app.post('/createevent', function(req, res){
	var event = new Event();
	event.eventname = req.body.eventname;
	event.eventtype = req.body.eventtype;
	event.eventdescription = req.body.eventdescription;
	var eDate = req.body.eventdate;
	console.log(eDate);
	event.eventdate = new Date(eDate);
	console.log(event.eventdate);
	event.eventaddress = req.body.eventaddress;
	event.eventstatus = req.body.eventstatus;

	// Saves new event
	event.save(function(err){
		if(err){
			console.log(err);
			return;
		} else {
			console.log("Event " + event.eventname + " created")
			res.redirect('/mainpage');
		}
	});
});

// Create Crop
app.get('/createcrop', function(req, res){
	res.render('createcrop', {
		title:'Create Crop'
	});
});

app.post('/createcrop', function(req, res){
	var crop = new Crop();
	crop.cropname = req.body.cropname;
	crop.croptype = req.body.croptype;
	crop.cropsize = req.body.cropsize;
	crop.cropstatus = req.body.cropstatus;
	crop.cropaddress = req.body.cropaddress;

	// Saves new crop
	crop.save(function(err){
		if(err){
			console.log(err);
			return;
		} else {
			console.log("Crop " + crop.cropname + " created")
			res.redirect('/mainpage');
		}
	});
});

// Start server
app.listen(3000, function(){
	console.log('Server started on port 3000')
});