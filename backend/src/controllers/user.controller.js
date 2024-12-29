import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import {generateToken} from "../utils/tokenGeneration.js"
import cloudinary from "../utils/cloudinary.js"

const registerUser = async(req, res) => {
    try {
        const {username, password, email, type, fullName} = req.body
        if(!username || !password || !email || !type || !fullName) {
            return res.status(401).json({message: "All feilds are required"})
        }

        if(password.length < 6) {
            return res.status(401).json({message: "Password must be atleast 6 characters"})
        }
        
        const userExists = await User.findOne({
            $or: [{email}, {username}]
        })

        if(userExists) {
            return res.status(401).json({message: "User Already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await new User({
            username,
            password: hashedPassword,
            email,
            fullName,
            type,
        })

        if(user) {
            generateToken(user?._id, res)
            await user.save()

            res.status(200)
            .json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                type: user.type,
                message: "User registered successfully"
            })
        } else {
            return res.status(401).json({message: "User creation falied"})
        }

    } catch (error) {
        console.log("Error in register user: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(401).json({message: "All feilds are required"})
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        generateToken(user?._id, res)

        res.status(200)
        .json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            type: user.type,
            message:"Logged In Successfully"
        })
    } catch (error) {
        console.log("Error in Login controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const logout = async(req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200)
        .json({message: "Logged out Successfully"})
    } catch (error) {
        console.log("Error in Logout controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const forgetPassword = async(req, res) => {
    try {
        const {username, email, password, reEnterPassword} = req.body
        
        if(!username || !email || !password || !reEnterPassword) {
            return res.status(200).json({message: "All feilds are required"})
        }

        if(password.length < 6) {
            return res.status(200).json({message: "Password length must be atleast 6 characters"})
        }

        const user = await User.findOne({
            $and: [{email}, {username}]
        })

        if(!user) {
            return res.status(200).json({message: "Invalid credentials"})
        }

        if(password !== reEnterPassword) {
            return res.status(200).json({message: "Passwords does not match the required configuration"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {password:hashPassword},
            },
            {
                new: true,
            }
        ).select("-password")

        if(updatedUser) {
            return res.status(200)
            .json({
                updatedUser,
                message: "Password updated successfully for the above user"
            })
        }
    } catch (error) {
        console.log("Error in forget password controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateProfilePic = async(req, res) => {
    try{
        const userId = req.user._id
        const {profilePic} = req.body

        if(!profilePic) {
            return res.status(401).json({message: "Picture should be uploaded properly"})
        }

        let imageUrl
        const response = await cloudinary.uploader.upload(profilePic)
        imageUrl = response.secure_url

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {profilePic:imageUrl},
            },
            {
                new: true
            }
        ).select("-password")

        if(updatedUser) {
            return res.status(200)
            .json({
                updatedUser,
                message: "Profile Picture Updated Successfully"
            })
        } else {
            return res.status(401)/json({message: "Error in uploading the profile picture"})
        }
    } catch(error) {
        console.log("Error in Profile picture uploader controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateBackgoundPic = async(req, res) => {
    try{
        const userId = req.user._id
        const {background} = req.body

        if(!background) {
            return res.status(401).json({message: "Picture should be uploaded properly"})
        }

        let imageUrl
        const response = await cloudinary.uploader.upload(background)
        imageUrl = response.secure_url

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {background:imageUrl},
            },
            {
                new: true
            }
        ).select("-password")

        if(updatedUser) {
            return res.status(200)
            .json({
                updatedUser,
                message: "Backgound Picture Updated Successfully"
            })
        } else {
            return res.status(401)/json({message: "Error in uploading the Backgound picture"})
        }
    } catch(error) {
        console.log("Error in Backgound picture uploader controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getUser = async(req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        if(!user) {
            return res.status(401).json({message: "User does not exist"})
        }
        res.status(200).json(
            {
                user,
                message: "User fetched successfully"
            }
        )
    } catch (error) {
        console.log("Error in Getting user uploader controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {registerUser, login, logout, forgetPassword, updateProfilePic, updateBackgoundPic, getUser}