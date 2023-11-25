import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, max:50, min:3, require: true},
    lastName: {type: String, max:50, min:3, require: true},
    email: {type: String, max:50, unique:true, require: true},
    password: {type: String, min:8, require: true},
    picturePath: {type: String, defualt: ""},
    friends: {type: Array, defualt: []},
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User