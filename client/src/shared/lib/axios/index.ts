import axios, { AxiosStatic } from "axios";

import { AuthService } from "shared/api/auth/service";

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
    return response;
  },
  async (error) => {
    // 엑세스 토큰 만료 (재발급 로직)
    if (error.response.status === 498) {
      await AuthService.issueAccessToken();

      // 기존 요청의 data를 JSON으로 파싱하여 복원
      if (error.config.data) error.config.data = JSON.parse(error.config.data);
      const response = await axios.request(error.config);

      return response;
    }

    // 리프레시 토큰 만료 (로그아웃 로직)
    if (error.response.status === 488) {
      AuthService.logout();
    }

    throw error;
  }
);

export default instance as AxiosStatic;
