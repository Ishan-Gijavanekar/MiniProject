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

const uploadCropImage = async (req, res) => {
    try {
      const { farmId, cropId, cropImage } = req.body;
  
      if (!farmId || !cropId) {
        return res.status(400).json({ message: "farmId and cropId must be provided" });
      }
  
      if (!cropImage) {
        return res.status(400).json({ message: "Crop Image should be selected properly" });
      }
  
      const crop = await Crop.findOne({ feildId: farmId, _id: cropId });
  
      if (!crop) {
        return res.status(404).json({ message: "Crop not found with the given farmId and cropId" });
      }
  
      const response = await cloudinary.uploader.upload(cropImage);
      const imageUrl = response.secure_url;
  
      const uploadImage = await Crop.findByIdAndUpdate(
        crop._id,
        { cropImage: imageUrl },
        { new: true }
      );
  
      if (uploadImage) {
        return res.status(200).json({ uploadImage, message: "Image uploaded successfully" });
      } else {
        return res.status(500).json({ message: "Error updating crop image" });
      }
    } catch (error) {
      console.log("Error in uploadCropImage controller: ", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

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
                cropName, 
                variety, 
                plantingDate, 
                harvestDate, 
                growthStage, 
                quantity, 
                price
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

const getCrops = async (req, res) => {
    try {
        const userId = req.user._id

        const crops = await Crop.find({farmerId: userId})

        res.status(200)
        .json({
            crops
        })
    } catch (error) {
        console.log("Error in getting the crops: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const getCropById = async (req, res) => {
    try { 
        const { id } = req.params; 
        const crop = await Crop.findById(id) 
        .populate('feildId') 
        .populate('farmerId'); 
        
        if (!crop) { 
            return res.status(404).json({ message: "Crop not found" }); 
        } 
        
        res.status(200)
        .json({ crop }); 
    } catch (error) { 
        console.log("Error in getting crop by id ", error.message); 
        res.status(500).json({ message: "Internal server error" }); 
    }
}

const getCropByIdFromBody = async (req, res) => {
    try {
        const {id} = req.body
        const crop = await Crop.findById(id)

        res.status(200)
        .json({
            crop
        })
    } catch (error) {
        console.log("Error in getting crop by id ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const getAvaibleStock = async (req, res) => { 
    try {
        const userId = req.user._id; // Get userId from request

        const stocks = await Stock.find()
            .populate({
                path: 'crop',
                model: Crop,
                match: { farmerId: userId }, // Filter crops by the logged-in user's ID
                populate: {
                    path: 'feildId',
                    model: Feild,
                    match: { farmerId: userId } // Filter fields by the logged-in user's ID
                }
            })
            .populate({
                path: 'feild',
                match: { farmerId: userId } // Filter fields by the logged-in user's ID
            });

        // Filter out stocks where crops or fields don't match the userId
        const filteredStocks = stocks.filter(stock => stock.crop && stock.feild);

        return res.status(200).json({ stocks: filteredStocks });
    } catch (error) {
        console.log("Error in getAvailableStock", error);
        return res.status(500).json({ error: error.message });
    }

}

export {addCrop, uploadCropImage, updateCropDetails, getCrops, getCropById, getAvaibleStock, getCropByIdFromBody}