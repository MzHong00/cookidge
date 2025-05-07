import axios from "shared/lib/axios";

export class AuthService {
  static readonly api = "/api/auth";

  static async issueAccessToken() {
    return (await axios.get(`${this.api}/issue-token`))?.data;
  }

  static async logout() {
    await axios.post(`${this.api}/logout`);
    window.location.reload();
  }

  static async testAccountLogin(code: string) {
    return await axios.post(`${this.api}/test-account`, {
      code: code,
    });
  }
}
