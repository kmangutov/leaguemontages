

module.exports = {
	
	queryRating: function(req, res) {
		res.json("{rating: 5}");
	},

	applyRating: function(req, res) {
		res.json("{result: 'rating applied!'}");
	}
};