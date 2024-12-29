import mongoose from 'mongoose'

const feildSchema = new mongoose.Schema({
    feildName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    soilType: {
        type: String,
        required: true
    },
    irrigationSystem: {
        type: String,
        required: true,
        enum: ["Yes", "No"]
    },
    crops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop"
        }
    ],
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
})

export const Feild = mongoose.model("Feild", feildSchema)