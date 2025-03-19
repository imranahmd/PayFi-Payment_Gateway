export const oktaConfig = {
  clientId: "0oadeeqlff3PnCFcd5d7",
  issuer: "https://dev-98815118.okta.com/oauth2/default",
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
