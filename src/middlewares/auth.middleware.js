// import { ApiError } from "../utils/ApiError.js";
// // import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken"
// // import { User } from "../models/user.models.js";
// // import cookies from "cookie-parser"

// export const verifyJwt =  (req, res, next) => {
//         const token = req.cookies?.accessToken


//         console.log("token is :", token);

//         if (!token) {
//             throw new ApiError(401, "Unauthorized request");
//         }
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
//             if (err) {
//                 throw new ApiError(401, "Invalid Access Token");
//             }
//             req.user = user;
//             next()
//         });
        
//     }
//         // const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

//         // if (!user) {
//         //     throw new ApiError(401, "Invalid Access Token");
//         // }

        

