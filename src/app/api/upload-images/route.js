import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const data = await req.formData();
    const file = data.get("file");

    const uploadResult = await cloudinary.uploader.upload(file, {
      upload_preset: "shriJiOpticals",
    });

    return Response.json({ Success: true, url: uploadResult.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ Success: false, message: "Upload failed" });
  }
}
