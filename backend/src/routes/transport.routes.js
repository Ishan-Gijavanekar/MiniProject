import express from 'express'
import { protctedRoute } from '../middlewares/verifyJWT.js'
import { addTransport, deleteTransport, getTransport, updateTrasport } from '../controllers/transport.controller.js'

const router = express.Router()


// Transportation Routes
router.route("/add-transport").post(protctedRoute, addTransport)
router.route("/get-transport").get(protctedRoute, getTransport)
router.route("/update-transport/:id").patch(protctedRoute, updateTrasport)
router.route("/delete-transport/:id").delete(protctedRoute, deleteTransport)


export default router