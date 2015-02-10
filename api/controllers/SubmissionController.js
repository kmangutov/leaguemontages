

module.exports = {
	
	queryRating: function(req, res) {
		res.json("{rating: 5}");
	},

	applyRating: function(req, res) {
		res.json("{result: 'rating applied!'}");
	}

    //have to delete related content
    //overwrite delete request
    //submission/:id delete 
    //then file in cdn/file also need to be deleted
};