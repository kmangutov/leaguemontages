module.exports = {
    get: function(req, res) {
        var id = req.param('id');

        Comment.findOne({id:id}).exec(function(err, comment){
            if(err)
                return res.json(404, {error:"db error found"});
            if(!comment)
                return res.json(403, {error:"not found"});

            return res.json(200, comment);
        })

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