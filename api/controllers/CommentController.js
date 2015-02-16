module.exports = {
    get: function(req, res) {
        var id = req.param('written_to');
        sails.log("custom get with id " + id);
        /*
        var q = 'SELECT User.display_name, Comment.* FROM Comment ' + 
                'LEFT JOIN USER ON Comment.written_to=' + id + ' AND Comment.written_by=user.id' + 
                ' ORDER BY IF(parentId = 0, Comment.id, parentId), parentId!=0, Comment.id ASC';
        */
        Comment.query(q, function(err, comments){
            if(err)
                return res.json(400, {error:"db error found" + err});
            if(!comments)
                return res.json(404, {error:"not found"});

            return res.json(200, comments);
        });

        /*
             SELECT * 
                FROM comments as x 
                JOIN comments as y 
                ON y.parentId = x.id AND x.written_to = subid
                ORDER 
                BY x.updatedAt, y.updatedAt; 
        */
    }
};