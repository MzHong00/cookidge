import axios, { AxiosStatic } from "axios";

import { AuthService } from "shared/api/auth/service";
import { useAuthStore } from "../zustand";

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//isLogin true 기준: Access Token이 발급된 경우
//isLogin false 기준: Refresh Token이 유효하지 않은 경우
instance.interceptors.response.use(
  (response) => {
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

    if (response.data.token) {
      const { changeIsLogin } = useAuthStore.getState();
      changeIsLogin(true);
    }

    return response;
  },
  async (error) => {
    const { isLogin, changeIsLogin } = useAuthStore.getState();

    if (error.response.data.isLogin === false) {
      changeIsLogin(false);
      return Promise.resolve();
    }

    if (error.response.status === 401) {
      if (!isLogin) return Promise.resolve();

      await AuthService.issueAccessToken();

      /* ------- 토큰 인증 재요청 과정 ------- */
      const accessToken = axios.defaults.headers.common.Authorization;

      // 기존 요청의 headers에 새로 발급된 access token을 설정
      error.config.headers = {
        ...error.config.headers,
        Authorization: `${accessToken}`,
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
