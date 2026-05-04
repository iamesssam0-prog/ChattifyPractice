const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true

    },

    fullName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;

