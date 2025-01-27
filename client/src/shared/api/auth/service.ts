import type { AxiosError } from "axios";
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
    try {
      await axios.post(`${this.api}/test-account`, {
        code: code,
      });
    } catch (error) {
      const errData = (error as AxiosError).response?.data as
        | { message: string }
        | undefined;

      return errData?.message;
    }
  }
}
