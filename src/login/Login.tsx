import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useEffect, useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import { Avatar } from "@mui/material";
import avatar from "../Upicrypto_logo.png";
import { AuthProviderContext } from "../features/auth/AuthProvider";

interface LoginProps {
  setProfile: (profile: any) => void;
}

const Login = (props: LoginProps) => {
  const context = useContext(AuthProviderContext);
  console.log("Context is ", context);
  const onLoginSuccess = (response: CredentialResponse) => {
    console.log(response);
    if (!response.credential) {
      alert("Login failed.");
      return;
    }
    props.setProfile(jwtDecode(response.credential));
  };

  const onLoginFailure = () => {
    alert("Login failed.");
  };

  // function onLogin() {
  //   context.login();
  //   props.setProfile(context.user);
  // }

  return (
    <div className="login-container">
      <div className="branding-container">
        <Avatar
          src={avatar}
          sx={{ marginRight: "10px", height: 128, width: 128 }}
        />
        {/* <h1>UPICrypto</h1> */}
      </div>
      <div className="login-button-container">
        <button onClick={context.login} className="login-button">
          Login
        </button>
        {/* <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} /> */}
      </div>
    </div>
  );
};

export default Login;
