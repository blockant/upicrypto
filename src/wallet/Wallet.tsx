import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createWalletAPI } from "../api/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Wallet.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { string } from "prop-types";
import { ethers } from "ethers";
import { ConstructionOutlined } from "@mui/icons-material";
import { CurrencyAmount } from "../payment/PaymentFiat";
import { currencyAmountAPI } from "../api/api";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Menu from "@mui/material/Menu";

import ListItemIcon from "@mui/material/ListItemIcon";

import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PublicIcon from "@mui/icons-material/Public";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Modal from "@mui/material/Modal";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};
const walletStyle = {
  color: "whitesmoke",
  width: "70vw",
  height: "70vh",
  backgroundColor: "#292121",
  marginTop: "20vh",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: ".2em",
  boxSizing: "border-box",
  padding: "5vh 0 5vh 0",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  //   overflowY: "scroll",
  //   overflowX: "hidden",
};

interface WalletProps {
  setShowPayment: (show: boolean, action: string) => void;
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
  setShowQRScanner: Dispatch<SetStateAction<boolean>>;
  walletAddress: string;
  onHandleTopup: (fiatPayment: boolean) => void;
  showPaymentFiat: boolean;
  setAppNetwork: Dispatch<SetStateAction<string>>;
}

interface CheckListProps {
  setShowPayment: (show: boolean, action: string) => void;
  tokens: TokenData[];
}
interface CheckListProps2 {
  setShowPayment: (show: boolean, action: string) => void;
  tokens: ChargeData[];
}
interface TokenData {
  name: string;
  symbol: string;
  balance: string;
}
interface ChargeData {
  // name: string;
  // symbol: string;
  // balance: string;
  id: "ch_3NueZXSF8NnOLJjS07yQgUeL";
  object: "charge";
  amount: number;
  amount_captured: 47500;
  amount_refunded: 0;
  application: null;
  application_fee: null;
  application_fee_amount: null;
  balance_transaction: "txn_3NueZXSF8NnOLJjS08Ce8pjL";
  billing_details: {
    address: [Object];
    email: null;
    name: "gurjarritesh155@gmail.com";
    phone: null;
  };
  calculated_statement_descriptor: "Stripe";
  captured: true;
  created: 1695747439;
  currency: "inr";
  customer: "cus_Oi4eydBqcYLvkc";
  description: "Adding Funds";
  destination: null;
  dispute: null;
  disputed: false;
  failure_balance_transaction: null;
  failure_code: null;
  failure_message: null;
  fraud_details: {};
  invoice: null;
  livemode: false;
  metadata: {};
  on_behalf_of: null;
  order: null;
  outcome: {
    network_status: "approved_by_network";
    reason: null;
    risk_level: "normal";
    risk_score: 45;
    seller_message: "Payment complete.";
    type: "authorized";
  };
  paid: true;
  payment_intent: null;
  payment_method: "card_1NueV9SF8NnOLJjSuPK4JteU";
  payment_method_details: { card: [Object]; type: "card" };
  receipt_email: "gurjarritesh155@gmail.com";
  receipt_number: null;
  receipt_url: "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSkJIbWhTRjhObk9MSmpTKIWzzKgGMgYaOPrab306LBatN5TfidcOE5aNAvWhmZWxCJA_N7e9fJ6OaA9cl5iYb1nKbcxMgWJTW_3H";
  refunded: false;
  review: null;
  shipping: null;
  source: {
    id: "card_1NueV9SF8NnOLJjSuPK4JteU";
    object: "card";
    address_city: null;
    address_country: null;
    address_line1: null;
    address_line1_check: null;
    address_line2: null;
    address_state: null;
    address_zip: null;
    address_zip_check: null;
    brand: "MasterCard";
    country: "US";
    customer: "cus_Oi4eydBqcYLvkc";
    cvc_check: "pass";
    dynamic_last4: null;
    exp_month: 12;
    exp_year: 2026;
    fingerprint: "7TaK6QMOgaLNWeEN";
    funding: "credit";
    last4: "4444";
    metadata: {};
    name: "gurjarritesh155@gmail.com";
    tokenization_method: null;
    wallet: null;
  };
  source_transfer: null;
  statement_descriptor: null;
  statement_descriptor_suffix: null;
  status: "succeeded";
  transfer_data: null;
  transfer_group: string;
}
// interface SubTokenData {
//   name: string;
//   symbol: string;
//   balance: string;
// }
interface NetworkData {
  setNetwork: Dispatch<SetStateAction<string>>;
  network: string;
}
const Wallet = (props: WalletProps) => {
  const [wallet, setWallet] = useState();
  const [cryptoTransactions, setCryptoTransactions] = useState<object>([]);
  const [maticBalance, setMaticBalance] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [network, setNetwork] = useState<string>("Polygon");
  const [fiatBalance, setFiatBalance] = useState<number>(0);
  const [availableCurrency, setAvailableCurrency] = useState<CurrencyAmount[]>(
    []
  );
  const [charges, setCharges] = useState<ChargeData[]>([]);
  const [value, setValue] = React.useState(0);

  const networkOptions: Record<string, { name: string; symbol: string }> = {
    Ethereum: { name: "Ethereum", symbol: "ETH" },
    Polygon: { name: "Polygon", symbol: "MATIC" },
    "Mumbai Testnet": { name: "Mumbai Testnet", symbol: "MATIC" },
    Kovan: { name: "Kovan", symbol: "ETH" },
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleLogout() {
    props.setProfile(null);
  }

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function updateBalance(walletAddress: string) {
    try {
      console.log("inside update fiat balance ", walletAddress);
      const response = await fetch(
        `http://localhost:8000/get-wallet-balance/${walletAddress}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      setFiatBalance(data.balance); // Assuming setFiatBalance is a function that updates state
      console.log("Wallet balance ", data.balance);
    } catch (error) {
      console.error("Error checking and updating balance:", error);

      return null;
    }
  }

  async function getCharges(walletAddress: string) {
    try {
      console.log("inside update fiat balance ", walletAddress);
      const response = await fetch(
        `http://localhost:8000/get-charges-new/${walletAddress}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch charges");
      }

      const data = await response.json();
      setCharges(data.allCharges); // Assuming setFiatBalance is a function that updates state
      console.log("Wallet charges ARE HERE ", data.allCharges);
    } catch (error) {
      console.error("Error getting charges:", error);

      return null;
    }
  }
  async function getNonZeroValueTransactions() {
    const provider = new ethers.providers.EtherscanProvider("maticmum");
    console.log("Provoder is ", provider);

    const history = await provider.getHistory(props.walletAddress);

    const nonZeroValueTransactions = history.filter((tx) => {
      const value = ethers.utils.parseEther(tx.value.toString());
      return !value.isZero();
    });

    console.log("NON value transactions ", nonZeroValueTransactions);
    setCryptoTransactions(nonZeroValueTransactions);

    // return nonZeroValueTransactions;
  }
  async function getMaticPrice() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/matic-network"
      );
      const data = await response.json();
      console.log("Data", data.market_data.current_price.usd.toLocaleString());
      const price = data.market_data.current_price.usd.toLocaleString();
      setPrice(price);
    } catch (error) {}
  }

  const getTokenBalances = async (address: string): Promise<TokenData[]> => {
    let subTokenData;
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
      );

      const balanceWei = await provider.getBalance(address);
      const balanceEther = ethers.utils.formatEther(balanceWei);
      setMaticBalance(Number(balanceEther));

      subTokenData = {
        name: networkOptions[network].name,
        symbol: networkOptions[network].symbol,
        balance: balanceEther,
      };
    } catch (error) {
      console.error(`Error fetching balance: ${error}`);
      throw error;
    }
    const url = `https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [address],
      }),
    };

    try {
      const res = await fetch(url, options);
      const response = await res.json();

      const balances = response["result"];

      const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
        return token.tokenBalance !== "0";
      });
      console.log("nonXero balances", nonZeroBalances);

      const tokenDataArray: TokenData[] = await Promise.all(
        nonZeroBalances.map(async (token: any) => {
          const metadataOptions = {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: 1,
              jsonrpc: "2.0",
              method: "alchemy_getTokenMetadata",
              params: [token.contractAddress],
            }),
          };

          const metadataRes = await fetch(url, metadataOptions);
          const metadata = await metadataRes.json();
          const tokenMetadata = metadata["result"];

          const balance = (
            parseFloat(token.tokenBalance) /
            Math.pow(10, tokenMetadata.decimals)
          ).toFixed(2);

          return {
            name: tokenMetadata.name,
            symbol: tokenMetadata.symbol,
            balance: balance,
          };
        })
      );
      console.log("TokenArray", tokenDataArray);
      tokenDataArray.push(subTokenData);

      return tokenDataArray;
    } catch (error) {
      console.error("Error while fetching data: ", error);
      return [];
    }
  };
  useEffect(() => {
    getNonZeroValueTransactions();
    currencyAmountAPI(network, props.walletAddress).then(
      (currencies: CurrencyAmount[]) => {
        setAvailableCurrency(currencies);
      }
    );

    props.setAppNetwork(network);
    getMaticPrice();
    updateBalance(props.walletAddress);
    getCharges(props.walletAddress);
    const tokenBalancesPromise = getTokenBalances(props.walletAddress);

    tokenBalancesPromise
      .then((tokenBalances) => {
        console.log("Token balances of this address are", tokenBalances);
        setTokens(tokenBalances);
      })
      .catch((error) => {
        console.error("Error while fetching data: ", error);
      });
  }, [props.walletAddress, network]);
  // const tokenBalances = getTokenBalances(
  //   "0x84C632431C444b0b076fc5784cd59c065E75dCdc"
  // ).then;
  // console.log("Token balances of this adddress is ", tokenBalances);
  // useEffect(() => {
  //   updateBalance(props.walletAddress)
  // },[])

  useEffect(() => {
    createWalletAPI(props.profile.email)
      .then((response) => {
        if (!response.ok) {
          alert("Wallet creation failed.");
          return Promise.reject();
        } else {
          return response.json();
        }
      })
      .then((response) => {
        setWallet(response);
      });
  }, []);

  return (
    <Box sx={walletStyle}>
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              textAlign: "center",
              fontSize: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                fontSize: "2rem",
                flex: "1",
                // width: "65%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ marginLeft: "10rem" }}>UPI Crypto</div>
            </Box>
            <Box
              sx={{
                fontSize: "2rem",
                // width: "35%",
                // display: "flex",
                // justifyContent: "flex-end",
              }}
            >
              <NetworkOptions setNetwork={setNetwork} network={network} />
            </Box>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
              <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <AccountCircleIcon sx={{ width: 32, height: 32 }} />
                    {/* <Avatar sx={{ width: 32, height: 32 }}>
                    <AccountCircleIcon sx={{ width: 32, height: 32 }} />
                  </Avatar> */}
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider /> */}
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Aaccount
                </MenuItem>
                <MenuItem onClick={handleOpenModal}>
                  <ListItemIcon>
                    <PublicIcon fontSize="small" />
                  </ListItemIcon>
                  My public Address
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ArrowCircleUpIcon fontSize="small" />
                  </ListItemIcon>
                  Preferences
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <HelpIcon fontSize="small" />
                  </ListItemIcon>
                  Get Help
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <FeedbackIcon fontSize="small" />
                  </ListItemIcon>
                  Feedback
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Public Address
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {props.walletAddress}
                </Typography>
              </Box>
            </Modal>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button color="inherit" size="small" endIcon={<ContentCopyIcon />}>
              {props.walletAddress}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        {/* <Box
          sx={{
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            paddingY: "10px",
          }}
        >
          <div style={{ padding: "0 10px" }}>Fiat Balance</div>
          <div style={{ padding: "0 10px" }}>{fiatBalance} USD</div>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "0 10px" }}
            onClick={() => {
              props.onHandleTopup(!props.showPaymentFiat);
            }}
          >
            Top up
          </Button>
        </Box> */}
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Fiat" {...a11yProps(0)} />
            <Tab label="Crypto" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Box
              sx={{
                paddingY: "10px",
                width: "50%",
                margin: "auto",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box
                    sx={{
                      fontSize: "1.2rem",
                      display: "flex",
                      justifyContent: "center",
                      paddingY: "10px",
                    }}
                  >
                    <div style={{ padding: "0 10px" }}>Fiat Balance</div>
                    <div style={{ padding: "0 10px" }}>{fiatBalance} USD</div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ padding: "0 10px" }}
                      onClick={() => {
                        props.onHandleTopup(!props.showPaymentFiat);
                      }}
                    >
                      Top up
                    </Button>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <CheckboxListSecondary2
                    tokens={charges}
                    setShowPayment={props.setShowPayment}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Box
              sx={{
                paddingY: "10px",
                width: "50%",
                margin: "auto",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box
                    sx={{
                      fontSize: "1.2rem",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingY: "10px",
                      flex: 1,
                    }}
                  >
                    <div>Crypto Balance</div>
                    <div>{price * maticBalance} USD </div>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <CheckboxListSecondary
                    tokens={tokens}
                    setShowPayment={props.setShowPayment}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </TabPanel>
        </SwipeableViews>
      </Grid>
      <Box
        sx={{
          marginTop: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.setShowPayment(true, "PAY")}
        >
          Pay
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.setShowQRScanner(true)}
        >
          Scan & Pay
        </Button>
      </Box>
    </Box>
  );
};

export default Wallet;

function CheckboxListSecondary(props: CheckListProps) {
  const { setShowPayment, tokens } = props;
  const [checked, setChecked] = useState<Array<Number>>([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%" }}>
      {props.tokens.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.name}`;
        return (
          <ListItem key={value.name} disablePadding>
            {/* <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value}`}
                  src={`/static/images/avatar/${value}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} />
              <ListItemText
                id={labelId}
                primary={`${value.balance} ${value.symbol}`}
              />
            </ListItemButton> */}
            <Accordion sx={{ flex: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ flex: 1 }}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value}`}
                      src={`/static/images/avatar/${value}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${value.name}`} />
                  <ListItemText
                    id={labelId}
                    primary={`${value.balance} ${value.symbol}`}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: "0 10px" }}
                    onClick={() => {
                      setShowPayment(true, "PAY");
                    }}
                  >
                    send
                  </Button>
                </ListItemButton>
              </AccordionSummary>
              <AccordionDetails>
                {/* <CheckboxListSecondary2
                  tokens={charges}
                  setShowPayment={props.setShowPayment}
                /> */}
              </AccordionDetails>
            </Accordion>
          </ListItem>
        );
      })}
    </List>
  );
}

function CheckboxListSecondary2(props: CheckListProps2) {
  const { setShowPayment, tokens } = props;
  const [checked, setChecked] = useState<Array<Number>>([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%" }}>
      {props.tokens.map((value) => {
        const labelId = `checkbox-list-secondary-label-Send}`;
        return (
          <ListItem
            key={value.amount}
            //secondaryAction={
            // <Button
            //   variant="contained"
            //   color="primary"
            //   style={{ padding: "0 10px" }}
            //   onClick={() => {
            //     setShowPayment(true, "PAY");
            //   }}
            // >
            //   send
            // </Button>
            //}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <ListItemText id={labelId} primary={`Added`} />
                {/* <Avatar
                  alt={`Avatar n°${value}`}
                  src={`/static/images/avatar/${value}.jpg`}
                /> */}
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`IN`} />
              <ListItemText id={labelId} primary={`${value.amount / 100} $`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
const NetworkOptions = (props: NetworkData) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.setNetwork(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Network</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={props.network}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={"Ethereum"}>Ethereum</MenuItem>
        <MenuItem value={"Polygon"}>Polygon</MenuItem>
        <MenuItem value={"Mumbai Testnet"}>Mumbai Testnet</MenuItem>
        <MenuItem value={"Kovan"}>Kovan</MenuItem>
      </Select>
    </FormControl>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
