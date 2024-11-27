import { Express, Request } from "express";

import { IUser } from "../../interface/IUser";
import { IRefrigerator } from "../../interface/IRefrigerator";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user: IUser | null;
	    userId: mongoose.mongo.BSON.ObjectId
    }
  }
}
