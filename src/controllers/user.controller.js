import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave:false })

    return { accessToken, refreshToken }

}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation -- check user details are not empty
    // check if the user already exits: (email, username)
    // check for images and check avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in DB
    // remove password and refresh token field from res
    // check user creation 
    // return res

    const { fullName, userName, email, password } = req.body
    console.log(fullName, userName, email, password);

    let emtyInfo = [fullName, userName, email, password].some((fields) => fields?.trim())

    if (emtyInfo === "")
     {
        throw new ApiError(401, "all details are required")
    }

    const existedUser = await User.findOne({
        $or: [
            { userName },
            { email }
        ]
    })

    if (existedUser) {
        throw new ApiError(409, "User already existed")
    }

    const avatarLocalFilepath = req.files?.avatar?.[0]?.path

    let coverImageLocalFilepath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalFilepath = req.files.coverImage[0].path
    }

    // The error was here - avatar was being checked before it was set
    if (!avatarLocalFilepath) {
        throw new ApiError(400, "avatar is required!!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalFilepath)
    const coverImage = await uploadOnCloudinary(coverImageLocalFilepath)

    if (!avatar) {
        throw new ApiError(400, "avatar is required!!!!")
    }


    const user = await User.create({
        fullName,
        userName: userName,
        // userName: userName.to_lowercase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
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

const loginUser = asyncHandler(async (req, res) => {
    // req.body -> data
    // username or email check
    // find the user
    // password check
    // accessToken and refresh token --> user
    // send cookie
    
    const {userName, email, password} = req.body

    if (!(userName || email)) {
        throw new ApiError(400, "userName and email rquired..")
    }

    const user = await User.findOne({
        $or:[
            { userName },
            { email }
        ]
    })

    if (!user) {
        throw new ApiError(404, "user does not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid User Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    // console.log(accessToken);
    // console.log(refreshToken);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponce(
            201,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "user logged In succcessfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponce(
            200,
            {},
            "User logged Out"
        )
    )
})
const refreshAccessToken = asyncHandler(async (rq, res) => {
    // req.cokkies --> refresh token
    // validate the token
    // verify the token with secret token
    // find user using token
    // validate user 
    // check user token === cokkies token
    // send res

    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorised Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponce(
                200,
                {accessToken, refreshToken:newRefreshToken},
                "Access Token refreshed succesfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid refreshed Token!!")
    }
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}
