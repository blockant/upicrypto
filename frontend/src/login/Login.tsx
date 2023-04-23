import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import './Login.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

interface LoginProps {
    setProfile: (profile: any) => void
}

const Login = (props: LoginProps) => {

    const onLoginSuccess = (response: CredentialResponse) => {
        console.log(response);
        if(!response.credential) {
            alert('Login failed.');
            return;
        }
        props.setProfile(jwtDecode(response.credential));
    }

    const onLoginFailure = () => {
        alert("Login failed.");
    }

    return <div className='login-container'>
        <h1>UPICrypto</h1>
        <div className='login-button-container'>
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} />
        </div>
    </div>
}

export default Login;