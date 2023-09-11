import { CurrencyAmount } from "../payment/Payment";

const PAYMENT_ENDPOINT = "http://localhost:8080/add";
const TRANSFER_UTILITY = "http://localhost:8080/transferUtility";

export const paymentAPI = (amount: any): Promise<any> => {
  let body: any = {
    user_id: "asthay@gmail.com",
    fiat_wallet_id: "w123",
    fiat_wallet_balance: 96.6,
    fiat_wallet_currency: "USD",
    crypto_wallet_id: "cr123",
    crypto_wallet_balance: ["0.53 USDT", "22.6 ETH", "23 MATIC"],
    crypto_wallet_currency: "ETH",
    email: "asthay61@gmail.com",
    txn_client_name: "Amazon",
    txn_client_id: "cli_123",
    crypto_txn_fee: amount,
    crypto_txn_currency: "ETH",
    fiat_txn_fee: 0.0074,
    fiat_txn_currency: "USD",
    txn_type: "SPONSORED",
    txn_mode: "MERCHANTPAYMENT",
    currency_type: "UTILITY",
  };

  var formBody: any = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(TRANSFER_UTILITY, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
};

export const currencyAmountAPI = (): CurrencyAmount[] => {
  return [
    {
      name: "Dollar",
      abbreviation: "USD",
      sign: "$",
      amount: 39.5,
    },
    {
      name: "Matic",
      abbreviation: "MATIC",
      sign: "MATIC",
      amount: 4.3332,
    },

    {
      name: "Etherium",
      abbreviation: "ETH",
      sign: "ETH",
      amount: 0.01543,
    },
    {
      name: "Bitcoin",
      abbreviation: "BTC",
      sign: "BTC",
      amount: 0.43332,
    },
  ];
};

export const createWalletAPI = (email: string): Promise<any> => {
  let body: any = {
    user_id: email,
    fiat_wallet_id: "w123",
    fiat_wallet_balance: 96.6,
    fiat_wallet_currency: "USD",
    crypto_wallet_id: "cr123",
    crypto_wallet_balance: ["0.53 USDT", "22.6 ETH", "23 MATIC"],
    crypto_wallet_currency: "ETH",
    email: email,
    txn_client_name: "Amazon",
    txn_client_id: "cli_123",
    crypto_txn_fee: 0.0,
    crypto_txn_currency: "ETH",
    fiat_txn_fee: 0.0074,
    fiat_txn_currency: "USD",
    txn_type: "SPONSORED",
    txn_mode: "MERCHANTPAYMENT",
    currency_type: "UTILITY",
  };

  var formBody: any = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(TRANSFER_UTILITY, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
};
