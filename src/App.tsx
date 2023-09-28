import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import Payment, { PaymentFormProps } from "./payment/Payment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./login/Login";
import Wallet from "./wallet/Wallet";
import { Box, Drawer, Slide } from "@mui/material";
import QRScannerComponent from "./qrScanner/QRScannerComponent";
import CreateWallet from "./wallet/CreateWallet";
import PaymentFiat from "./payment/PaymentFiat";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Solway",
  },
});

const paymentFormDefaultProps: PaymentFormProps = {
  payee: "",
  currency: undefined,
  amount: 0,
  transactionCurrency: undefined,
  transactionAmount: 0,
  isEditable: true,
};

function App() {
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [showPaymentFiat, setShowPaymentFiat] = useState<boolean>(false);

  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [paymentFormProps, setPaymentFormProps] = useState<PaymentFormProps>(
    paymentFormDefaultProps
  );
  const [profile, setProfile] = useState<any>();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [network, setAppNetwork] = useState<string>("Polygon");

  useEffect(() => {
    if (showPayment) setShowQRScanner(false);
  }, [showPayment]);
  async function checkAndUpdateWallet(userEmail: string) {
    console.log("inside checkand update");
    try {
      const response = await fetch(
        `http://localhost:8000/check-wallet/${userEmail}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wallet data");
      }

      const data = await response.json();

      if (data.hasWallet) {
        const walletAddress = data.walletAddress;
        console.log(`User has a wallet with address: ${walletAddress}`);
        setWalletAddress(walletAddress);
      } else {
        console.log("User does not have a wallet");
        return;
      }
    } catch (error) {
      console.error("Error checking and updating wallet:", error);

      return null;
    }
  }
  useEffect(() => {
    profile && checkAndUpdateWallet(profile.email);
  }, [profile]);

  const togglePayment = (show: boolean, action: string) => {
    setShowPayment(show);
    if (action === "SCAN_AND_PAY") {
      // setPaymentFormProps(paymentFormScanAndPayProps);
    } else {
      setPaymentFormProps(paymentFormDefaultProps);
    }
  };

  const togglePaymentFiat = (show: boolean, action: string) => {
    setShowPaymentFiat(show);
    if (action === "SCAN_AND_PAY") {
      // setPaymentFormProps(paymentFormScanAndPayProps);
    } else {
      setPaymentFormProps(paymentFormDefaultProps);
    }
  };
  const onHandleTopup = (showPaymentFiat: boolean) => {
    setShowPaymentFiat(showPaymentFiat);
  };
  console.log("Updated profile is  ", profile);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        {profile ? (
          <>
            {!walletAddress ? (
              <CreateWallet
                email={profile.email}
                setWalletAddress={setWalletAddress}
              />
            ) : (
              <Wallet
                  profile={profile}
                  setProfile={setProfile}
                setShowPayment={togglePayment}
                setShowQRScanner={setShowQRScanner}
                walletAddress={walletAddress}
                showPaymentFiat={showPaymentFiat}
                onHandleTopup={onHandleTopup}
                setAppNetwork={setAppNetwork}
              />
            )}
          </>
        ) : (
          <Login setProfile={setProfile} />
        )}
        <Drawer
          anchor="bottom"
          open={showQRScanner}
          onClose={() => setShowQRScanner(false)}
        >
          <QRScannerComponent
            setPaymentFormProps={setPaymentFormProps}
            setShowPayment={setShowPayment}
          />
        </Drawer>
        <Drawer
          anchor="right"
          open={showPayment}
          onClose={() => togglePayment(false, "")}
          ModalProps={{ keepMounted: false }}
        >
          <Payment
            paymentFormProps={paymentFormProps}
            showPayment={showPayment}
            closePayment={togglePayment}
            walletAddress={walletAddress}
            network={network}
          />
        </Drawer>
        <Drawer
          anchor="right"
          open={showPaymentFiat}
          onClose={() => togglePaymentFiat(false, "")}
          ModalProps={{ keepMounted: false }}
        >
          <PaymentFiat
            paymentFormProps={paymentFormProps}
            showPayment={showPaymentFiat}
            closePayment={togglePaymentFiat}
            walletAddress={walletAddress}
            network={network}
          />
        </Drawer>
      </div>
    </ThemeProvider>
  );
}

export default App;
