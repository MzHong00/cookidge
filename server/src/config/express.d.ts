import {Express, Request} from "express";
import { IUser } from "../interface/IUser";
import { IRefrigerator } from "../interface/IRefrigerator";

declare global{
	namespace Express {
		export interface Request {
		  user?: IUser | null;
		  jwtPayload: any;
		}
	}
}