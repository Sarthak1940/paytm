const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;