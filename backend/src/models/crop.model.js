import mongoose from 'mongoose'

const cropSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true
    },
    variety: {
        type: String,
        required: true,
    },
    plantingDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    harvestDate: {
        type: Date,
        required: true
    },
    growthStage: {
        type: String,
        required: true,
        enum: ["Seeding", "Vegetative", "Flowering", "Harvesting"]
    },
    feildId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feild"
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    cropImage: {
        type: String
    }
}, {
    timestamps: true,
})

export const Crop = mongoose.model("Crop", cropSchema)