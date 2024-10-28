import jwt from "jsonwebtoken";

import config from "../config";
import { User } from "../models/user";
import { type IUser, type IUserInputDTO } from "../interface/IUser";

// oauth는 로그인와 회원가입을 같이 처리해야 하기 때문에 oAuthLogin 함수 이름으로 설정
export const oAuthLogin = async (userInputDTO: IUserInputDTO) => {
  try {
    const member = await User.findOne({ email: userInputDTO.email }).exec();

    // 신규 회원이라면, 회원가입
    if (!member) {
      const newMember = await signup(userInputDTO);
      return issueToken(newMember, "24h");
    } else {
      return issueToken(member, "24h");
    }
  } catch (error) {
    throw new Error("Login Error");
  }
};

export const signup = async (userInputDTO: IUserInputDTO) => {
  try {
    const user = await User.create({
      name: userInputDTO.name,
      email: userInputDTO.email,
      picture: userInputDTO.picture,
    });

    return user;
  } catch (error) {
    throw new Error(`Signup error: ${error}`);
  }
};

export const issueToken = (user: IUser, expireTime: string = "10s") => {
  try {
    const accessToken = jwt.sign(
      { name: user.name },
      config.jwtAccessKey as string,
      {
        expiresIn: expireTime,
        issuer: "cookidge",
      }
    );

    return accessToken;
  } catch (error) {
    throw new Error(`Issue Token Error: ${error}`);
  }
};
