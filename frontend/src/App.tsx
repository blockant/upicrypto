import React, { useState } from 'react';
import './App.css';
import Payment from './payment/Payment';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './login/Login';
import Wallet from './wallet/Wallet';
import { Box, Drawer, Slide } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: "dark"
  },
  typography: {
    "fontFamily": "Solway"
  }
});

const paymentFormDefaultProps = {
  payee: "",
  currency: undefined,
  amount: 0,
  isEditable: true
}

const paymentFormScanAndPayProps = {
  payee: "0x83g25sff253gd626dg26er52",
  currency: "ETH",
  amount: 0.017,
  isEditable: false
}

function App() {
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [paymentFormProps, setPaymentFormProps] = useState<any>(paymentFormDefaultProps);
  const [profile, setProfile] = useState<any>();

  const togglePayment = (show: boolean, action: string) => {
    setShowPayment(show);
    if(action === 'SCAN_AND_PAY') {
      setPaymentFormProps(paymentFormScanAndPayProps);
    } else {
      setPaymentFormProps(paymentFormDefaultProps);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        {
          profile ? <Wallet profile={profile} setShowPayment={togglePayment}/> : <Login setProfile={setProfile} />
        }
        <Drawer anchor='right' open={showPayment} onClose={() => togglePayment(false, "")} ModalProps={{keepMounted: false}}>
          <Payment paymentFormProps={paymentFormProps} showPayment={showPayment} closePayment={togglePayment}/>
        </Drawer>
      </div>
    </ThemeProvider>
  );
}

export default App;
