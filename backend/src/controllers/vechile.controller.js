import { Avaiblity } from "../models/avaibleVechile.model.js"
import { Vechile } from "../models/Vechile.model.js"
import cloudinary from "../utils/cloudinary.js"


const addVechile = async (req, res) => {
    try {
        const {vehicleNumber, vehicleName, capacity, cost} = req.body
        const {id} = req.params

        if (!vehicleName || !vehicleNumber || !capacity || !cost) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }

        if(!id) {
            return res.status(401)
            .json({
                message: "Wronge Url"
            })
        }

        const newVechile = await new Vechile({
            vehicleName,
            vehicleNumber,
            capacity,
            cost,
            transporter: id,
        })

        if(newVechile) {
            await newVechile.save()

            return res.status(200)
            .json({
                newVechile,
                message: "Vechile added successfully"
            })
        } else {
            return res.status(401)
            .json({
                newVechile,
                message: "Something went wronge"
            })
        }

    } catch (error) {
        console.log("Error in add Vechile: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const uploadVechileImage = async(req, res) => {
    try {
        const {image, vehicleName, vehicleNumber} = req.body
    
        if (!image || !vehicleName || !vehicleNumber) {
            return res.status(401)
            .json({
                message: "All the feilds are required"
            })
        }
    
        const vechile = await Vechile.findOne({
            $and: [{vehicleName}, {vehicleNumber}]
        })
    
        if(!vechile) {
            return res.status(401)
            .json({
                message: "Vechile not found"
            })
        }
    
        const uploadResponse = await cloudinary.uploader.upload(image)
        const imageUrl = uploadResponse.secure_url
    
        const updateImage = await Vechile.findByIdAndUpdate(
            vechile._id,
            {
                image: imageUrl
            },
            {
                new: true,
            }
        )
    
        if (updateImage) {
            return res.status(200)
            .json({
                updateImage,
                message: "Image updated successfully"
            })
        } else {
            return res.status(401)
            .json({
                message: "Something went wronge"
            })
        }
    } catch (error) {
        console.log("Error in update image controller: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const updateDetails = async (req, res) => {
    try {
        const {id} = req.params
        const {vehicleNumber, vehicleName, cost, capacity} = req.body

        if (!vehicleName || !vehicleNumber || !cost || !capacity) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }

        const updateVechile = await Vechile.findByIdAndUpdate(
            id,
            {
                vehicleName, 
                vehicleNumber, 
                cost, 
                capacity
            },
            {
                new: true
            }
        )

        if (updateVechile) {
            return res.status(200)
            .json({
                updateVechile,
                message: "Vechile Updated Successfully"
            })
        }
    } catch (error) {
        console.log("Error in update Vechile: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const getVechiles = async (req, res) => {
    try {
        const {id} = req.params
    
        const vechiles = await Vechile.find({transporter: id})
    
        return res.status(200)
        .json({
            vechiles,
            message: "Vechiles fetched Successfully"
        })
    } catch (error) {
        console.log("Error in getting vechiles ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const getVechileById = async(req, res) => {
    try {
        const {id} = req.params
    
        const vechiles = await Vechile.findById(id)
    
        if(vechiles.length < 0) {
            return res.status(401)
            .json({message: "No Vechile Found"})
        }
    
        return res.status(200)
        .json({
            vechiles,
            message: "Vechile fetched successfully"
        })
    } catch (error) {
        console.leg("Error in get vechile by id ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const getAllVechiles = async (req, res) => {
    try {
        const vechiles = await Vechile.find();

        if (vechiles.length == 0) {
            return res.status(401)
            .json({message: "No Vechiles"})
        }  

        res.status(200)
        .json({
            vechiles,
            message: "Vehicles fetched"
        })
    } catch (error) {
        
    }
}

const deleteVechiles = async (req, res) => {
    try {
        const {id} = req.params
        await Vechile.findByIdAndDelete(id)
        return res.status(200)
        .json({
            message: "Record deleted successfully"
        })
    } catch (error) {
        console.log("Error in delete Vechiles ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const bookVechile = async (req, res) => {
    try {
        const {id} = req.params
        const {BookingDate, status} = req.body
    
        if (!BookingDate || !status) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }
    
        const booking = await new Avaiblity({
            BookingDate,
            status,
            vechile: id
        })
    
        await booking.save()
    
        return res.status(200)
        .json({
            booking,
            message: "Vechile Booked successfully"
        })
    } catch (error) {
        console.log("Error in booking Vechile ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export {addVechile, uploadVechileImage, updateDetails, getVechiles, deleteVechiles, bookVechile, getVechileById, getAllVechiles}