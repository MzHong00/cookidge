import axios from "shared/api/base";

export const issueAccessToken = async () => {
  const response = await axios.get(`/auth/issue-token`);
  const { token, payload } = response.data;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return { token, payload };
};
