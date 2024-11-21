import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 1024 * 1024 },
});
