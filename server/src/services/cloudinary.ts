import { v2 as cloudinary, ImageTransformationOptions } from "cloudinary";

export class CloudinaryService {
  static toBase64String(file: Express.Multer.File) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;

    return dataURI;
  }

  static async uploadFile(file?: Express.Multer.File, config?: ImageTransformationOptions) {
    if(!file) return;
    
    const image = this.toBase64String(file);

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(image, {
        folder: "cookidge",
        transformation: {
          width: 600,
          crop: "fit",
          gravity: "center",
          aspect_ratio: "1",
          fetch_format: "webp",
          ...config
        },
      })
      .catch((error) => {
        console.log(error);
      });

    return uploadResult;
  }

  static async uploadFiles(files: Express.Multer.File[]) {
    if(!files) return;

    const images = files.map((file) => this.uploadFile(file));
    const uploads = await Promise.all(images);

    return uploads;
  }
}
