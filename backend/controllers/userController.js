const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const cloudinary = require('cloudinary').v2;

// const router = express.Router();


//Function to register a user

const Register = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(404).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({ message: "User is already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword,
            fullName
        })

        const newUser = await user.save();

        const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        res.status(201).json({
            message: `User ${newUser.fullName} registered successfull ✅`,
            user: {

                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            },
            token
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}


//Function to Login a user

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Invalid Credentials" });

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({
            message: `Welcome back ${user.fullName} 👋🏻`,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
            },
            token
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}


//Function to get a user's profile Data

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        // const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const userData = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
            // token
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}



//update user profile image

const updateProfile = async (req, res) => {
    console.log("1. Request reached the controller"); // شوف دي هتظهر في الـ Terminal ولا لأ
    try {
        const userId = req.user._id;
        const image = req.file;
        if (!image) {
            return res.status(404).json({ message: "Profile pic is required" });
        }

        let imageUrl = "";
        const imageUpload = await cloudinary.uploader.upload(image.path, {
            resource_type: "image"
        })

        imageUrl = imageUpload.secure_url;

        const newUser = await User.findByIdAndUpdate(userId,
            { profilePic: imageUrl }, { new: true });

        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}






module.exports = { Register, Login, getProfile, updateProfile };
