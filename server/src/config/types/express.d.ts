import { JwtPayload } from "jsonwebtoken";
import { Express, Request } from "express";

import { IUser } from "../../interface/IUser";
import { IRefrigerator } from "../../interface/IRefrigerator";

declare global {
  namespace Express {
    interface Request {
      user: IUser | null;
      userId: mongoose.mongo.BSON.ObjectId;
    }
  }
}
