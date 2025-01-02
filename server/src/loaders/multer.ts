import multer from "multer";

const TEN_MB = 10 * 1024 * 1024;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: TEN_MB },
});
