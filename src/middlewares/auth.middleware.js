import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";
// import cookies from "cookie-parser"
// import { application } from "express";

export const verifyJwt = asyncHandler( async (req, _, next) => {
        try {
            let cookieAccesToken = await req.cookies?.accessToken
            let headderToken = await req.header("Authorization")?.replace("Bearer ", "")
            // console.log(cookieAccesToken);
            // console.log(headderToken);
            const token = cookieAccesToken || headderToken
    
            console.log("token is :", token);
    
            if (!token) {
                throw new ApiError(401, "Unauthorized request");
            }
    
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
            if (!user) {
                throw new ApiError(401, "invalid access token")
            }
    
            req.user = user;
            next()
        } catch (error) {
            throw new ApiError(401, error?.message || "invalid access token!!")
        }
        
    })
        // const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // if (!user) {
        //     throw new ApiError(401, "Invalid Access Token");
        // }

        

