import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

export class CloudinaryService {
  static toBase64String(file: Express.Multer.File) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;

    return dataURI;
  }

  static async uploadFile(
    image?: Express.Multer.File | string,
    config?: UploadApiOptions
  ) {
    const { folder, transformation, ...cld_config } = config || {};
    if (!image) return;

    const file = typeof image === "string" ? image : this.toBase64String(image);

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(file, {
        folder: `cookidge/${folder}`,
        transformation: {
          height: 1000,
          crop: "fit",
          gravity: "center",
          aspect_ratio: 1,
          fetch_format: "auto",
          ...(transformation as Object),
        },
        ...cld_config,
      })
      .catch((error) => {
        console.log(error);
      });

    return uploadResult;
  }

  static async uploadFiles(
    files: (Express.Multer.File | string)[],
    config?: UploadApiOptions
  ) {
    const images = files.map((file) => this.uploadFile(file, config));
    const uploads = await Promise.all(images);

    return uploads;
  }

  static async uploadImageByBase64(image: string, config?: UploadApiOptions) {
    const { folder, transformation, ...cld_config } = config || {};

    const uploadResult = await cloudinary.uploader
      .upload(image, {
        folder: `cookidge/${folder}`,
        transformation: {
          height: 1000,
          crop: "fit",
          gravity: "center",
          aspect_ratio: 1,
          fetch_format: "auto",
          ...(transformation as Object),
        },
        ...cld_config,
      })
      .catch((error) => {
        console.log(error);
        throw error
      });

    return uploadResult;
  }

  static async uploadImagesByBase64(
    images: string[],
    config?: UploadApiOptions
  ) {
    const result = images.map((image) => this.uploadFile(image, config));
    const uploadedResult =  await Promise.all(result);

    return uploadedResult;
  }

  static async deleteFiles(files: string[]) {
    if (files.length === 0) return;

    return cloudinary.api.delete_resources(files);
  }
}
