import axios from "shared/api/axiosBase";

export const issueAccessToken = async () => {
  const response = (await axios.get(`api/auth/issue-token`))?.data;

  if (!response) return;

  axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;

  return response.token;
};
