import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    vechile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vechile",
        required: true,
    },
    tranport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transport",
        required: true,
    },
    feildId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feild",
        required: true,
    },
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Order Placed", "In process", "Delivered"],
        default: "Order Placed"
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})

export const Order = mongoose.model("Order", orderSchema)