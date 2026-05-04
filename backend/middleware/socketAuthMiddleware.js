const jwt = require('jsonwebtoken');
const User = require('../models/User');


const socketAuthMiddleware = async (socket, next) => {
    try {
        //extract token 
        const token = socket.handshake.auth.token;

        if (!token) {
            console.log("Socket connection rejected : No token provided");
            return next(new Error("Unauthorized - No Token Provided"));
        }

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            console.log("Socket connection rejected : Invalid token");
            return next(new Error("Unauthorized - Invalid Token"));
        }

        //find the user from DB
        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            console.log("Socket connection rejected : User not found");
            return next(new Error("User not found"));
        }

        //attach user info to socket 
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user : ${user.fullName} (${user._id})`);

        next();
    } catch (error) {
        console.log(`Error in socket authentication:`, error.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
}


module.exports = socketAuthMiddleware;