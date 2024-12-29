import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
    transportName: {
        type: String,
        required: true
    },
    BaseLocation: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
})

export const Transport = new mongoose.model("Transport", transportSchema)