import express,{ Express, Response, Request } from "express";
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

app.get("/hello", async(req: Request, res: Response): Promise<void> => {
    // res.status(200).json({message: "API is running"})
    res.send("Hello, Welcome to my API")
})

app.listen(port,()=>{console.log(`server http://localhost:${port}`)})
