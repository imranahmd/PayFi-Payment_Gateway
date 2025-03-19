const oktaBaseUrl = "http://dev-98815118.okta.com";
const API_GATEWAY =  process.env.REACT_APP_API_GATEWAY;
const signupoktaPost =
  "https://dev-98815118.okta.com/api/v1/users?activate=true";
export {
  API_GATEWAY,
  signupoktaPost,
  oktaBaseUrl
};