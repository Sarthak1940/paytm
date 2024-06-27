const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if(!token) {
        return res.status(401).json({message: "token is required"});
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log(decodedToken);
        req.userId = decodedToken._id;
        next();
        
    } catch (error) {
        return res.status(error.statusCode).json({message:error.message});
    }
}

module.exports = authMiddleware;

