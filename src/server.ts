import express,{ Express } from "express";
import { connectDB } from "./config/db";
import { UserRoutes } from "./routes/userRoutes";
import { bookRoutes } from "./routes/bookRoutes";
import { adminRouter } from "./routes/adminRoutes";

const app:Express = express()
app.use(express.json())
const port = process.env.PORT
connectDB()

app.use("/api",UserRoutes)
app.use("/api",bookRoutes)
app.use("/api",adminRouter)

app.listen(port,()=>{console.log(`server http://localhost:${port}`)})
