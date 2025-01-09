import Resizer from "react-image-file-resizer";

export const resizeFile = (file?: File) => {
  if(!file) return; 

  return new Promise((resolve) => {
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
  });
};
