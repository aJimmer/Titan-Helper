var User = require('../models/user');
var Building = require('../models/building');
var jwt = require('jsonwebtoken');
var config = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express){
	var apiRouter = express.Router();
	//var buildingApi = express.Router();
	// on routes that end in /users
	//-------------------------------------------
	apiRouter.route('/users')
		// create a user ( accessed at POST http://localhost:3000/api/users)
		.post(function(req, res) {
			var user = new User();

			// set the users information (comes from the request)

			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;

			user.save(function(err) {
				if(err) {
					// duplicate entry
					if(err.code == 11000)
						return res.json({ success: false, message: 'A user with that\ username already exists. '});
					else
						return res.send(err);
				}
			res.json({message: 'User created!' });

			});
		})
		.get(function(req, res) {
			User.find(function(err, users) {
				if(err) res.send(err);

				// return the users
				res.json(users);
			});
		});
	/*
	apiRouter.route('/buildings')
		.post(function(req, res) {
			var building = new Building();

			building.name = req.body.name;
			building.code = req.body.code;
			building.floors = req.body.floors;
			building.lng = req.body.lng;
			building.lat = req.body.lat;
			
			building.save(function(err) {
				if(err) res.send(err);

				res.json({message: 'Building created!' });

			})
			console.log('added building ' + building.name);
		})
		.get(function(req,res) {
			Building.find(function(err, buildings) {
				if(err) res.send(err);
				res.json(buildings);
			})
		});
	*/
	apiRouter.route('/users/:user_id')
		// get the user with that id
		// accessed at GET http://localhost:3000/api/:userid
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err,user) {
				if(err) res.send(err);

				//return that user
				res.json(user);
			});
		})
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if(err) res.send(err);

				if(req.body.name) user.name = req.body.name;
				if(req.body.username) user.username = req.body.username;
				if(req.body.password) user.password = req.body.password;

				// save the user
				user.save(function(err) {
					if(err) res.send(err);

					// return a message
					res.josn({message: 'User updated!'});
				});
			});
		})
		.delete(function(req,res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	/*	
	apiRouter.route('/buildings/:building__id')
		.get(function(req, res) {
			Building.findById(req.params.building__id, function(err, building) {
				if(err) res.send(err);

				res.send(building);
			});
		})
		.put(function(req, res) {
			Building.findById(req.params.building__id, function(err, building) {
				if(err) res.send(err);

				if(req.body.name) building.name = req.body.name;
				if(req.body.code) building.code = req.body.code;
				if(req.body.floors) building.floors = req.body.floors;
				if(req.body.lng) building.lng = req.body.lng;
				if(req.body.lat) building.lat = req.body.lat;

				building.save(function(err) {
					if (err) res.send(err);

					res.json({ message: 'Building updated!'});
				});
			});
		})
		.delete(function(req, res) {
			Building.remove({
				_id: req.params.building__id
			}, function(err, building) {
				if(err) return res.send(err);

				res.json({ message: 'Successfully deleted'});
			})
		});
	*/
	

	// route middleware and first route are here
	apiRouter.post('/authenticate', function (req, res) {

		// find the user
		// select the password explicitly since mongoose is not returning it by default
		
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err,user) {

			if(err) throw err;

			// no user with that username was found
			if(!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			} else if (user) {
				// check if password matches
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword) {
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password.'
					});
				} else {

					// if user is found and password is right
					// create a token

					var token = jwt.sign(user, superSecret, {
						expiresIn: '24h'
					});

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
				}
			}
		});
	});

	// middleware to use for all requests
	apiRouter.use(function(req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		console.log('Saving user info for future use...');
		// decode token
		if(token) {
			// verify secret and checks exp
			jwt.verify(token, superSecret, function(err, decoded) {
				console.log('decoded: ' + decoded.name);
				if(err) {
					return res.status(403).send({
						sucess: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					// if everything is good, save to request for use in other routes
					console.log('We hit here...');
					req.decoded = decoded;

					next();
				}
			});
		}	else {
			// if there is no token
			//return an HTTP resoonse of 403 (access forbidden) and an error message
			return res.status(403).send({
				success: false,
				message: 'No token provided.' 
			});
		}
	});
	// test route to make sure everything is working 
	// (accessed at GET http://localhost:3000/api)

	apiRouter.get('/', function(req, res) {
		res.json({message: 'hooray! welcome to our api' });
	});

	apiRouter.get('/me',function(req,res) {
		console.log('Getting user info...');
		res.send(req.decoded._doc);
	});
	// more routes for our API will happen here



	return apiRouter;
};












