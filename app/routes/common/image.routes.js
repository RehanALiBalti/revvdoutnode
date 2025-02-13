
const CLOUDINARY_URL = "cloudinary://327294213244298:1_QoNWidCjHYCswjw7upNfMz3hw@dhsrsbr6q";
const cloudinary = require('cloudinary').v2;
cloudinary
    .config({
        cloud_name: 'dgdlv3pre',
        api_key: '593531741997156',
        api_secret: 'bV0fTumXgBArALTrksyXn3fsJPQ'
    });

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/common/upload', (req, res) => {
        console.log("fileupload is calling");
        
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err.message,
                });
            }

            // File is now uploaded and stored in the `req.file` object
            const file = req.file;
            console.log(file);

            // Upload the file to Cloudinary
            cloudinary.uploader.upload_stream(

                {
                    public_id: 'file',
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) {
                        return res.status(400).send({
                            success: false,
                            message: error.message,
                        });
                    }
                    res.send({
                        success: true,
                        message: 'File uploaded to Cloudinary',
                        secureUld:result.secure_url,
                       // result: result,

                    });


                    // File has been successfully uploaded to Cloudinary
                }
            ).end(file.buffer);
        });
    });


  

   
 
}