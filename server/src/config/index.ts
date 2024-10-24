import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

interface Config {
  port: string;
  mongodbPassword: string;
  mongodbName: string;
  jwtAccessKey: string;
  jwtRefreshKey: string;
  googleOAuthClientId: string;
  googleOAuthSecret: string;
}

const config: Partial<Config> = {
  port: process.env.PORT,
  mongodbPassword: process.env.MONGODB_ADMIN_PASSWORD,
  mongodbName: process.env.MONGODB_NAME,
  jwtAccessKey: process.env.JWT_ACCESS_KEY,
  jwtRefreshKey: process.env.JWT_REFRESH_KEY,
  googleOAuthClientId: process.env.CLIENT_ID,
  googleOAuthSecret: process.env.CLIENT_SECRET,
};

export default config;
