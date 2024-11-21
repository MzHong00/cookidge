import {Express, Request} from "express";
import { IUser } from "../../interface/IUser";
import { IRefrigerator } from "../../interface/IRefrigerator";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload{
	id: string;
}

declare global{
	namespace Express {
		export interface Request {
		  user?: IUser | null;
		  jwtPayload: CustomJwtPayload;
		}
	}
}