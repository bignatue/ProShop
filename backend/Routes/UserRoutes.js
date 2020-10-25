import express from 'express'
const  router = express.Router()
import {authUser, registerUser, getUserProfile} from '../Controllers/UserControllers.js'
import { protect } from '../Middleware/AuthMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
