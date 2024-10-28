import axios from "shared/api/base";
import { type User } from "shared/types";

export const fetchMe = async (): Promise<User> => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_API}/user/me`
  );

  return response.data;
};
