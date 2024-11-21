import jwt from "jsonwebtoken";

import config from "../config";
import { User } from "../models/user";
import { IUser, type IUserInputDTO } from "../interface/IUser";
import { CustomJwtPayload } from "../config/types/express";

// oauth는 로그인와 회원가입을 같이 처리해야 하기 때문에 oAuthLogin 함수 이름으로 설정
export const oAuthLogin = async (userInputDTO: IUserInputDTO) => {
  try {
    const member = await User.findOne({ email: userInputDTO.email }).exec();

    // 신규 회원이라면, 회원가입
    if (!member) {
      const newMember = await signup(userInputDTO);

      return {
        refresh_token: issueToken({ id: newMember._id.toString() }, "24h"),
        access_token: issueToken({ id: newMember._id.toString() }),
      };
    }

    return {
      refresh_token: issueToken({ id: member._id.toString() }, "24h"),
      access_token: issueToken({ id: member._id.toString() }),
    };
  } catch (error) {
    throw new Error("Login Error");
  }
};

export const signup = async (userInputDTO: IUserInputDTO): Promise<IUser> => {
  try {
    return await User.create({
      name: userInputDTO.name,
      email: userInputDTO.email,
      picture: userInputDTO.picture,
    });
  } catch (error) {
    throw new Error(`Signup error: ${error}`);
  }
};

export const issueToken = (
  payload: CustomJwtPayload,
  expireTime: string = "1h"
) => {
  try {
    return jwt.sign(payload, config.jwtSecretKey as string, {
      expiresIn: expireTime,
      issuer: "cookidge",
    });
  } catch (error) {
    throw new Error(`Issue Token Error: ${error}`);
  }
};
