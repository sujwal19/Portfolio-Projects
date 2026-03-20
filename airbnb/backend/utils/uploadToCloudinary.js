import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (
  fileBuffer,
  folder = "airbnb_images",
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(fileBuffer);
  });
};
