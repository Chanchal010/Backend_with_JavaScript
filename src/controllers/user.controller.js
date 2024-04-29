import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
// import bcrypt from "bcrypt"

const registerUser = asyncHandler(async (req,res) => {
    // get user details from frontend
    // validation -- check user details are not empty
    // check if the user already exits: (email, username)
    // check for images and check avatar
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

    const existedUser = await User.findOne({
        $or:[
            { userName },
            { email }
        ]
    })

    if (existedUser) {
        throw new ApiError(409, "User already existed")
    }

    const avatarLocalFilepath = await req.files?.avatar[0]?.path
    // const coverImageLocalFilepath = req.files?.coverImage[0]?.path

    if (!avatarLocalFilepath) {
        throw new ApiError(400, "avatar is required!!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalFilepath)
    // const coverImage = await uploadOnCloudinary(coverImageLocalFilepath)

    if (!avatar) {
        throw new ApiError(400, "avatar is required!!!!")
    }


    const user = await User.create({
        fullName,
        userName: userName.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Somthig went wrong while registering user")
    }

    return res
    .status(201)
    .json(
        new ApiResponce(
            200,
            createdUser,
            "user created succesfully"
        )
    )

})
export {
    registerUser,
}