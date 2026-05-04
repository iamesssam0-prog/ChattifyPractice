const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            if (!token) return res.status(404).json({ message: "UnAuthorized no token provided" });
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(400).json({ message: "UnAuthorized notvalid token" });

            let user = await User.findById(decoded.id).select("-password");
            if (!user) return res.status(400).json({ message: "User not found" })

            req.user = user;
            next();
        }
    } catch (error) {
        console.log("Token Verification failed", error.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}

module.exports = protect;
