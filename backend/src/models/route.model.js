import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
    distance: {
        type: NUmber,
        required: true
    }
},{ 
    timestamps: true,
})

export const Route = mongoose.model("Route", routeSchema)