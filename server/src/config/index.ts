interface Config {
  port: string;
  jwtSecretKey: string;
  mongodbPassword: string;
  mongodbName: string;
  googleOAuthClientId: string;
  googleOAuthSecret: string;
  clodinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
}

const config: Partial<Config> = {
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  mongodbPassword: process.env.MONGODB_ADMIN_PASSWORD,
  mongodbName: process.env.MONGODB_NAME,
  googleOAuthClientId: process.env.CLIENT_ID,
  googleOAuthSecret: process.env.CLIENT_SECRET,
  clodinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
};

export default config;
