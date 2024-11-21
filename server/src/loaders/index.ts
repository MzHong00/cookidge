import { type Express } from "express";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import cloudinaryLoader from "./cloudinary";

export default async ({ expressApp }: { expressApp: Express }) => {
  expressLoader(expressApp);
  await mongooseLoader();
  await cloudinaryLoader();
};
