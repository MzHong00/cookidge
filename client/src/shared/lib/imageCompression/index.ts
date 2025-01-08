import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 0.3,
  initialQuality: 1,
};

export const compressImage = (file?: File) => {
  try {
    if (!file) return;
    return imageCompression(file, options);
  } catch (error) {
    console.log(error);
  }
};

export const compressImages = async (images?: (File | string)[]) => {
  try {
    if (!images) return;
    return Promise.all(
      Array.from(images).map((file) => {
        return typeof file === "string"
          ? file
          : imageCompression(file, options);
      })
    );
  } catch (error) {
    console.log(error);
  }
};
