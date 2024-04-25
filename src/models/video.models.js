import mongoose, { Schema } from "mongoose";


const videoSchema = new Schema({
    videoFile: {
        type:String, //clodinary url
        required:[
            true, 
            "without vieo not Acceptable!!"
        ]
    },
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    thumbnail: {
        type:String,// cloudinary url
        required:[
            true,
            "Must be needed!!"
        ]
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    duration: {
        type:Number,
        required:true
    },
    views: {
        type: Number,
        required:true
    },
    ispublished: {
        type: Boolean,
        default:0
    }
},
{
    timestamps:true
}
)


const Video = mongoose.model("Video", videoSchema)