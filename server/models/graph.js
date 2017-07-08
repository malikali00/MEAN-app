//Load Packages
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var graphSchema = new Schema();

module.exports = mongoose.model('Graphic',graphSchema);