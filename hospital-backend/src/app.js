import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import patientRouter from "./routes/Patients.routes.js"


//routes declaration
app.use("/api/v1/patients",patientRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export {app}