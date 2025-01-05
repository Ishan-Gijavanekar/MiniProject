import { Feild } from "../models/feild.model.js"
import mongoose from "mongoose"


const addFeild = async(req, res) => {
    try {
        const {feildName, location, size, soilType, irrigationSystem} = req.body
        const farmerId = req.user._id
    
        if(!feildName || !location || !size || !soilType || !irrigationSystem) {
            return res.status(401).json(
                {message: "All feilds are required!!!"}
            )
        }
    
        if(!farmerId) {
            return res.status(401).json(
                {message: "Please Login first"}
            )
        }
    
        const feild = new Feild({
            feildName,
            location,
            size: parseInt(size),
            soilType,
            irrigationSystem,
            farmerId
        })
    
        if(feild) {
            await feild.save()
            return res.status(200)
            .json({
                feild,
                message: "Feild added successfully"
            })
        } else {
            return res.status(401).json(
                {message: "Error while uploading the data to database"}
            )
        }
    } catch (error) {
        console.log("Error in Adding feild uploader controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getFeilds = async(req, res) => {
    try {
        const farmerId = req.user._id
    
        if(!farmerId) {
            return res.status(401).json({message: "Please login first"})
        }
    
        const feildList = await Feild.find({farmerId})
    
        return res.status(200)
        .json({
            feildList,
            message: "Feilds fetched successfully"
        })
    } catch (error) {
        console.log("Error in Getting feilds uploader controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getFeildCrops = async(req, res) => {
    try {
        const {id} = req.params
    
        const Crops = await Feild.findById(id).select("crops")
    
        return res.status(200)
        .json({
            Crops,
            message: "All crops fetched successfully"
        })
    } catch (error) {
        console.log("Error in Getting feilds crops uploader controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateFeids = async(req, res) => {
    try {
        const feildId = req.params
    
        const {feildName, size, location, soilType, irrigationSystem} = req.body
    
        if(!feildName || !location || !size || !soilType || !irrigationSystem) {
            return res.status(401).json(
                {message: "All feilds are required!!!"}
            )
        }
    
        const updatedFeild = await Feild.findByIdAndUpdate(
            feildId,
            {
                $set: {feildName, size, location, soilType, irrigationSystem}
            },
            {
                new: true
            }
        ).select("-crops")
    
        return res.status(200)
        .json({
            updatedFeild,
            message: "Feild Updated Successfully"
        })
    } catch (error) {
        console.log("Error in Updating feild uploader controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getFeildById = async (req, res) => {
    try {
        const { id } = req.params;

        const feild = await Feild.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'users', // The collection name for User
                    localField: 'farmerId',
                    foreignField: '_id',
                    as: 'farmerDetails'
                }
            },
            {
                $unwind: '$farmerDetails' // Unwind the array to get the object
            }
        ]);

        if (!feild.length) {
            return res.status(404).json({ message: 'Feild not found' });
        }

        return res.status(200).json({
            feild: feild[0],
            message: "Feild retrieved Successfully"
        });
    } catch (error) {
        console.log("Error in getting feild uploader controller: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




export {addFeild, getFeilds, getFeildCrops, updateFeids, getFeildById}