import { GoogleGenAI } from "@google/genai";

import config from "../config";

const prompt = `
요구사항: 이미지가 영수증이 아니거나 글자가 없을 때 빈 배열을 반환해주고, JSON 형태로 name과 quantity로 데이터를 정리해줘
추가 요구사항:
- 식재료들만 값에 포함
- 모든 값은 문자열
- 이미지에 분석 중 문제가 발생할 때 빈 배열 반환`;

export async function receiptOCR(picture: string) {
  const ai = new GoogleGenAI({ apiKey: config.googleGeminiApiKey });

  // 이미지 URL을 base64로 변경 (프론트에서 인코딩한 base64를 바로 사용하면 에러가 발생했음)
  const response = await fetch(picture);
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

  // gemini 영수증 이미지 분석 결과
  const geminiRes = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      { text: prompt },
    ],
  });

  try {
    // 결과 문자열 파싱 (특이점 발생시 빈배열 반환)
    const geminiResText = geminiRes.text;
    console.log(geminiResText);
    
    if (!geminiResText) return [];

    const start = geminiResText.indexOf("[");
    const end = geminiResText.lastIndexOf("]") + 1;

    if (start === -1 || end === -1) {
      return [];
    } else {
      const extracted = geminiResText.slice(start, end);
      const parsedResult = JSON.parse(extracted);

      return parsedResult;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
