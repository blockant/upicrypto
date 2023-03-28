const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Transaction = require("./model/models");
const deligateAbi = require("./abi/deligatepaymentabi.json");
const deligatePaymentAddress = "0x9aFAe241D8d7d268fff21c74c4eeE319583d4458";
const ethers = require("ethers");
const cors = require("cors");

//Initialize express app
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// console.log("INITAILZED", deligateAbi);

//initializing the provider

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
);
//private key
const PRIVATE_KEY =
  "6d17286d5e09678c23c0fe7a95715146892c95294d1acd8fb399b53bdd14e9b2";

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const deligatePaymentContract = new ethers.Contract(
  deligatePaymentAddress,
  deligateAbi,
  signer
);

//Connecting to DB
mongoose
  .connect(
    "mongodb+srv://ritesh:AIAapIdkm4zvFSsi@deliagtepayment.7k79itr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to upicrypto db");
  })
  .catch((error) => {
    console.log(error);
  });

//Reading all Transactions from TransactionBook

app.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.send(transactions);
    console.log(transactions);
  } catch (err) {
    console.log(err);
  }
});

// Adding a Transaction to TransactionBook
app.post("/add", async (req, res) => {
  console.log("user ID", req.body);
  (user_id = req.body.user_id),
    (fiat_wallet_id = req.body.fiat_wallet_id),
    (fiat_wallet_balance = req.body.fiat_wallet_balance),
    (fiat_wallet_currency = req.body.fiat_wallet_currency),
    (crypto_wallet_id = req.body.crypto_wallet_id),
    (crypto_wallet_balance = req.body.crypto_wallet_balance),
    (crypto_wallet_currency = req.body.crypto_wallet_currency),
    (email = req.body.email),
    (txn_client_name = req.body.txn_client_name),
    (txn_client_id = req.body.txn_client_id);
  (crypto_txn_fee = req.body.crypto_txn_fee),
    (crypto_txn_currency = req.body.crypto_txn_currency),
    (fiat_txn_fee = req.body.fiat_txn_fee),
    (fiat_txn_currency = req.body.fiat_txn_currency),
    (txn_type = req.body.txn_type),
    (txn_mode = req.body.txn_mode),
    (crypto_currency_type = req.body.crypto_currency_type),
    (timestamp = req.body.timestamp);

  let newTransaction = new Transaction({
    user_id: user_id,
    fiat_wallet_id: fiat_wallet_id,
    fiat_wallet_balance: fiat_wallet_balance,
    fiat_wallet_currency: fiat_wallet_currency,
    crypto_wallet_id: crypto_wallet_id,
    crypto_wallet_balance: crypto_wallet_balance,
    crypto_wallet_currency: crypto_wallet_currency,
    email: email,
    txn_client_name: txn_client_name,
    txn_client_id: txn_client_id,
    crypto_txn_fee: crypto_txn_fee,
    crypto_txn_currency: crypto_txn_currency,
    fiat_txn_fee: fiat_txn_fee,
    fiat_txn_currency: fiat_txn_currency,
    txn_type: txn_type,
    txn_mode: txn_mode,
    crypto_currency_type: crypto_currency_type,
  });

  newTransaction
    .save()
    .then(async (transaction) => {
      res.send(transaction);
      const options = { gasLimit: 300000 };
      const tx = await deligatePaymentContract.delegatePayment(options);
      console.log("TRANSACTION", tx);
      const transactionReceipt = await tx.wait();
      console.log("TRANSACTIONRECEIPT", transactionReceipt);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Updating the Transaction

app.post("/update/:id", (req, res) => {
  let transaction = {};

  if (req.body.user_id) transaction.user_id = req.body.user_id;
  if (req.body.fiat_wallet_id)
    transaction.fiat_wallet_id = req.body.fiat_wallet_id;
  if (req.body.fiat_wallet_balance)
    transaction.fiat_wallet_balance = req.body.fiat_wallet_balance;
  if (req.body.fiat_wallet_currency)
    transaction.fiat_wallet_currency = req.body.fiat_wallet_currency;
  if (req.body.crypto_wallet_id)
    transaction.crypto_wallet_id = req.body.crypto_wallet_id;
  if (req.body.crypto_wallet_balance)
    transaction.crypto_wallet_balance = req.body.crypto_wallet_balance;
  if (req.body.crypto_wallet_currency)
    transaction.crypto_wallet_currency = req.body.crypto_wallet_currency;
  if (req.body.email) transaction.email = req.body.email;
  if (req.body.txn_client_name)
    transaction.txn_client_name = req.body.txn_client_name;
  if (req.body.txn_client_id)
    transaction.txn_client_id = req.body.txn_client_id;
  if (req.body.crypto_txn_fee)
    transaction.crypto_txn_fee = req.body.crypto_txn_fee;
  if (req.body.crypto_txn_fee)
    transaction.crypto_txn_fee = req.body.crypto_txn_fee;
  if (req.body.crypto_txn_currency)
    transaction.crypto_txn_currency = req.body.crypto_txn_currency;
  if (req.body.fiat_txn_fee) transaction.fiat_txn_fee = req.body.fiat_txn_fee;
  if (req.body.fiat_txn_currency)
    transaction.fiat_txn_currency = req.body.fiat_txn_currency;
  if (req.body.txn_type) transaction.txn_type = req.body.txn_type;
  if (req.body.txn_mode) transaction.txn_mode = req.body.txn_mode;
  if (req.body.crypto_currency_type)
    transaction.crypto_currency_type = req.body.crypto_currency_type;

  transaction = { $set: transaction };

  Transaction.updateOne({ _id: req.params.id }, transaction)
    .then(() => {
      res.send(transaction);
    })
    .catch((err) => {
      console.log(error);
    });
});

// Deleting the User from AddressBook

app.delete("/delete/:id", (req, res) => {
  Transaction.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send("Transaction deleted");
    })
    .catch((err) => {
      console.log(error);
    });
});

// Initialize the sever
app.listen(3002, () => {
  console.log("sever listening on port:5000");
});
