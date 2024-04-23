import mongoose from "mongoose";
import { DB_NAME } from "../constatant.js"; 



const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    console.log("connectionInstance is :", connectionInstance);
  } catch (error) {
    console.log("MongoDB CONNECTION FAILED !! ", error);
    process.exit(1) 
  }
}

// No errors found in the provided code


export default connectDB