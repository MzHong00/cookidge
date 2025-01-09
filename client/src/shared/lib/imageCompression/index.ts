import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 0.3,
  initialQuality: 1,
  useWebWorker: true
};

export const compressImage = (file?: File) => {
  if (!file) return;
  return imageCompression(file, options);
};

export const compressImages = async (images?: (File | string)[]) => {
  if (!images) return;
  return Promise.all(
    Array.from(images).map((file) => {
      return typeof file === "string" ? file : imageCompression(file, options);
    })
  );
};
