import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb connected on ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error in db connection: ", error)
        return
    }
}

export {connectDb}