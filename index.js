import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from"./routes/cartRoutes.js"

dotenv.config()
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/carts",cartRoutes)


app.get("/",(req,res)=>{
    res.send("Backend is working")
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongoose is connected")
}).catch(errro=>{
    console.log(errro)
})

const  PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Runnning in http://localhost:${PORT}`)
})