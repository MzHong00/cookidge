import type { JwtPayload } from "jsonwebtoken";
import type { Express, Request } from "express";

import type { IUser } from "../../interface/IUser";
import type { IRefrigerator } from "../../interface/IRefrigerator";

declare global {
  namespace Express {
    interface Request {
      user: IUser | null;
      userId: mongoose.mongo.BSON.ObjectId;
    }
  }
}
