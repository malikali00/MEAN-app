/* Express Routes */
var Charts = require('../models/charts');
var Graph = require('../models/graph');
var jwt = require('jsonwebtoken');
var config = require('../../config');

//super secret for creating token
var superSecret = config.secret;

module.exports = function(app,express){

//get an instance of the express router
var apiRouter = express.Router();

//===================================  /pie-chart  ================================
apiRouter.route('/pie-chart')
	// get all the users (accessed at GET http://localhost::8080/api/pie-chart)
	.get(function(req, res) {
		Charts.find({}, function(err, charts) {
			console.log("***************");
			console.log(charts);
			console.log("***************");
			if (err) throw err;
			// object of all the users
			res.json(charts);
		});
	});

//===================================  /area-chart  ================================

apiRouter.route('/graph')
	// get all the users (accessed at GET http://localhost::8080/api/graph)
	.get(function(req, res) {
		Graph.find({}, function(err, graph) {
			console.log(graph);
			if (err) throw err;
			// object of all the users
			res.json(graph);
		});
	});	
	return apiRouter;
};
