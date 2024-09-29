import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "api/route";

export default (app: Express) => {
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api", routes);
};
