import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "../config";
import routes from "../api/route";

export default (app: Express) => {
  const corsOptions = {
    origin: "*",
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes());
};
