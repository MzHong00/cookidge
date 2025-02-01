import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config";
import { User } from "../models/user";
import { CloudinaryService } from "./cloudinary";
import { type IUserCreateInputDTO } from "../interface/IUser";

const ACCESS_TOKEN_EXPIRE_TIME = "1h";
const REFRESH_TOKEN_EXPIRE_TIME = "24h";

export const signin = async (googleUserInfo: IUserCreateInputDTO) => {
  try {
    const user = await User.findOne({ email: googleUserInfo.email });

    if (!user) return signup(googleUserInfo);

    return {
      refresh_token: issueToken(
        { id: user._id.toString() },
        REFRESH_TOKEN_EXPIRE_TIME
      ),
      access_token: issueToken({ id: user._id.toString() }),
    };
  } catch (error) {
    throw new Error(`로그인 오류: ${error}`);
  }
};

export const signup = async (userInputDto: IUserCreateInputDTO) => {
  try {
    const picture = await CloudinaryService.uploadFile(userInputDto.picture, {
      folder: "profiles",
    });

    const user = await User.create({
      name: userInputDto.name,
      email: userInputDto.email,
      picture: picture?.public_id,
    });

    return {
      refresh_token: issueToken(
        { id: user._id.toString() },
        REFRESH_TOKEN_EXPIRE_TIME
      ),
      access_token: issueToken({ id: user._id.toString() }),
    };
  } catch (error) {
    throw new Error(`회원가입 오류: ${error}`);
  }
};

export const issueToken = (
  payload: JwtPayload,
  expireTime: string = ACCESS_TOKEN_EXPIRE_TIME
) => {
  try {
    return jwt.sign(payload, config.jwtSecretKey as string, {
      expiresIn: expireTime,
      issuer: "cookidge",
    });
  } catch (error) {
    throw new Error(`토큰 발급 오류: ${error}`);
  }
};
