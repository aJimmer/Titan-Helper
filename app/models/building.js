var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuildingSchema = new Schema({
	name: String,
	floors: Number,
	rooms : 
			[{
				roomNum: String,
				path: [Number]
			}]
});

BuildingSchema.pre('save', function(next) {
	var building = this;

	next();
});

module.exports = mongoose.model('Building', BuildingSchema);