import Cart from "../models/cartModel.js"

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({}).populate("user").populate("items.product")
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getCart = async (req, res) => {
  try {
    const { id } = req.params
    const cart = await Cart.findById(req.params).populate("user").populate("items.product")
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body)
    res.status(201).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true }).populate("user").populate("items.product")
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params
    const cart = await Cart.findByIdAndDelete(id)
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    res.status(200).json({ message: "Cart deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}