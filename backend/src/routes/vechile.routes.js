import express from 'express'
import { protctedRoute } from '../middlewares/verifyJWT.js'
import { addVechile, deleteVechiles, getVechiles, updateDetails, uploadVechileImage } from '../controllers/vechile.controller.js'

const router = express.Router()

// Vechile Routes
router.route("/add-vechile/:id").post(protctedRoute, addVechile)
router.route("/upload-image").patch(protctedRoute, uploadVechileImage)
router.route("/update-details/:id").patch(protctedRoute, updateDetails)
router.route("/get-vechiles/:id").get(protctedRoute, getVechiles)
router.route("/delete-vechile/:id").get(protctedRoute, deleteVechiles)


export default router