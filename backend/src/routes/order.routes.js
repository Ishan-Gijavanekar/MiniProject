import express from 'express'
import { calculateDistance, calculatePrice, getOrderById, getOrders, orderController, payment } from '../controllers/orders.controller.js'
import { protctedRoute } from '../middlewares/verifyJWT.js'


const router = express.Router()


router.route("/calculate-distance").post(protctedRoute,calculateDistance)
router.route("/calculate-price").post(protctedRoute, calculatePrice)
router.route("/place-order").post(protctedRoute, orderController)
router.route("/get-orders").get(protctedRoute, getOrders)
router.route("/make-payment").post(payment)
router.route("/getOrderById/:id").get(protctedRoute, getOrderById)

export default router