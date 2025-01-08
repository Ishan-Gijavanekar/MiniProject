import express from 'express'
import { protctedRoute } from '../middlewares/verifyJWT.js'
import { getMessage, getUsers, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()


// Message Routes
router.route("/get-users").get(protctedRoute, getUsers)
router.route("/get-messages/:id").post(protctedRoute, getMessage)
router.route("/send-message/:id").post(protctedRoute, sendMessage)


export default router