const { Server } = require("socket.io");
const http = require('http');
const express = require('express');
const socketAuthMiddleware = require("../middleware/socketAuthMiddleware");

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
    cors: {
        origin: "http://localhost:5174",
        credentials: true
    }
})



//apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);


//we will use this function to check if the user is online or not
const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
}


//this is for storing  online users
const userSocketMap = {}; //{userId : socketId}

io.on("connection", (socket) => {
    console.log("A user connected", socket.user.fullName);

    const userId = socket.userId;
    //updated our online user list 
    userSocketMap[userId] = socket.id;

    //send it to every single user in our application

    //io.emit() is user to send events to all connected (logged in) clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A User disconnected", socket.user.fullName);
        delete userSocketMap[userId];

        //to inform the rest of the users that a client disconnected
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    });
})




module.exports = { io, app, server, getReceiverSocketId };
