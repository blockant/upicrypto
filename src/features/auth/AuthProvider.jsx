import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  //   useNavigate,
} from "react-router-dom";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  CONNECTED_EVENT_DATA,
  CustomChainConfig,
  UserInfo,
} from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { config } from "process";

const WEB3AUTH_CLIENT_ID =
  "BPXquy7pVKpvSW4MX1AIiot1Lj25U6pWmso7xXD9v4BDqxTTi17_GbLKRM1xnYbVxdBULlnsfY6hH9LI-5qqI7Y";
//"BEYr-Jc0CY5jcBRZ3y4w4GiMC8D9fzzxqYUcpzjEMybcchKb3exdg90US_t0iF7lS-i0W9wyma4vKeuEOmxyujU"; // get your clientId from https://developer.web3auth.io

const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0x13881",
  rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
  blockExplorer: "https://mumbai.polygonscan.com/",

  displayName: "MUMBAI Testnet",
  ticker: "MATIC",
  tickerName: "Matic",
};

export const AuthProviderContext = React.createContext({
  web3auth: null,
  provider: null,
  user: null,
  email: "",
  onSuccessfulLogin: (data) => {},
  login: () => {},
  logout: () => {},
});

const web3auth = new Web3Auth({
  chainConfig: chainConfig,

  uiConfig: {
    theme: "dark",
    appLogo: "./Upicrypto_logo.png", // Your App Logo Here
    appName: "Upi crypto",
    appUrl: "https://www.upicrypto.co/",
    logoLight: "/Upicrypto_logo.png",
    logoDark: "/Upicrypto_logo.png",
    // defaultLanguage: "ko", // en, de, ja, ko, zh, es, fr, pt, nl
    mode: "dark", // whether to enable dark mode. defaultValue: auto
    // theme: {
    //   primary: "#00D1B2",
    // },
    tncLink: { en: "https://www.upicrypto.co/" },
    privacyPolicy: { en: "https://www.upicrypto.co/" },
    useLogoLoader: true,
  },

  clientId: WEB3AUTH_CLIENT_ID,
  network: "testnet",
  // get your clientId from https://developer.web3auth.io
});

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
});

console.log("PRIVIATE KEY PROVIDER", privateKeyProvider);

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    clientId: WEB3AUTH_CLIENT_ID,
    network: "testnet",
    uxMode: "popup",
    whiteLabel: {
      name: "Upi crypto",
      // appLogo:
      //   "https://tse4.mm.bing.net/th?id=OIP.n_IIdRJiTWuyUQuKZEgFLwHaFj&pid=Api&P=0&h=220",
      // appUrl: "https://www.upicrypto.co/",
      // logoLight:
      //   "https://tse4.mm.bing.net/th?id=OIP.n_IIdRJiTWuyUQuKZEgFLwHaFj&pid=Api&P=0&h=220",
      // logoDark:
      //   "https://tse4.mm.bing.net/th?id=OIP.n_IIdRJiTWuyUQuKZEgFLwHaFj&pid=Api&P=0&h=220",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
      // mode: "dark", // whether to enable dark mode. defaultValue: auto
      // theme: "dark",
      tncLink: { en: "https://www.upicrypto.co/" },
      privacyPolicy: { en: "https://www.upicrypto.co/" },
      useLogoLoader: false,
    },
  },
  privateKeyProvider,
  chainConfig,
});

console.log("ADAPTOR", openloginAdapter);
web3auth.configureAdapter(openloginAdapter);

export const AuthProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  //const navigate = useNavigate();

  const onSuccessfulLogin = useCallback((data, user) => {
    console.log("onSuccessfulLogin", data, user);
    setProvider(data);
    setUser(user);
    setEmail(user.email);
  }, []);

  const login = useCallback(() => {
    console.log("Inside login");
    web3auth
      .connect()
      .then((data) => {
        console.log(data);
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = useCallback(() => {
    web3auth
      .logout()
      .then(() => {
        // login on logout
        // navigate("/");
        setEmail(null);
        setUser(null);

        setProvider(null);
      })
      .catch((err) => {
        console.log("logout", err);
      });
  }, []);

  const subscribeAuthEvents = useCallback(
    (web3auth) => {
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
        console.log("Yeah!, you are successfully logged in", data);
        web3auth.getUserInfo().then((user) => {
          onSuccessfulLogin(data, user);
        });
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
        setProvider(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.log("some error or user have cancelled login request", error);
      });

      web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
        console.log("modal visibility", isVisible);
      });
    },
    [onSuccessfulLogin]
  );

  useEffect(() => {
    subscribeAuthEvents(web3auth);

    web3auth.initModal().catch((err) => {
      alert("error" + err);
    });
  }, []);

  const ctx = {
    web3auth,
    provider,
    user,
    email,
    onSuccessfulLogin,
    login,
    logout,
  };

  return (
    <AuthProviderContext.Provider value={ctx}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const AuthConsumer = AuthProviderContext.Consumer;
