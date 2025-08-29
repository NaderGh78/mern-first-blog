const multer = require('multer');
const path = require('path');

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Photo Storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, callback) => {
        if (file) {

            callback(null, `imgae-${Date.now()}.${file.originalname}`);
        } else {
            callback(null, false);
        }
    }
});

/*===========================================*/ 

// Photo Upload Middleware
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb({ message: "Unsupported file format" }, false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 2 }//2mgbyte
});

module.exports = { upload }