const asynHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require('bcryptjs');
const { UserModel, registerValidation, loginValidation } = require("../models/UserModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 *@desc register new user 
 *@route /api/auth 
 *@method Post
 *@access public
*/
const register = asynHandler(
    async (req, res) => {

        // 1. validation
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2 - is user already exists 
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "user or email already exist" });
        }

        // 3 - hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // 4. Upload photo
        let imgResult;
        let AvatarImagePath;

        // in case there is an image uploaded 
        if (req.file) {
            AvatarImagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
            imgResult = await cloudinary.cloudinaryUploadImage(AvatarImagePath, "my-blog/avatar");
        }

        user = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
            bio: req.body.bio,
            userImage:
                req.file && req.file.originalname ?
                    { url: imgResult.secure_url, publicId: imgResult.public_id } :
                    undefined
        });

        // 5. new user and save it to db 
        const result = await user.save();

        const token = user.generateToken();

        const { password, ...others } = result._doc;

        // 6. send response to client
        res.status(201).json({ message: "Successful Registration ,please Log In", ...others, token });

        // 7. Remvoe image from the server
        fs.unlinkSync(AvatarImagePath);

    }
);

/*===========================================*/

/**
 *@desc login new user 
 *@route /api/auth 
 *@method Post
 *@access public
*/
const login = asynHandler(
    async (req, res) => {

        // 1. validation
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. is user exist
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        // 3. check the password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "invalid email or password" });
        }

        // 4. generate the token (jwt)
        const token = user.generateToken();

        // 5. send response to client
        res.status(200).json({
            _id: user._id,
            isAdmin: user.isAdmin,
            token,
            username: user.username,
            email: user.email,
            userImage: user.userImage,
            bio: user.bio
        })
    }
);

module.exports = {
    register,
    login
}