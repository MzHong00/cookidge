import { v2 as cloudinary } from "cloudinary";

import config from "../config";

export default async () => {
  cloudinary.config({
    secure: true,
    cloud_name: config.clodinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });
};
