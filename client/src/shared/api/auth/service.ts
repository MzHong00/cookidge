import axios from "shared/lib/axios";

export class AuthService {
  static readonly api = "/api/auth";

  static async issueAccessToken() {
    const response = (
      await axios.get(`${this.api}/issue-token`, { withCredentials: true })
    )?.data;

    axios.defaults.headers.common.Authorization = `Bearer ${response?.token}`;

    return response?.token;
  }

  static async logout() {
    await axios.post(`${this.api}/logout`);
    window.location.reload();
  }

  static async testAccountLogin(code: string) {
    const response = await axios.post(`${this.api}/test-account`, {
      code: code,
    });

    if (response?.data?.token)
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
  }
}
