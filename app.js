const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



// Init app
const app = express();

// Load View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application
app.use(bodyParser.urlencoded({ extended: fasle}));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Main page route
app.get('/', function(req, res){
	res.render('index', {
		title:'Mi Huerta',
		body1: 'Contenido que poner'
	});
});


// Start server
app.listen(3000, function(){
	console.log('Server started on port 3000')
});