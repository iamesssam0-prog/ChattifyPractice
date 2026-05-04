const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

//Routes

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const connectCloudinary = require("./config/cloudinary");
const { app, server } = require("./lib/socket");

// const app = express();

app.use(express.json());
app.use(cors());

connectCloudinary();


//api's
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes)


app.get("/", (req, res) => {
    res.send("Hi from practice chatify");
})

mongoose.connect("mongodb://127.0.0.1:27017/chattifyPractice").then(() => {
    console.log(`Mongo Db connected successfully ✅`)
}).catch((err) => console.log("Mongo Db connection Error", err))

server.listen(4000, () => {
    console.log("Server running on port 4000");
})


