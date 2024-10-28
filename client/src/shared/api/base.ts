import axios, { AxiosStatic } from "axios";

import { issueAccessToken } from "./jwtToken";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    // console.log("보낸 토큰:",config.headers.Authorization);

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token)
    // console.log("발급 받은 토큰:", response.data.token);
    axios.defaults.headers.common.Authorization= `Bearer ${response.data.token}`;

    if (response.status === 404) {
      console.log("404 Error");
    }

    return response;
  },
  async (error) => {
    if (error.response.data.isLogin === false) return Promise.resolve();

    if (error.response?.status === 401) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // 토큰 재발급을 통해 토큰이 헤더에 적용된 상태
        await issueAccessToken();
      }

      /* ------- 토큰 인증 재요청 과정 ------- */
      const accessToken = axios.defaults.headers.common.Authorization;

      error.config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      // 기존 요청의 headers에 새로 발급된 access token을 설정
      error.config.headers = {
        ...error.config.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      // 기존 요청의 data를 JSON으로 파싱하여 복원
      if (error.config.data) {
        error.config.data = JSON.parse(error.config.data);
      }

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);

export default instance as AxiosStatic;
