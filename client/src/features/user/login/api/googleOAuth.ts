import axios from "shared/api/base";

export const googleOAuth = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/google-oauth/login`
    );

    window.location.href = response.data;
  } catch (error) {
    throw new Error(`구글 로그인 에러: ${error}`);
  }
};

export const googleOAuthRedirect = async () => {
  const params = new URLSearchParams(window.location.search);
  const oauth_code = params.get("code");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/google-oauth/callback?code=${oauth_code}`,
      { withCredentials: true }
    );
    
    const accessToken = response.data.token;
    
    return accessToken;
  } catch (error) {
    throw new Error(`구글 로그인 redirect 에러: ${error}`);
  }
};
