import mongoose, { Schema } from "mongoose";


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
            
        }
    },
    {timestamps:true}
)


const User = mongoose.model("User", userSchema)