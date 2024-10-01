import axios, { AxiosStatic } from "axios";
import { Cookies } from "react-cookie";

import { reissueAccessToken } from "./jwtToken";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    // 토큰을 같이 전송
    const accessToken = cookies.get("access_token");

    // 토큰 재발급 요청이 아니라면 access 토큰 전송 차단
    if (!config.url?.includes("/reissue"))
      config.headers["authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 Error");
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // 토큰 재발급을 통해 쿠키에 적용된 상태
        await reissueAccessToken();
      }

      /* ------- 토큰 인증 재요청 과정 ------- */
      const accessToken = cookies.get("access_token");
      
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
