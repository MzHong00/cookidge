import express from "express";
import config from "../src/config";

import loaders from "../src/loaders";

async function server() {
  const app = express();

  await loaders({
    expressApp: app,
  });
  
  app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
  });
}

server();
