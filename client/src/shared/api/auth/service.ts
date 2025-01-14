import { AxiosError } from "axios";
import axios from "shared/lib/axios";

export class AuthService {
  static readonly api = "api/auth";

  static async issueAccessToken() {
    const { token }: { token: string | undefined } = (
      await axios.get(`${this.api}/issue-token`)
    )?.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return token;
  }

  static async logout() {
    return (await axios.post(`${this.api}/logout`)).data;
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
