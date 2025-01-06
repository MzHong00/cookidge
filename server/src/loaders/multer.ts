import multer from "multer";

const MB = 1024 * 1024;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * MB },
});
