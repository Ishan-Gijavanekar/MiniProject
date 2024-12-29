import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
        required: true,
    },
    feild: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feild",
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

export const Stock = mongoose.model("Stock", stockSchema)