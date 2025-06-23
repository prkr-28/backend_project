import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(localFilePath) {
  if (!localFilePath) {
    console.error("File does not exist:", localFilePath);
    return null;
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("Upload successful:", uploadResult);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the local saved temp file as upload failed...
    console.error("Upload failed:", error);
    return null;
  }
}

export { uploadToCloudinary };
