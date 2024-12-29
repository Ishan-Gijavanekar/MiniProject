import mongoose from "mongoose";

const vechileSchema = new mongoose.Schema({
    vechileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    vechileName: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true
    },
    transporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transport",
        required: true
    },
    cost: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
})

export const Vechile = mongoose.model("Vechile", vechileSchema)