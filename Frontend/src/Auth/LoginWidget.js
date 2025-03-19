import React from "react";
import { Route } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignInWidget from "./OktaSignInWidget";

const LoginWidget = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = function (res) {
    if (res.status === "SUCCESS") {
      return oktaAuth.signInWithRedirect({
        sessionToken: res.session.token,
      });
    }
  };

  const onError = function (err) {
    console.log("error logging in", err);
  };

  if (!authState) {
    return <h1>Loading...</h1>;
  }

  return authState.isAuthenticated ? (
    <Route to={{ pathname: "/" }} />
  ) : (
    <OktaSignInWidget
      baseUrl="https://dev-98815118.okta.com"
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

export default LoginWidget;
