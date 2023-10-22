import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthConsumer, AuthProvider } from "./features/auth/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    {/* <GoogleOAuthProvider clientId="502629139602-4jsovvu4liuleks7ikeb481e0ubu6m4k.apps.googleusercontent.com"> */}
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    {/* </GoogleOAuthProvider> */}
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
