import axios from "shared/lib/axios";

export class OAuthService {
  static async googleOAuth() {
    try {
      const response = await axios.get(`api/google-oauth/login`);

      window.location.href = response.data;
    } catch (error) {
      throw new Error(`구글 로그인 에러: ${error}`);
    }
  }

  static async googleOAuthRedirect() {
    const params = new URLSearchParams(window.location.search);
    const oauth_code = params.get("code");

    try {
      const response = await axios.get(
        `api/google-oauth/callback?code=${oauth_code}`,
        { withCredentials: true }
      );

      const accessToken = response.data.token;

      return accessToken;
    } catch (error) {
      throw new Error(`구글 로그인 redirect 에러: ${error}`);
    }
  }
}
