import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/connection.js"

dotenv.config({
    path: './.env',
})

const port = process.env.PORT || 8080

connectDB()

.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed:", err)
    process.exit(1)
})
