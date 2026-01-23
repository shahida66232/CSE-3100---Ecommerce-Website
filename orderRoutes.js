import express from "express"
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js"
import { validate } from "../middlewares/validateMiddleware.js"
import { orderSchema } from "../validators/orderValidator.js"

const router = express.Router()

router.get("/", getOrders)
router.get("/:id", getOrder)
router.post("/",validate(orderSchema), createOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)

export default router