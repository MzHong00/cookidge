interface Config {
  server_api: string;
  cloudinary_name: string;
}

const config: Partial<Config> = {
  server_api: process.env.REACT_APP_SERVER_API,
  cloudinary_name: process.env.REACT_APP_CLOUDINARY_NAME,
};

export default config;
