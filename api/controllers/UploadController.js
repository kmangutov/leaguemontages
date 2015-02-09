module.exports = {
    upload: function(req, res) {

        var uploadFile = req.file('uploadFile');
        console.log(uploadFile);
        
        //save it under /uploads/username/filename
        //get this url and pass it to submission's url 

        uploadFile.upload({dirname:"../../.tmp/public/cdn"}, function onUploadComplete(err, files){
            if(err) return res.serverError(err);

            console.log(files);

            res.json(200, {"stauts":200, file: files});
        });
    }
};