import express from 'express'
import { protctedRoute } from '../middlewares/verifyJWT.js'
import { addFeild, deletefeild, getFeildById, getFeildCrops, getFeilds, updateFeids } from '../controllers/feilds.controller.js'

const router = express.Router()

// Feilds route
router.route("/add-feild").post(protctedRoute, addFeild)
router.route("/get-feilds").get(protctedRoute, getFeilds)
router.route("/get-feild-crops/:id").get(protctedRoute, getFeildCrops)
router.route("/update-feild/:id").patch(protctedRoute, updateFeids)
router.route("/get-feild-by-id/:id").get(protctedRoute, getFeildById)
router.route("/delete-feild/:id").delete(protctedRoute, deletefeild)


export default router