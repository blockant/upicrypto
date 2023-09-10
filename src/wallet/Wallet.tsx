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
}
interface TokenData {
  name: string;
  symbol: string;
  balance: string;
}
const Wallet = (props: WalletProps) => {
  const [wallet, setWallet] = useState();

  const getTokenBalances = async (address: string): Promise<TokenData[]> => {
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

    // Fetch the token balances
    try {
      const res = await fetch(url, options);
      const response = await res.json();

      // Getting balances from the response
      const balances = response["result"];

      // Remove tokens with zero balance
      const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
        return token.tokenBalance !== "0";
      });

      // Fetch token metadata and construct the result array
      const tokenDataArray: TokenData[] = await Promise.all(
        nonZeroBalances.map(async (token: any) => {
          // Request options for making a request to get tokenMetadata
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

          // Fetch token metadata
          const metadataRes = await fetch(url, metadataOptions);
          const metadata = await metadataRes.json();
          const tokenMetadata = metadata["result"];

          // Compute token balance in human-readable format
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

      return tokenDataArray;
    } catch (error) {
      console.error("Error while fetching data: ", error);
      return [];
    }
  };
  const tokenBalances = getTokenBalances(
    "0x84C632431C444b0b076fc5784cd59c065E75dCdc"
  );
  console.log("Token balances of this adddress is ", tokenBalances);

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
                width: "65%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              UPI Crypto
            </Box>
            <Box
              sx={{
                fontSize: "2rem",
                width: "35%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <NetworkOptions />
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
          <div style={{ padding: "0 10px" }}>0.25 USD</div>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "0 10px" }}
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
                <div>0.25 USD </div>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxListSecondary />
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

function CheckboxListSecondary() {
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
      {["Eth", "MATIC", "BTC", "WETH"].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "0 10px" }}
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
              <ListItemText id={labelId} primary={`${value}`} />
              <ListItemText id={labelId} primary={`0.25 Eth`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

const NetworkOptions = () => {
  const [network, setNetwork] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setNetwork(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Network</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={network}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">Ethereum</MenuItem>
        <MenuItem value={10}>Polygon</MenuItem>
        <MenuItem value={20}>Mumbai Testnet</MenuItem>
        <MenuItem value={30}>Kovan</MenuItem>
      </Select>
    </FormControl>
  );
};
