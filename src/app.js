import express from "express"

const app = express()

//Middleware setup
app.use(express.json({limit: "16kb"})) // to make readable clients json.body
app.use(express.urlencoded({extended: true, limit: "16kb"})) // this will encode our url for safety reson
app.use(express.static('public')) // this tells express about never changing files/data

app.get("/", (req,res)=>{
    res.end("Hello World India")
})

export default app;