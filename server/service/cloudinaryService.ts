import cloudinary from "#server/utils/cloudinary";

export default class CloudinaryService {
  async upload(image: { data: any }): Promise<any> {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error: any, result: unknown) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(image.data);
    });
  }
  async delete(image: string) {
    const path = image.split("/upload/")[1];
    if(!path)return
    const publicId = path.replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
    return await cloudinary.uploader.destroy(publicId);
  }
}
