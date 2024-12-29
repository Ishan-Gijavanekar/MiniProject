import { Crop } from "../models/crop.model.js"
import { Feild } from "../models/feild.model.js"
import { Stock } from "../models/stock.model.js"
import cloudinary from "../utils/cloudinary.js"

const addCrop = async(req, res) => {
    try {
        const {cropName, variety, plantingDate, harvestDate, growthStage, quantity, price} = req.body
        const {feildId} = req.body

        if (!cropName || !variety || !plantingDate || !harvestDate || !growthStage || !quantity || !price) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }

        if (!feildId) {
            return res.status(401)
            .json({
                message: "Feild Id should be present in headers"
            })
        }

        const newCrop = await new Crop({
            cropName,
            variety,
            plantingDate,
            harvestDate,
            growthStage,
            quantity,
            price,
            feildId,
            farmerId: req.user._id,
        })

        if(newCrop) {
            await Feild.updateOne(
                {_id: feildId},
                {$push : {
                    crops: newCrop._id
                }}
            )
            const addStock = await new Stock({
                feild: feildId,
                crop: newCrop._id,
                stock: quantity
            })
            await addStock.save()
            await newCrop.save()
            return res.status(200)
            .json({
                newCrop,
                message: "Crop Added Successfully"
            })
        } else {
            return res.status(401)
            .json({
                message: "Some error occured in uploading the data"
            })
        }
    } catch (error) {
        console.log("Error in add crop controller: ", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const uploadCropImage = async(req, res) => {
        try {
            const {id} = req.params
            const {cropImage} = req.body

            if(!cropImage) {
                return res.status(401)
                .json({
                    message: "Crop Image should be selected properly"
                })
            }

            const response = await cloudinary.uploader.upload(cropImage)
            const imageUrl = response.secure_url

            const uploadImage = await Crop.findByIdAndUpdate(
                id,
                {
                    $set: {cropImage:imageUrl},
                },
                {
                    new: true,
                }
            )

            if(uploadImage) {
                return res.status(200)
                .json({
                    uploadImage,
                    message: "Image uploaded successfully"
                })
            } else {
                return res.status(401)
                .json({
                    uploadImage,
                    message: "Some problem occured"
                })
            }
        } catch (error) {
            console.log("Error in add crop controller: ", error)
            return res.status(500).json({message: "Internal Server Error"})
        }
}

const updateCropDetails = async(req, res) => {
    try {
        const {id} = req.params
        const {cropName, variety, plantingDate, harvestDate, growthStage, quantity, price} = req.body
    
        if (!cropName || !variety || !plantingDate || !harvestDate || !growthStage || !quantity || !price) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }
    
        const updateDetails = await Crop.findByIdAndUpdate(
            id,
            {
                $set: {cropName, variety, plantingDate, harvestDate, growthStage, quantity, price}
            },
            {
                new: true
            }
        ).select("-feildId")
    
        res.status(200)
        .json({
            updateDetails,
            message: "Crop Details Updated successfully"
        })
    } catch (error) {
        console.log("Error in update crop controller: ", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
} 


export {addCrop, uploadCropImage, updateCropDetails}