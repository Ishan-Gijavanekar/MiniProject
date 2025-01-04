import { Avaiblity } from "../models/avaibleVechile.model"
import { Route } from "../models/route.model"

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



export {bookVechile, addRoute, deleteRoute}