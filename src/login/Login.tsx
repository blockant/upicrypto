import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Avatar } from "@mui/material";
import avatar from "../Upicrypto_logo.png";

interface LoginProps {
  setProfile: (profile: any) => void;
}

const Login = (props: LoginProps) => {
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
        <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} />
      </div>
    </div>
  );
};

export default Login;
