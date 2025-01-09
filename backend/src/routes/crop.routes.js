import express from 'express'
import { protctedRoute } from '../middlewares/verifyJWT.js'
import { addCrop, getAllCrops, getAvaibleStock, getCropById, getCropByIdFromBody, getCrops, updateCropDetails, uploadCropImage } from '../controllers/crops.controller.js'

const router = express.Router()

router.route("/add-crop").post(protctedRoute, addCrop)
router.route("/upload-crop-image").patch(protctedRoute, uploadCropImage)
router.route("/get-crops").get(protctedRoute, getCrops)
router.route("/get-crop/:id").get(protctedRoute, getCropById)
router.route("/get-crop").post(protctedRoute,getCropByIdFromBody)
router.route("/get-stock").get(protctedRoute, getAvaibleStock)
router.route("/update-crop/:id").patch(protctedRoute, updateCropDetails)
router.route("/getAllCrops").get(protctedRoute, getAllCrops)

export default router