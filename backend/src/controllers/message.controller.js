import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"
import cloudinary from "../utils/cloudinary.js"
import { getReciverSocketId, io } from "../utils/socket.js"


const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id

        const filteredUsers = await User.find(
            {_id: {
                $ne: loggedInUser
            }}
        ).select("-password")

        return res.status(200)
        .json(filteredUsers)
    } catch (error) {
        console.log("Error in retriving users: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const getMessage = async (req, res) => {
    try {
        const {id} = req.params
        const senderId = req.user._id

        const messages = await Message.find({
            $or: [
                {senderId:senderId, recieverId:id},
                {senderId:id, recieverId:senderId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getting the messages: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body
        const {id} = req.params
        const senderId = req.user._id

        let imageUrl
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            recieverId: id,
            text,
            image: imageUrl
        })

        await newMessage.save()

        const reciverSocketId = getReciverSocketId(id)
        if(reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error in sending a message: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export {getUsers, getMessage,sendMessage}