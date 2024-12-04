import config from "..";

export default {
  web: {
    client_id: config.googleOAuthClientId,
    project_id: "cookidge",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: config.googleOAuthSecret,
    redirect_uris: [
      config.googleOAuthRedirectUrl || "http://localhost:3000/oauth-redirect",
    ],
  },
};
