var async = require('async'),
	keystone = require('keystone');

var Whatever = keystone.list('Whatever');

/**
 * List Whatevers
 */

exports.list = function(req, res) {
	Whatever.model.find(function(err, items) {

		if (err) return res.apiError('database error', err);

		res.apiResponse({
			watevers: items
		});

	});
};
