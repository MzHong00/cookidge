import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "../config";
import routes from "../api/route";

export default (app: Express) => {
  const corsOptions = {
    origin: config.frontEndOrigin,
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use("/api", routes());
};
