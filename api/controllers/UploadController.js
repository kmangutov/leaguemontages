module.exports = {
    upload: function(req, res) {
        var fs = require('fs'),
            path = require('path');

        var uploadFile = req.file('uploadFile');
        console.log(uploadFile);
        
        //save it under /uploads/username/filename
        //get this url and pass it to submission's url 

        uploadFile.upload({dirname:"../../assets/cdn"}, function onUploadComplete(err, files){
            if(err) return res.serverError(err);

            console.log(files);

            //create symlink to access video immediately
            //this will not be problem if we choose to use cloud
            var fd = files[0].fd.split("/");
            var filename = fd[fd.length -1];
            var postsSrc = path.join(process.cwd(), 'assets/cdn/' + filename);
            var postDst = path.join(process.cwd(), '.tmp/public/cdn/' + filename);
            sails.log(postsSrc);
            fs.symlink(postsSrc, postDst, function(err){
                if(err)
                    return res.json(400, {"error":"failed to create link"});
                else
                    return res.json(200, {"stauts":200, file: files});
            });


           
        });

    }
};