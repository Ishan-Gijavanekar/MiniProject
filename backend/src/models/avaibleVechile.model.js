import mongoose from 'mongoose'

const avaibleVechileSchema = new mongoose.Schema({
    BookingDate: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ["Avaible", "Booked"],
        default: "Avaible"
    },
    vechile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vechile",
        required: true
    }
}, {
    timestamps: true
})

export const Avaiblity = mongoose.model("Avaiblity", avaibleVechileSchema)