import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path"; // path 모듈 import

import routes from "../api/route";

export default (app: Express) => {
  const corsOptions = {
    // origin: "http://localhost:3000",
    credentials: true,
  };
  const swaggerYaml = YAML.load(
    path.join(__dirname, "../config/swagger/openapi.yaml")
  );

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerYaml));
};
