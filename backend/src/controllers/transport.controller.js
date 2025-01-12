import { Transport } from "../models/transport.model.js"
import { Vechile } from "../models/Vechile.model.js"
import { transportgenerateToken } from "../utils/tokenGeneration.js"


const addTransport = async (req, res) => {
    try {
        const {transportName, BaseLocation, contactNumber} = req.body
        const userId = req.user._id

        if(!transportName || !BaseLocation || !contactNumber) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }

        const existingTransport = await Transport.find({contactNumber})

        if(!existingTransport) {
            return res.status(401)
            .json({
                message: "Transport already exists"
            })
        }

        const transport = await new Transport({
            transportName,
            BaseLocation,
            contactNumber,
            user: userId
        })

        if(transport) {
            await transport.save()
            transportgenerateToken(transport?._id, res)
            res.status(200)
            .json({
                transport,
                message: "Transport Registered successfully"
            })
        } else {
            res.status(200)
            .json({
                message: "Something went wronge while uploading the data to database"
            })
        }
    } catch (error) {
        console.log("Error in addTransport", error)
        res.status(500)
        .json({
            message: "Internal server error"
        })
    }
}


const getTransport = async(req, res) => {
    try {
        const userId = req.user
    
        if(!userId) {
            return res.status(401)
            .json({
                message: "Please login first"
            })
        }
    
        const transports = await Transport.find({user: userId._id})
    
        if(!transports) {
            return res.status(401)
            .json({
                message: "Transportation company not registered"
            })
        }
    
        res.status(200).json({
            transports,
            message: "All transportations avaible"
        })
    } catch (error) {
        console.log("Error in getting the transports: ", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const updateTrasport = async (req, res) => {
    try {
        const {transportName, BaseLocation, contactNumber} = req.body
        const {id} = req.params

        if(!transportName || !BaseLocation || !contactNumber) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }

        if (!id) {
            return res.status(401)
            .json({
                message: "Id is missing in link"
            })
        }

        const updatedTransport = await Transport.findByIdAndUpdate(
            id,
            {
                transportName, 
                BaseLocation, 
                contactNumber
            },
            {
                new: true
            }
        )

        if (!updatedTransport) {
            return res.status(401)
            .json({
                message: "Something went wronge"
            })
        } else {
            return res.status(200)
            .json({
                updatedTransport,
                message: "Updated Successfully"
            })
        }


    } catch (error) {
        console.log("Error in update transport: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const deleteTransport = async (req, res) => {
    try {
        const {id} = req.params

        if(!id) {
            return res.status(401)
            .json({
                message: "Id is missing in link"
            })
        }

        const vechiles = await Vechile.find({transporter: id})
        if(vechiles) {
            return res.status(401)
            .json({
                message: "Vechiles are registred under this you can't delete"
            })
        }
        await Transport.findByIdAndDelete(id)
        return res.status(200)
        .json({
            message: "Transport deleted successfully"
        })
    } catch (error) {
        console.log("Error in delete transport: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const getTransportById = async (req, res) => {
    try { 
        const { id } = req.params; 

        const transport = await Transport.findById(id) 
        if (!transport) { 
            return res.status(404).json({ message: "Transport Company not found" }); 
        } 
        
        return res.status(200).json({ transport });
    } catch (error) { 
        console.log("Error in getting transport by id ", error.message); 
        res.status(500).json({ message: "Internal server error" }); 
    }
}

export {addTransport, getTransport, updateTrasport, deleteTransport, getTransportById}