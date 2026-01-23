import express from "express"
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"
import { productSchema } from "../validators/productValidator.js"
import { validate } from "../middlewares/validateMiddleware.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/",validate(productSchema),createProduct)
router.put("/:id",validate(productSchema.partial()),updateProduct)
router.delete("/:id", deleteProduct)

export default router