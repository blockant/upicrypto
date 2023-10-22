import { CurrencyAmount } from "../payment/Payment";
import { ethers } from "ethers";

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
interface TokenData {
  name: string;
  abbreviation: string;
  sign: string;
  amount: number;
}
// interface CurrencyAmountAPI {
//   network: string;
//   walletAddress: string;
// }

export const currencyAmountAPI = (
  network: string,
  walletAddress: string
): Promise<CurrencyAmount[]> => {
  return new Promise<CurrencyAmount[]>(async (resolve, reject) => {
    const networkOptions: Record<string, { name: string; symbol: string }> = {
      Ethereum: { name: "Ethereum", symbol: "ETH" },
      Polygon: { name: "Polygon", symbol: "MATIC" },
      "Mumbai Testnet": { name: "Mumbai Testnet", symbol: "MATIC" },
      Kovan: { name: "Kovan", symbol: "ETH" },
    };

    const getTokenBalances = async (
      address: string
    ): Promise<CurrencyAmount[]> => {
      let subTokenData;
      let usdData: {
        name: string;
        abbreviation: string;
        sign: string;
        amount: number;
      } = {
        name: "Dollar",
        abbreviation: "USD",
        sign: "$",
        amount: 0,
      };
      try {
        console.log("inside update fiat balance ", walletAddress);
        const response = await fetch(
          `http://localhost:8000/get-wallet-balance/${walletAddress}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

        const data = await response.json();
        //setFiatBalance(data.balance); // Assuming setFiatBalance is a function that updates state
        console.log("Wallet balance ", data.balance);
        usdData = {
          name: "Dollar",
          abbreviation: "USD",
          sign: "$",
          amount: data.balance,
        };
        console.log("USED DATA FROM API", usdData);
      } catch (error) {
        console.error("Error checking and updating balance:", error);

        return [];
      }
      try {
        console.log("ADDRESS inside api is ", walletAddress);
        const provider = new ethers.providers.JsonRpcProvider(
          "https://polygonzkevm-testnet.g.alchemy.com/v2/nYeaX4kyXgRrg2BDIwAi1w7fMvH8Spq8"
        );

        const balanceWei = await provider.getBalance(walletAddress);
        const balanceEther = ethers.utils.formatEther(balanceWei);
        //  setMaticBalance(Number(balanceEther));

        subTokenData = {
          name: "POLYGON", //networkOptions[network].name,
          abbreviation: "MATIC", //networkOptions[network].symbol,
          sign: "MATIC", //networkOptions[network].symbol,
          amount: Number(balanceEther),
        };
      } catch (error) {
        console.error(`Error fetching balance: ${error}`);
        throw error;
      }

      // const url = `https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8`;
      // const options = {
      //   method: "POST",
      //   headers: {
      //     accept: "application/json",
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: 1,
      //     jsonrpc: "2.0",
      //     method: "alchemy_getTokenBalances",
      //     params: [walletAddress],
      //   }),
      // };
      const tokenDataArray: CurrencyAmount[] = [subTokenData];

      try {
        // const res = await fetch(url, options);
        // const response = await res.json();
        // console.log("response", response);

        // const balances = response["result"];
        // console.log("balances", balances);

        // const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
        //   return token.tokenBalance !== "0";
        // });
        // console.log("nonXero balances", nonZeroBalances);

        // const tokenDataArray: CurrencyAmount[] = await Promise.all(
        //   nonZeroBalances.map(async (token: any) => {
        //     const metadataOptions = {
        //       method: "POST",
        //       headers: {
        //         accept: "application/json",
        //         "content-type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         id: 1,
        //         jsonrpc: "2.0",
        //         method: "alchemy_getTokenMetadata",
        //         params: [token.contractAddress],
        //       }),
        //     };

        //     const metadataRes = await fetch(url, metadataOptions);
        //     const metadata = await metadataRes.json();
        //     const tokenMetadata = metadata["result"];

        //     const balance = (
        //       parseFloat(token.tokenBalance) /
        //       Math.pow(10, tokenMetadata.decimals)
        //     ).toFixed(2);

        //     return {
        //       name: tokenMetadata.name,
        //       abbrivation: tokenMetadata.symbol,
        //       sign: tokenMetadata.symbol,
        //       amount: balance,
        //     };
        //   })
        //);
        console.log("TokenArray", tokenDataArray);
        // tokenDataArray.push(subTokenData);
        tokenDataArray.unshift(subTokenData);
        console.log("UsdData at the end", usdData);
        usdData && tokenDataArray.push(usdData);
        console.log("tokenData array is from api", tokenDataArray);
        return tokenDataArray;
      } catch (error) {
        console.error(
          "Error while fetching data: from the async   api ",
          error
        );
        return [];
      }
    };
    let dataD: CurrencyAmount[];
    try {
      const dataD = await getTokenBalances(network);
      // Return the dataD as the result of the currencyAmountAPI function
      resolve(dataD);
    } catch (error) {
      console.log("Error from api", error);
      // If there's an error, you can return an empty array or handle it as needed.
      return [];
    }
  });
  // return [
  //   {
  //     name: "Dollar",
  //     abbreviation: "USD",
  //     sign: "$",
  //     amount: 39.5,
  //   },
  //   {
  //     name: "Matic",
  //     abbreviation: "MATIC",
  //     sign: "MATIC",
  //     amount: 4.3332,
  //   },

  //   {
  //     name: "Etherium",
  //     abbreviation: "ETH",
  //     sign: "ETH",
  //     amount: 0.01543,
  //   },
  //   {
  //     name: "Bitcoin",
  //     abbreviation: "BTC",
  //     sign: "BTC",
  //     amount: 0.43332,
  //   },
  // ];
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
