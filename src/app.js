import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"20kb"}))
//load all json type and gve a limit of 20kb...
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//to load all url coded option from all users or server
app.use(express.static('public'))
//to save file or folders in pubic folder..

app.use(cookieParser())

export { app }