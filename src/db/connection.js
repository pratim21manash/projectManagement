import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DATABASE_URL)
    console.log(`Database connected! DB Host: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("Database connection error:", error)
    process.exit(1)
  }
}

export default connectDB