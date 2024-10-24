import jwt from "jsonwebtoken";

import config from "../config";
import { User } from "../models/user";
import { type JwtToken } from "../interface/jwtToken";
import { type IUser, type IUserInputDTO } from "../interface/IUser";

export const login = async (user: IUser) => {
  try {
    // const user = await mongoService.findOne<User>("user", {
    //   email: userData.email,
    // });
    // if (!user || !userData) return console.log("Error: User is not found");
    // return issueToken(user);
  } catch (error) {
    throw new Error("Login Error");
  }
};

export const signup = async (
  userInputDTO: IUserInputDTO
): Promise<{
  user: IUser;
  token: JwtToken;
}> => {
  try {
    const user = await User.create(userInputDTO);
    const token = issueToken(user);

    return { user, token };
  } catch (error) {
    throw new Error(`Signup error: ${error}`);
  }
};

export const issueToken = (user: IUser): JwtToken => {
  try {
    const accessToken = jwt.sign(
      { name: user.name },
      config.jwtAccessKey as string,
      {
        expiresIn: `10s`,
        issuer: "access issuer",
      }
    );

    const refreshToken = jwt.sign(
      { name: user.name },
      config.jwtRefreshKey as string,
      {
        expiresIn: "24h",
        issuer: "refresh issuer",
      }
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    throw new Error(`Issue Token Error: ${error}`);
  }
};
