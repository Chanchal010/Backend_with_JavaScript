import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required:true,
            trim:true,
            index:true,
            lowercase:true,
            unique:true
        },
        email: {
            type: String,
            required:true,
            trim:true,
            lowercase:true,
            unique:true
        },
        fullName: {
            type: String,
            required:true,
            trim:true,
        },
        avatar: {
            type : String, // cloudinary link
            required:true,
        },
        coverImage: {
            type : String, // cloudinary link
            required:true,
        },
        watchHistory: [
            {
                type:Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type:String,
            required: [
                true,
                "password must be required"
            ]
        },
        refreshToken: {
            type:String,
        }
    },
    {timestamps:true}
)

userSchema.pre("save", async function (next){
    if(! this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
//methods. use for creating methods...
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =  function () {
    return jwt.sign(
        {
            _id : this._id,
            userName: this.userName,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPAIRY
        }
    )
}
userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPAIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)