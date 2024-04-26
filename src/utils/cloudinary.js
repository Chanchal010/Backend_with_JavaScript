import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_NAME , 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET  
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        //file hass been uploaded
        console.log("file has been uploaded on cloudinary successfully ", responce.url);
        console.log("respose of file upload",responce);

        return responce
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary }
