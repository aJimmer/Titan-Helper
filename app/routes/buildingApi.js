var Building = require('../models/building');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express){

	var buildingApi = express.Router();

	buildingApi.route('/buildings')
		.post(function(req, res) {
			var building = new Building();
			var room = new Object();

			building.name = req.body.name;
			building.floors = req.body.floors;
			room.roomNum = req.body.roomNum;
			room.path = req.body.path.split(' ').map(Number);
			building.rooms.push(room);

			building.save(function(err) {
				if(err) res.send(err);

				res.json({message: 'Building created!' });

			})
			console.log('added building ' + building);
		})
		.get(function(req,res) {
			Building.find(function(err, buildings) {
				if(err) res.send(err);
				res.json(buildings);
			})
		});

	buildingApi.route('/buildings/:building__id')
		.put(function(req, res) {
			Building.findById(req.params.building__id, function(err, building) {
				if(err) res.send(err);

				if(req.body.name) building.name = req.body.name;
				if(req.body.floors) building.floors = req.body.floors;
				if(req.body.roomNum && req.body.path) {
					var room = new Object();

					room.roomNum = req.body.roomNum;
					room.path = req.body.path.split(' ').map(Number);
					building.rooms.push(room);
				}

				building.save(function(err) {
					if (err) res.send(err);

					res.json({ message: 'Building updated!'});
				});
			});
		})
		.get(function(req, res) {
			Building.findById(req.params.building__id, function(err, building) {
				if(err) res.send(err);

				res.send(building);
			})
		})
		.delete(function(req, res) {
			Building.remove({
				_id: req.params.building__id
			}, function(err, building) {
				if(err) return res.send(err);

				res.json({ message: 'Successfully deleted'});
			})
		});

	// middleware to use for all requests
	buildingApi.use(function(req, res, next) {
		console.log('connecting to building-api...');
		
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		console.log('token: ' +  token);
		// decode token
		if(token) {
			// verify secret and checks exp
			jwt.verify(token, superSecret, function(err, decoded) {
				if(err) {
					return res.status(403).send({
						sucess: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					// if everything is good, save to request for use in other routes
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


	return buildingApi;
};