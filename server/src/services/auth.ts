import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config";
import { User } from "../models/user";
import { IUser, type IUserCreateInputDTO } from "../interface/IUser";
import { CloudinaryService } from "./cloudinary";

export const signin = async (member: IUser) => {
  try {
    return {
      refresh_token: issueToken({ id: member._id.toString() }, "24h"),
      access_token: issueToken({ id: member._id.toString() }),
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

    if (!picture) {
      throw new Error("프로필 사진 업로드에 실패했습니다.");
    }

    const user = await User.create({
      name: userInputDto.name,
      email: userInputDto.email,
      picture: picture.public_id,
    });

    return {
      refresh_token: issueToken({ id: user._id.toString() }, "24h"),
      access_token: issueToken({ id: user._id.toString() }),
    };
  } catch (error) {
    throw new Error(`회원가입 오류: ${error}`);
  }
};

export const issueToken = (payload: JwtPayload, expireTime: string = "1h") => {
  try {
    return jwt.sign(payload, config.jwtSecretKey as string, {
      expiresIn: expireTime,
      issuer: "cookidge",
    });
  } catch (error) {
    throw new Error(`토큰 발급 오류: ${error}`);
  }
};
