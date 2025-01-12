import { Avaiblity } from "../models/avaibleVechile.model.js"
import { Crop } from "../models/crop.model.js"
import { Order } from "../models/order.model.js"
import { Route } from "../models/route.model.js"
import { Vechile } from "../models/Vechile.model.js"
import {GoogleGenerativeAI} from '@google/generative-ai'
import {v4 as uuidv4} from 'uuid'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.SECRET_KEY)


 const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_SECRET)

const bookVechile = async (req, res) => {
    try {
        const {id} = req.params
        const {BookingDate, status, days} = req.body
    
        if (!BookingDate || !status || !days) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }
    
        for(let i=1;i<=days;i++) {
            const booking = await new Avaiblity({
                BookingDate: BookingDate + i,
                status,
                vechile: id,
            })

            await booking.save()

            res.status(200)
            .json({
                booking
            })
        }
        
    
        return res.status(200)
        .json({
            message: `Vechile Booked successfully for ${days} days`
        })
    } catch (error) {
        console.log("Error in booking Vechile ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const addRoute = async (req, res) => {
    try {
        const {startLocation, endLocation, distance} = req.body

        if (!startLocation || !endLocation || !distance) {
            return res.status(401)
            .json({
                message: "All feilds are required"
            })
        }

        const routeexists = await Route.findOne({
            $and: [{startLocation}, {endLocation}]
        })

        if (routeexists) {
            return res.status(401)
            .json({
                message: "Route already exists"
            })
        }

        const route = await new Route({
            startLocation,
            endLocation,
            distance
        })

        await route.save()

        return res.status(200)
        .json({
            route,
            message: "Route added successfully"
        })
    } catch (error) {
        console.log("Error in adding routes ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const deleteRoute = async (req, res) => {
    try {
        const {startLocation, endLocation} = req.body

        const route = await Route.findOne({
            $and: [{startLocation}, {endLocation}]
        })

        if (!route) {
            return res.status(401)
            .json({
                message: "Route does not exist"
            })
        }

        await Route.findByIdAndDelete(route._id)

        return res.status(200)
        .json({
            message: "Route deleted successfully"
        })
    } catch (error) {
        console.log("Error in delete route ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const orderController = async (req, res) => {
    try {
        const user = req.user._id
        const {vechile, transport, field, crop, quantity, price, location} = req.body

        if (!vechile || !transport || !field || !crop || quantity || !price || !location) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        const order = await new Order({
            vechile,
            transport,
            feildId: field,
            crop,
            quantity,
            price: 1.18 * parseInt(price),
            location,
            user
        })

        if (order) {
            await order.save()

            return res.status(200)
            .json({
                order,
                message: "Order placed successfully"
            })
        }

    } catch (error) {
        console.log("Error in placing order: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const calculatePrice = async (req, res) => {
    try {
        const {quantity, crop, distance, vehicle} = req.body

        if (!quantity || !crop) {
            return res.status(401)
            .json({message: "All feilds are required"})
        }

        const cropdetails = await Crop.findById(crop)

        const vehicleDetails = await Vechile.findById(vehicle)

        if(!cropdetails || !vehicleDetails) {
            return res.status(401)
            .json({message: "Invalid Crop Id"})
        }

        const price = cropdetails.price
        const vehiclePrice = vehicleDetails.cost
        const estimatedPrice = (parseInt(price) * quantity) + (vehiclePrice*distance)

        return res.status(200)
        .json({
            price: estimatedPrice,
            message: "Price generated successfully"
        })
    } catch (error) {
        
    }
}

const calculateDistance = async (req, res) => {
    try {
        const { startLoc, endLoc } = req.body;
    
        if (!startLoc || !endLoc) {
            return res.status(401).json({ message: "All fields are required" });
        }
    
        const model = genAi.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
    
        const inlineData = Buffer.from(`Calculate distance between ${startLoc} and ${endLoc}`).toString('base64');
    
        const result = await model.generateContent([
            `Give me the round figured distance in kilometers without decimal points between ${startLoc} and ${endLoc} only the number no text`,
            {
                inlineData: {
                    mimeType: 'text/plain',
                    data: inlineData
                }
            },
        ]);
    
        const dist = result.response.text();
        return res.status(200).json({
            distance: dist,
            message: "Distance fetched successfully"
        });
    
    } catch (error) {
        console.log("Error in getting distance ", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

const getOrders = async (req, res) => {
    try {
        const user = req.user._id

        const allorders = await Order.find({user})
        .populate("user")
        .populate("vechile")
        .populate("crop")
        .populate("feildId")
        .populate("transport")

        if (allorders.length > 0) {
            return res.status(401)
            .json({message: "No Orders avaible"})
        }

        return res.status(200)
        .json({
            allorders
        })

    } catch (error) {
        console.log("Error in getting orders ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const payment = async (req, res) => {
    try {
        const { amount } = req.body;
    
        const paymentIntent = await stripe.paymentIntents.create({
          amount, // in cents
          currency: "usd",
          payment_method_types: ["card"],
        });
    
        res.status(200).send(paymentIntent);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    
}

export {bookVechile, addRoute, deleteRoute, calculateDistance, calculatePrice, orderController, getOrders, payment}