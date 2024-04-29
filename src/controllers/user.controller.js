import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/apiError.js"
const registerUser = asyncHandler(async (req,res) => {
    // get user details from frontend
    // validation -- check user details are not empty
    // check if the user already exits: (email, username)
    // check for images and avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in DB
    // remove password and refresh token field from res
    // check user creation 
    // return res

    const {fullName, userName, email, password} = req.body
    console.log(fullName, userName, email, password);

    if(
        [fullName, userName, email, password].some((fields) => 
        fields?.trim() === "")
    ){
        throw new ApiError(401, "all details are required")
    }

    
})
export {
    registerUser,
}