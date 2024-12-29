import express from 'express'
import { forgetPassword, getUser, login, logout, registerUser, updateBackgoundPic, updateProfilePic } from '../controllers/user.controller.js'
import {protctedRoute} from "../middlewares/verifyJWT.js"

const router = express.Router()

router.post("/register" ,registerUser)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/forgetPassword").post(forgetPassword)
router.route("/update-profilePic").post(protctedRoute, updateProfilePic)
router.route("/update-backgroundPic").post(protctedRoute, updateBackgoundPic)
router.route("/get-user").get(protctedRoute,getUser)

export default router