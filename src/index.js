import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import { app } from "../src/app.js"
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8080 , () =>{
        console.log(`Server running at port : ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Mongo DB connectin !! error or failed !!", error);
})
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
// })