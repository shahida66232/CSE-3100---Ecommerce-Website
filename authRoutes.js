import express from 'express'
import { register,login,getProfile,logout } from "../controllers/authController.js"
import { authenticate } from "../middlewares/authMiddleware.js"
import { validate } from '../middlewares/validateMiddleware.js'
import { registerSchema,loginSchema } from '../validators/authValidator.js'

const router=express.Router()

router.post("/register",validate(registerSchema),register)
router.post("/login",validate(loginSchema),login)
router.get("/profile",authenticate,getProfile)
router.post("/logout",authenticate,logout)

export default router