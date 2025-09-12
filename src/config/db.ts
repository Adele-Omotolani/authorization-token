import mongoose from "mongoose"
import "dotenv/config"

export const connectDB = async():Promise<void> =>{
const MONGODB_URL = process.env.MONGODB_URL
if(!MONGODB_URL){
  console.error("Missing MONGODB_URL in env")
  throw new Error("Missing MONGODB_URL")
}
try{
await mongoose.connect(MONGODB_URL)
console.log("Connected DB");
}catch(err:unknown){
  console.error("Error connecting to DB",err)
}
}