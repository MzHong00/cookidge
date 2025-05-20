import { type UploadApiOptions, v2 as cloudinary } from "cloudinary";

export class CloudinaryService {
  static async uploadFile(image?: string, config?: UploadApiOptions) {
    const { folder, transformation, ...cld_config } = config || {};
    if (!image) return;

    // Upload an image
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
      });

    return uploadResult;
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
        throw error;
      });

    return uploadResult;
  }

  static async uploadImagesByBase64(
    images: string[],
    config?: UploadApiOptions
  ) {
    const result = images.map((image) => this.uploadFile(image, config));
    const uploadedResult = await Promise.all(result);

    return uploadedResult;
  }

  static async deleteFiles(files: string[]) {
    if (files.length === 0) return;

    return cloudinary.api.delete_resources(files);
  }
}
