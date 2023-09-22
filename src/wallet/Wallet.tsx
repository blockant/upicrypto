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

interface TokenData {
  name: string;
  symbol: string;
  balance: string;
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

  const networkOptions: Record<string, { name: string; symbol: string }> = {
    Ethereum: { name: "Ethereum", symbol: "ETH" },
    Polygon: { name: "Polygon", symbol: "MATIC" },
    "Mumbai Testnet": { name: "Mumbai Testnet", symbol: "MATIC" },
    Kovan: { name: "Kovan", symbol: "ETH" },
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
          <ListItem
            key={value.name}
            secondaryAction={
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
            }
            disablePadding
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
