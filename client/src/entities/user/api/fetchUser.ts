import axios from "shared/api/base";
import { type User } from "shared/types";

export const fetchUser = async (userName: string): Promise<User> => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_API}/user/find`,
    { params: { target: userName } }
  );

  return response.data;
};
