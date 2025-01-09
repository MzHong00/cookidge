import Resizer from "react-image-file-resizer";

export const resizeFile = (file: File) => {
  return new Promise((resolve, reject) => {
    try {
      Resizer.imageFileResizer(
        file,
        600,
        600,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    } catch (error) {
      reject(error)
    }
  });
};
