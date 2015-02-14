/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({
    register: function(req, res) {
        //create User and Auth and make a relationship
        var email = req.param('email');
        var password = req.param('password');
        var displayName = req.param('display_name');
        if(email == null | password == null | displayName == null)
            return res.json(400, {"error": "missing fields"});

        User.create({display_name:displayName}).exec(function(err, user){
            if(err)
                return res.json(400, {"error":err, "message":"cannot create user"});

            Auth.create({email:email, password:password, user:user.id}).exec(function(err, auth){
                if(err){
                    User.destroy({display_name:displayName}).exec(function(err){});
                    return res.json(400, {"error":err, "message":"cannot create auth for user", });
                }
                User.update({id:user.id}, {auth:auth.id}).exec(function(){});
                return res.json(200, {"status":"successfully created user account"});
            });
        });
  
    },

    unregister: function(req, res) {
        //delete auth/jwt/user/submission/comment and all other stuffs;
    },

});