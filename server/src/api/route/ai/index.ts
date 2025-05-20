import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { receiptOCR } from "../../../services/receiptOCR";

const route = Router();

export default (app: Router) => {
  app.use("/ai", route);

  route.post(
    "/ocr/receipt",
    celebrate({
      [Segments.BODY]: Joi.object({
        picture: Joi.string(),
      }),
    }),
    async (req, res) => {
      try {
        const { picture } = req.body as { picture: string };
        const ocrResult = await receiptOCR(picture);

        return res.status(200).json(ocrResult);
      } catch (error) {
        console.log("에러:", error);
        return res.status(500).json({ message: "Gemini AI 생성 에러" });
      }
    }
  );
};
