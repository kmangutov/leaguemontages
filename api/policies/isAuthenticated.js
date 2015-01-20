
module.exports = function(req, res, next) {
	sails.log("processing token verification");

	if(!req.header.token)
		return next();
		//return res.forbidden("Not authenticated to perform this action")
	
	var token = req.header.token;

	UserManager.authenticateToken(token, function(err, user) {
		if(err)
			return res.send(500, {error:"token error"});

		if(!user)
			return res.send(404, {error:"user error"});

		req.user = user;
		next();
	});
};

