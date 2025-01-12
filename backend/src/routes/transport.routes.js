import express from 'express'
import { protctedRoute } from '../middlewares/verifyJWT.js'
import { addTransport, deleteTransport, getTransport, getTransportById, updateTrasport } from '../controllers/transport.controller.js'

const router = express.Router()


// Transportation Routes
router.route("/add-transport").post(protctedRoute, addTransport)
router.route("/get-transport").get(protctedRoute, getTransport)
router.route("/update-transport/:id").patch(protctedRoute, updateTrasport)
router.route("/delete-transport/:id").delete(protctedRoute, deleteTransport)
router.route("/get-transport/:id").get(protctedRoute, getTransportById)


export default router