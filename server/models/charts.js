//Load Packages
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChartSchema = new Schema({
	value    : String,
    color    : String,
    highlight: String,
    label    : String
});

module.exports = mongoose.model('Charts',ChartSchema);