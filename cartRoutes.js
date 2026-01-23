import express from "express"
import {
    getCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart
} from "../controllers/cartController.js"
import { validate } from "../middlewares/validateMiddleware.js"
import { cartSchema } from "../validators/cartValidator.js"

const router = express.Router()

router.get("/", getCarts)
router.get("/:id", getCart)
router.post("/", validate(cartSchema), createCart)
router.put("/:id", validate(cartSchema), updateCart)
router.delete("/:id", deleteCart)

export default router