import { Cookies } from "react-cookie";

import axios from "axios";

const cookies = new Cookies();

export const reissueAccessToken = async () => {
  const refreshToken = cookies.get("refresh_token");
  if (!refreshToken) throw new Error("Refresh token is missing");

  const reissueResponse = await axios.post(
    `${process.env.REACT_APP_API_ROOT}/api/account/reissue`,
    {},
    { headers: { authorization: `Bearer ${refreshToken}` } }
  );

  return reissueResponse.data;
};
