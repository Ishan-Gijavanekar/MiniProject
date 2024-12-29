import express from 'express'
import { protctedRoute } from '../middlewares/verifyJWT.js'
import { addCrop, uploadCropImage } from '../controllers/crops.controller.js'

const router = express.Router()

router.route("/add-crop").post(protctedRoute, addCrop)
router.route("/upload-crop-image").patch(protctedRoute, uploadCropImage)


export default router