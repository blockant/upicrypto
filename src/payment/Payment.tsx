import {
  Button,
  Chip,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Slide,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NumericFormatProps, NumericFormat } from "react-number-format";
import { currencyAmountAPI, paymentAPI } from "../api/api";
import "./Payment.css";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import PaymentLoading from "./PaymentLoading";
import PaymentStatus from "./PaymentStatus";

export interface CurrencyAmount {
  name: string;
  abbreviation: string;
  sign: string;
  amount: number;
}

interface ErrorMessage {
  payeeError: string | undefined;
  amountError: string | undefined;
  transactionChargesError: string | undefined;
}

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, isEditable, value, ...other } = props;
  console.log(isEditable, value);
  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      value={value}
      readOnly={!isEditable}
      thousandSeparator
    />
  );
}

export interface PaymentFormProps {
  payee: string;
  currency: string | undefined;
  amount: number;
  transactionCurrency: string | undefined;
  transactionAmount: number;
  isEditable: boolean;
}

interface PaymentProps {
  showPayment: boolean;
  closePayment: (show: boolean, action: string) => void;
  paymentFormProps: PaymentFormProps;
  walletAddress: string;
  network: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Payment = (props: PaymentProps) => {
  const [payee, setPayee] = useState<string>(props.paymentFormProps.payee);
  const [currency, setCurrency] = useState<CurrencyAmount | undefined>();
  const [amount, setAmount] = useState<number>(props.paymentFormProps.amount);
  const transactionCharges: number =
    props.paymentFormProps.transactionAmount > 0
      ? props.paymentFormProps.transactionAmount
      : 0.01;
  const [availableCurrency, setAvailableCurrency] = useState<CurrencyAmount[]>(
    []
  );
  const [errorState, setErrorState] = useState<ErrorMessage>(
    {} as ErrorMessage
  );
  const [transactionCurrency, setTransactionCurrency] = useState<
    CurrencyAmount | undefined
  >();
  const [paymentStatus, setPaymentStatus] = useState<string>("IDLE");

  async function handleAATransfer() {
    setPaymentStatus("LOADING");

    try {
      console.log("Inside AA Transfer");
      const body = {
        recipientAddress: payee,
        amountEth: amount,
        sender: props.walletAddress,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/execute-transaction`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log(data.txHash);

      if (data.txHash) {
        setPaymentStatus("PAYMENT_SUCCESS");
        props.setRefresh((state) => !state);
      } else {
        setPaymentStatus("PAYMENT_FAILED");
      }

      // Assuming getWalletBalance is a function that returns a Promise and updates state
      //   await getWalletBalance(walletAddress);
      console.log(data.txHash);
      return data.txHash;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  console.log("Payment status", paymentStatus);
  console.log("CURRENCY", availableCurrency);

  useEffect(() => {
    currencyAmountAPI(props.network, props.walletAddress).then(
      (currencies: CurrencyAmount[]) => {
        setAvailableCurrency(currencies);

        if (!props.paymentFormProps.currency) {
          setCurrency(currencies[0]);
        } else {
          setCurrency(
            currencies.filter(
              (curr) => curr.abbreviation === props.paymentFormProps.currency
            )[0]
          );
        }
        if (!props.paymentFormProps.transactionCurrency) {
          setTransactionCurrency(currencies[0]);
        } else {
          setTransactionCurrency(
            currencies.filter(
              (curr) =>
                curr.abbreviation === props.paymentFormProps.transactionCurrency
            )[0]
          );
        }
      }
    );
  }, []);

  useEffect(() => {
    setErrorState({
      ...errorState,
      payeeError: undefined,
    });
  }, [payee]);

  useEffect(() => {
    setErrorState({
      ...errorState,
      amountError: undefined,
    });
  }, [amount, currency]);

  const onAmountChange = (event: any) => {
    if (
      !props.paymentFormProps.isEditable &&
      amount === props.paymentFormProps.amount
    ) {
      console.log("HERE");
      return;
    }
    let value = event.target.value;
    if (value === "") {
      setAmount(0);
      return;
    }
    setAmount(parseFloat(value));
  };

  const handleCurrencyChange = (event: any) => {
    const selectedCurrency: string = event.target.value;
    setCurrency(
      availableCurrency.find((curr) => curr.abbreviation === selectedCurrency)
    );
  };

  const handleTransactionCurrencyChange = (event: any) => {
    const selectedCurrency: string = event.target.value;
    setTransactionCurrency(
      availableCurrency.find((curr) => curr.abbreviation === selectedCurrency)
    );
  };

  const handlePayeeChange = (event: any) => {
    if (!props.paymentFormProps.isEditable) {
      return;
    }
    setPayee(event.target.value);
  };

  const payeeValidation = (payee: string) => {
    if (payee !== "") {
      return true;
    }
    setErrorState({
      ...errorState,
      payeeError: "Required field. Payee cannot be left blank.",
    });
    return false;
  };

  const amountValidation = (
    amount: number,
    selectedCurrency: CurrencyAmount
  ) => {
    if (amount > 0 && amount <= selectedCurrency.amount) {
      return undefined;
    }
    let errorMessage: string | undefined = undefined;
    if (amount <= 0) {
      errorMessage = "Amount should be greater than zero.";
    } else if (amount >= selectedCurrency.amount) {
      errorMessage = "Insufficient balance.";
    }
    return errorMessage;
  };

  const paymentValidation = (
    payee: string,
    amount: number,
    selectedCurrency: CurrencyAmount,
    transactionCharges: number,
    selectedTransactionCurrency: CurrencyAmount
  ) => {
    let payeeError = payeeValidation(payee);
    let amountError = amountValidation(amount, selectedCurrency);
    let transactionChargesError = amountValidation(
      transactionCharges,
      selectedTransactionCurrency
    );
    setErrorState({
      ...errorState,
      amountError: amountError,
      transactionChargesError: transactionChargesError,
    });
    return payeeError && !amountError && !transactionChargesError;
  };

  const onPaymentClick = (event: any) => {
    if (!currency || !transactionCurrency) {
      return;
    }
    if (
      !paymentValidation(
        payee,
        amount,
        currency,
        transactionCharges,
        transactionCurrency
      )
    ) {
      return;
    }
    setPaymentStatus("LOADING");
    paymentAPI(amount)
      .then((res: any) => {
        let status = "";
        if (!res.ok) {
          status = "PAYMENT_FAILED";
        } else {
          status = "PAYMENT_SUCCESS";
        }
        setTimeout(() => {
          setPaymentStatus(status);
        }, 3000);
      })
      .catch(() => {
        alert("Payment Failed!");
      });
  };

  if (!currency || !transactionCurrency) {
    return <></>;
  }

  const renderBalanceCheck = (curr: CurrencyAmount) => {
    if (
      curr.abbreviation !== currency.abbreviation &&
      curr.abbreviation !== transactionCurrency.abbreviation
    ) {
      return <></>;
    }

    if (currency.abbreviation === transactionCurrency.abbreviation) {
      if (amount + transactionCharges > curr.amount) {
        return (
          <Chip label="Insufficient balance" color="error" variant="outlined" />
        );
      }
      return (
        <Tooltip title="Balance is sufficient for transaction.">
          <CheckIcon color="success" />
        </Tooltip>
      );
    }

    if (curr.abbreviation === currency.abbreviation && amount > curr.amount) {
      return (
        <Chip
          label="Insufficient balance for amount"
          color="error"
          variant="outlined"
        />
      );
    }
    if (
      curr.abbreviation === transactionCurrency.abbreviation &&
      transactionCharges > curr.amount
    ) {
      return (
        <Chip
          label="Insufficient balance for txn charges"
          color="error"
          variant="outlined"
        />
      );
    }

    return (
      <Tooltip title="Balance is sufficient for transaction.">
        <CheckIcon color="success" />
      </Tooltip>
    );
  };

  const renderPaymentComponent = () => {
    switch (paymentStatus) {
      case "IDLE":
        return (
          <>
            <div className="payment-details-container">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="payment-to"
                    variant="outlined"
                    label="Payee"
                    fullWidth
                    value={payee}
                    size="small"
                    onChange={handlePayeeChange}
                    error={errorState.payeeError !== undefined}
                    helperText={errorState.payeeError}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <Select
                      id="currency-select"
                      value={currency.abbreviation}
                      onChange={handleCurrencyChange}
                      readOnly={!props.paymentFormProps.isEditable}
                    >
                      {availableCurrency.map((curr) => (
                        <MenuItem value={curr.abbreviation}>
                          {curr.abbreviation}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="payment-to"
                    variant="outlined"
                    fullWidth
                    value={amount === 0 ? "" : amount}
                    label="Amount"
                    size="small"
                    onChange={onAmountChange}
                    inputProps={{
                      isEditable: props.paymentFormProps.isEditable,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={errorState.amountError !== undefined}
                    helperText={errorState.amountError}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <Select
                      id="transaction-currency-select"
                      value={transactionCurrency.abbreviation}
                      onChange={handleTransactionCurrencyChange}
                    >
                      {availableCurrency.map((curr) => (
                        <MenuItem value={curr.abbreviation}>
                          {curr.abbreviation}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="transaction-charges-amount"
                    variant="outlined"
                    fullWidth
                    value={transactionCharges === 0 ? "" : transactionCharges}
                    label="Transaction Charge"
                    size="small"
                    inputProps={{ isEditable: false }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={errorState.transactionChargesError !== undefined}
                    helperText={errorState.transactionChargesError}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="balance-container">
              <List disablePadding>
                {availableCurrency.map((curr) => (
                  <>
                    <ListItem secondaryAction={renderBalanceCheck(curr)}>
                      <ListItemText
                        primary={curr.abbreviation}
                        secondary={curr.amount}
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            </div>
            {/* <div className="total-container">
                        <List disablePadding>
                            <ListItem disablePadding>
                                <div className="fullWidth">
                                    <p className="alignLeft">Amount</p>
                                    <p className='alignRight'>{amount} {currency.sign}</p>
                                </div>
                            </ListItem>
                            <ListItem disablePadding>
                                <div className="fullWidth">
                                    <p className="alignLeft">Transaction Charges</p>
                                    <p className='alignRight'>{transactionCharges} $</p>
                                </div>
                            </ListItem>
                        </List>
                    </div> */}
            <div className="payment-button-container fullWidth">
              <Button variant="contained" onClick={handleAATransfer}>
                Pay
              </Button>
            </div>
          </>
        );
      case "LOADING":
        return <PaymentLoading />;
      case "PAYMENT_SUCCESS":
        return <PaymentStatus status={paymentStatus} />;
      case "PAYMENT_FAILED":
        return <PaymentStatus status={paymentStatus} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="payment-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Payment</h1>
        <CloseIcon
          onClick={() => props.closePayment(false, "CLOSE_PAYMENT")}
        ></CloseIcon>
      </div>
      {renderPaymentComponent()}
    </div>
  );
};

export default Payment;
