import { Button, Divider, Drawer, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Radio, RadioGroup, Select, Slide, TextField, TextFieldProps, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NumericFormatProps, NumericFormat } from 'react-number-format';
import { currencyAmountAPI, paymentAPI } from '../api/api';
import "./Payment.css";
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export interface CurrencyAmount {
    name: string,
    abbreviation: string,
    sign: string,
    amount: number
}

interface ErrorMessage {
    payeeError: string | undefined,
    amountError: string | undefined
}

function NumberFormatCustom(props: any) {
    const { inputRef, onChange, isEditable, value, ...other } = props;
    console.log(isEditable, value)
    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                target: {
                    name: props.name,
                    value: values.value
                }
                });
            }}
            value={value}
            readOnly={!isEditable}
            thousandSeparator
        />
    );
}

interface PaymentProps {
    showPayment: boolean,
    closePayment: (show: boolean, action: string) => void,
    paymentFormProps: {
        payee: string,
        currency: string | undefined,
        amount: number,
        isEditable: boolean
    }
}

const Payment = (props: PaymentProps) => {
    const [payee, setPayee] = useState<string>(props.paymentFormProps.payee);
    const [currency, setCurrency] = useState<CurrencyAmount | undefined>();
    const [amount, setAmount] = useState<number>(props.paymentFormProps.amount);
    const transactionCharges: number = 1.74;
    const [availableCurrency, setAvailableCurrency] = useState<CurrencyAmount[]>([]);
    const [errorState, setErrorState] = useState<ErrorMessage>({} as ErrorMessage);
    const [transactionCurrency, setTransactionCurrency] = useState<CurrencyAmount | undefined>();

    useEffect(() => {
        const currencies: CurrencyAmount[] = currencyAmountAPI();
        setAvailableCurrency(currencies);
        if(!props.paymentFormProps.currency) {
            setCurrency(currencies[0]);
        } else {
            setCurrency(currencies.filter(curr => (curr.abbreviation === props.paymentFormProps.currency))[0])
        }
        setTransactionCurrency(currencies[0]);
    }, []);

    useEffect(() => {
        setErrorState({
            ...errorState,
            payeeError: undefined
        })
    }, [payee])

    useEffect(() => {
        setErrorState({
            ...errorState,
            amountError: undefined
        })
    }, [amount, currency])

    const onAmountChange = (event: any) => {
        if(!props.paymentFormProps.isEditable && amount === props.paymentFormProps.amount) {
            console.log("HERE")
            return;
        }
        let value = event.target.value;
        if(value === "") {
            setAmount(0);
            return;
        }
        setAmount(parseFloat(value));
    }

    const handleCurrencyChange = (event: any) => {
        const selectedCurrency: string = event.target.value;
        setCurrency(availableCurrency.find((curr) => curr.abbreviation === selectedCurrency));
    }

    const handleTransactionCurrencyChange = (event: any) => {
        const selectedCurrency: string = event.target.value;
        setTransactionCurrency(availableCurrency.find((curr) => curr.abbreviation === selectedCurrency));
    }

    const handlePayeeChange = (event: any) => {
        if(!props.paymentFormProps.isEditable) {
            return;
        }
        setPayee(event.target.value);
    }

    const payeeValidation = (payee: string) => {
        if(payee !== "") {
            return true;
        }
        setErrorState({
            ...errorState,
            payeeError: "Required field. Payee cannot be left blank."
        })
        return false;
    }

    const amountValidation = (amount: number, selectedCurrency: CurrencyAmount) => {
        if((amount > 0) && (amount <= selectedCurrency.amount)) {
            return true;
        }
        let errorMessage: string = "";
        if(amount <= 0) {
            errorMessage = "Amount should be greater than zero.";
        } else if(amount >= selectedCurrency.amount) {
            errorMessage = "Insufficient balance.";
        }
        setErrorState({
            ...errorState,
            amountError: errorMessage
        });
        return false;
    }

    const paymentValidation = (payee: string, amount: number, selectedCurrency: CurrencyAmount) => {
        return payeeValidation(payee) && amountValidation(amount, selectedCurrency);
    }

    const onPaymentClick = (event: any) => {
        if(!currency) {
            return;
        }
        if(!paymentValidation(payee, amount, currency)) {
            return;
        }
        paymentAPI(amount).then((res: any) => {
            if(!res.ok) {
                alert("Payment Failed!");
            } else {
                alert("Payment Success");
            }
        }).catch(() => {
            alert("Payment Failed!");
        })
    }

    if(!currency || !transactionCurrency) {
        return <></>;
    }

    return <div className="payment-container">
            <div>
                <h1>Payment</h1>
            </div>
            <div className="payment-details-container">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            id="payment-to" 
                            variant="outlined" 
                            label="Payee"
                            fullWidth
                            value={payee}
                            size='small'
                            onChange={handlePayeeChange}
                            error={(errorState.payeeError !== undefined)}
                            helperText={errorState.payeeError}
                            />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth size="small">
                            <Select
                                id="currency-select"
                                value={currency.abbreviation}
                                onChange={handleCurrencyChange}
                                readOnly={!props.paymentFormProps.isEditable}
                            >
                                {
                                    availableCurrency.map((curr) => <MenuItem value={curr.abbreviation}>{curr.abbreviation}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField 
                            id="payment-to" 
                            variant="outlined" 
                            fullWidth 
                            value={(amount === 0) ? "" : amount} 
                            label="Amount"
                            size="small"
                            onChange={onAmountChange}
                            inputProps={{isEditable: props.paymentFormProps.isEditable}}
                            InputProps={{
                                inputComponent: NumberFormatCustom
                            }} 
                            error={(errorState.amountError !== undefined)}
                            helperText={errorState.amountError}
                            />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth size="small">
                            <Select
                                id="transaction-currency-select"
                                value={transactionCurrency.abbreviation}
                                onChange={handleTransactionCurrencyChange}
                            >
                                {
                                    availableCurrency.map((curr) => <MenuItem value={curr.abbreviation}>{curr.abbreviation}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField 
                            id="transaction-charges-amount" 
                            variant="outlined" 
                            fullWidth 
                            value={(transactionCharges === 0) ? "" : transactionCharges} 
                            label="Transaction Charge"
                            size="small"
                            inputProps={{isEditable: false}}
                            InputProps={{
                                inputComponent: NumberFormatCustom
                            }} 
                            error={(errorState.amountError !== undefined)}
                            helperText={errorState.amountError}
                            
                            />
                    </Grid>
                </Grid>
            </div>
            <div className="balance-container">
                <List disablePadding>
                    {
                        availableCurrency.map((curr) => <>
                            <ListItem
                                secondaryAction={
                                    (curr.abbreviation !== currency.abbreviation) ? <></> :
                                        (curr.amount >= amount) ? 
                                            <Tooltip title='Balance is sufficient for transaction.'>
                                                <CheckIcon color='success'/>
                                            </Tooltip> :
                                            <Tooltip title='Insufficient Balance.'>
                                                <ErrorOutlineIcon color='warning' />
                                            </Tooltip>
                                }
                            >
                                <ListItemText primary={curr.abbreviation} secondary={curr.amount} />
                            </ListItem>
                            <Divider />
                        </>)
                    }
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
                <Button variant="contained" onClick={onPaymentClick}>Pay Now</Button>
            </div>
        </div>
}

export default Payment;