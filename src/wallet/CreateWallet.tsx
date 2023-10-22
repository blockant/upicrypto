import React, { useState, useContext } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { AuthProviderContext } from "../features/auth/AuthProvider";

import "./CreateWallet.css"; // Import the CSS module
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
interface CreateWalletProps {
  email: string;
  setWalletAddress: (address: string) => void;
}

const CreateWallet = (props: CreateWalletProps) => {
  const [ownerAddress, setOwnerAddress] = useState<string>("");

  const [invalidOwner, setInvalidOwner] = useState(false);
  const [walletAddress, setWalletAddressHere] = useState<string>("0x");
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    amt: "",
    t: "",
    owner: "", // Added type for owner
  });
  const context = useContext(AuthProviderContext);

  function handleWallet() {
    props.setWalletAddress(walletAddress);
  }

  function checkInvalidToAddress(address: string) {
    if (address.length !== 42) {
      setInvalidOwner(true);
      return true;
    } else {
      setInvalidOwner(false);
      return false;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Inside handle submit ");
    setLoading(true);

    const invalidOwner = checkInvalidToAddress(formValues.owner);
    console.log("Invalid ", formValues.owner);

    if (invalidOwner) {
      return;
    }
    console.log("HEre");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/deploy-wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formValues,
            userEmail:  context.email,
          }),
        }
      );
      const data = await response.json();
      setWalletAddressHere(data.walletAddress);
      props.setWalletAddress(data.walletAddress);
      setLoading(false);
    } catch (error) {
      console.log("Error While Fetching Data ", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleOwnerAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOwnerAddress(event.target.value);
  };

  return (
    <Box sx={walletStyle}>
      <Grid container rowSpacing={1}>
        <Grid item xs={12} sx={{ height: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <h1>UPI Crypto</h1>
          </div>
          <div
            className="card-form"
            style={{
              display: "flex",
              padding: "10rem 0rem",
              justifyContent: "center",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="owner">Owner Address:</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  //   value={ownerAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div
                className="form-group"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {loading ? (
                  <CircularIndeterminate />
                ) : (
                  <button type="submit">Create</button>
                )}
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateWallet;

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
