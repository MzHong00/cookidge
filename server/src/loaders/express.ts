import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import YAML from "yamljs";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import config from "../config";
import routes from "../api/route";

export default (app: Express) => {
  console.log(config.frontEndOrigin);
  
  const corsOptions = {
    origin: config.frontEndOrigin,
    credentials: true,
  };
  const swaggerYaml = YAML.load(
    path.join(__dirname, "../lib/swagger/openapi.yaml")
  );

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerYaml));
};
