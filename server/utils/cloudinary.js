const cloudinary = require("cloudinary").v2;

/*===========================================*/
/*===========================================*/
/*===========================================*/

cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRET,

});

// Cloudinary Upload Image
const cloudinaryUploadImage = async (fileToUpload, folder) => {

    try {

        const data = await cloudinary.uploader.upload(fileToUpload, {
            folder,
            resource_type: "auto"
        });

        return data;

    } catch (error) {

        console.log(error);

        throw new Error("Internal Server Error (cloudinary)");

    }
};

// Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId) => {

    try {

        const result = await cloudinary.uploader.destroy(imagePublicId);

        return result;

    } catch (error) {

        console.log(error);

        throw new Error("Internal Server Error (cloudinary)");

    }
};

// Cloudinary Remove Multiple Image
const cloudinaryRemoveMultipleImage = async (publicIds) => {
    try {
        const result = await cloudinary.v2.api.delete_resources(publicIds);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};

module.exports = {
    cloudinary,
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
};