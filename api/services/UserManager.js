/**
 *
 *
 */

var jwt = require('jsonwebtoken');
var jwtSecret = 'whatwedohere'

module.exports = {
	issueToken: function(payload) {
		var token = jwt.sign(payload, jwtSecret);
		return token;
	},

	verifyToken: function(token, verified) {
		return jwt.verify(token, process.env.TOKEN_SECRET || jwtSecret, {}, verified);
	},

	authenticateToken: function(token, done) {
		var tokenObj = jwt.decode(token, jwtSecret);
		User.findOne({id:tokenObj.id})
			.done(function(err, user) {
				if(err)
					return done(err);
				return done(null, user);
			});

	}
}
