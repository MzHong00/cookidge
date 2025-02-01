import axios from "shared/lib/axios";

export class OAuthService {
  static readonly root = "/api/google-oauth";

  static async redirectToGoogleOAuthForm() {
    try {
      const response = await axios.get(`${this.root}/login`);

      window.location.href = response.data;
    } catch (error) {
      throw new Error(`구글 로그인 에러: ${error}`);
    }
  }

  static async loginWithGoogleOAuth() {
    const params = new URLSearchParams(window.location.search);
    const oauth_code = params.get("code");

    try {
      const response = await axios.get(
        `${this.root}/callback?code=${oauth_code}`,
        { withCredentials: true }
      );

      const accessToken = response.data.token;

      return accessToken;
    } catch (error) {
      console.log(`구글 로그인 redirect 에러: ${error}`);
      throw error;
    }
  }
}
