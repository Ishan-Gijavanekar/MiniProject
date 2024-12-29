import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    profilePic: {
        type: String,
    },
    background: {
        type: String,
    },
    fullName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Farmer", "Logistics", "Vendor"],
    }
}, {
    timestamps: true,
})

export const User = mongoose.model("User", userSchema)