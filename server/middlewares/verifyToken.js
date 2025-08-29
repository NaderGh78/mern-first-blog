const jwt = require('jsonwebtoken');

/*===========================================*/
/*===========================================*/
/*===========================================*/

// verify token ++++++++ Bearer 
function verifyToken(req, res, next) {
    // req.headers.authorization =>  authorization is a buld in property inside [req.headers]
    const authToken = req.headers.authorization;

    // first we should check if there is [authToken]
    if (authToken) {

        // here we make the authToken as array in order to access only the [token],should be before [try and catch]
        const token = authToken.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userDecoded = decoded;
            next();
            //   console.log(req.userDecoded)
        } catch (error) {
            res.status(403).json({ message: "invalid token" });
        }
    } else {
        res.status(403).json({ message: "no token provided" });
    }
}

/*===========================================*/

// verify the token and Admin 
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.userDecoded.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "not allowed, only admin allowed" });
        }
    });
}

/*===========================================*/

// Verify Token & Only User Himself
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.userDecoded.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({ message: "not allowed, only user himself" });
        }
    });
}

/*===========================================*/

// verify the token and Authorization
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.userDecoded.id === req.params.id || req.userDecoded.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "not allowed, only user himself or admin" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser
}