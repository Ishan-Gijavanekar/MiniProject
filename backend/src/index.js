import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from './db/connection.js'
import userRoutes from "./routes/user.routes.js"
import feildRoutes from './routes/feilds.route.js'
import cropRoutes from './routes/crop.routes.js'
import transportRoutes from './routes/transport.routes.js'
import messageRoutes from './routes/message.routes.js'
import vechileRoutes from './routes/vechile.routes.js'
import { app, server } from './utils/socket.js'


const port = process.env.PORT;


// Middlewares
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended:true, limit: "50mb"}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))

// Routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/feilds", feildRoutes)
app.use("/api/v1/crops", cropRoutes)
app.use("/api/v1/transport", transportRoutes)
app.use("/api/v1/messages", messageRoutes)
app.use("/api/v1/vechiles", vechileRoutes)



server.listen(port, () => {
    connectDb()
    console.log(`Server is running on port ${port}`)
})