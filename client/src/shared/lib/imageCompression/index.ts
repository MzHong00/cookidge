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