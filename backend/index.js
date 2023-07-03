const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Transaction = require('./model/models')

//Initialize express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Connecting to DB
mongoose.connect('mongodb://localhost:27017/upicrypto', {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
 console.log('connected to upicrypto db')
}).catch((error) => {
 console.log(error)
})

// Reading all Transactions from TransactionBook

app.get('/', async(req, res) =>{
  try {
    const transactions = await Transaction.find({ });
      res.send(transactions);
      console.log(transactions);
    } catch (err) {
      console.log(err);
    }
  });


// # BUNDLERS #  
// Adding a Transaction for Utility token transfer using Bundlers to TransactionBook
app.post('/transferUtility', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})


// Adding a Transaction for ERC20 transfer using Bundlers to TransactionBook
app.post('/add', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})


// Adding a Transaction for Utility token batch transfer using Bundlers to TransactionBook
app.post('/batchTransferUtility', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})

// Adding a Transaction for ERC20 tokens batch transfer using Bundlers to TransactionBook
app.post('/batchtransferERC20', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})


// # Paymaster #
// Adding a Transaction for Utility token transfer using Paymaster to TransactionBook
app.post('/transferUtilityWithPaymaster', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})


// Adding a Transaction for ERC20 transfer using Paymaster to TransactionBook
app.post('/transferERC20WithPaymaster', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})


// Adding a Transaction for Utility token batch transfer using Paymaster to TransactionBook
app.post('/batchTransferUtilityWithPaymaster', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})

// Adding a Transaction for ERC20 tokens batch transfer using Paymaster to TransactionBook
app.post('/batchtransferERC20WithPaymaster', (req, res) => {
  console.log("user ID", req.body);
	user_id = req.body.user_id,
	fiat_wallet_id = req.body.fiat_wallet_id,
	fiat_wallet_balance = req.body.fiat_wallet_balance,
	fiat_wallet_currency = req.body.fiat_wallet_currency,
  crypto_wallet_id = req.body.crypto_wallet_id,
  crypto_wallet_balance = req.body.crypto_wallet_balance,
  crypto_wallet_currency = req.body.crypto_wallet_currency,
  email = req.body.email,
  txn_client_name = req.body.txn_client_name,
  txn_client_id = req.body.txn_client_id;
  crypto_txn_fee = req.body.crypto_txn_fee,
  crypto_txn_currency = req.body.crypto_txn_currency,
  fiat_txn_fee = req.body.fiat_txn_fee,
  fiat_txn_currency = req.body.fiat_txn_currency,
  txn_type = req.body.txn_type,
  txn_mode = req.body.txn_mode,
  crypto_currency_type = req.body.crypto_currency_type,
  timestamp = req.body.timestamp

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
    crypto_currency_type: crypto_currency_type
  })

	newTransaction.save().then((transaction) => {
		res.send(transaction)
	}).catch((err) => {
		console.log(err)
	})
})


// Updating the Transaction

app.post('/update/:id', (req, res) => {
	let transaction = {}

  if (req.body.user_id) transaction.user_id = req.body.user_id
  if (req.body.fiat_wallet_id) transaction.fiat_wallet_id = req.body.fiat_wallet_id
  if (req.body.fiat_wallet_balance) transaction.fiat_wallet_balance = req.body.fiat_wallet_balance
  if (req.body.fiat_wallet_currency) transaction.fiat_wallet_currency = req.body.fiat_wallet_currency
  if (req.body.crypto_wallet_id) transaction.crypto_wallet_id = req.body.crypto_wallet_id
  if (req.body.crypto_wallet_balance) transaction.crypto_wallet_balance = req.body.crypto_wallet_balance
  if (req.body.crypto_wallet_currency) transaction.crypto_wallet_currency = req.body.crypto_wallet_currency
  if (req.body.email) transaction.email = req.body.email
  if (req.body.txn_client_name) transaction.txn_client_name = req.body.txn_client_name
  if (req.body.txn_client_id) transaction.txn_client_id = req.body.txn_client_id
  if (req.body.crypto_txn_fee) transaction.crypto_txn_fee = req.body.crypto_txn_fee
  if (req.body.crypto_txn_fee) transaction.crypto_txn_fee = req.body.crypto_txn_fee
  if (req.body.crypto_txn_currency) transaction.crypto_txn_currency = req.body.crypto_txn_currency
  if (req.body.fiat_txn_fee) transaction.fiat_txn_fee = req.body.fiat_txn_fee
  if (req.body.fiat_txn_currency) transaction.fiat_txn_currency = req.body.fiat_txn_currency
  if (req.body.txn_type) transaction.txn_type = req.body.txn_type
  if (req.body.txn_mode) transaction.txn_mode = req.body.txn_mode
  if (req.body.crypto_currency_type) transaction.crypto_currency_type = req.body.crypto_currency_type

	transaction = { $set: transaction }

	Transaction.updateOne({_id: req.params.id}, transaction).then(() => {
		res.send(transaction)
	}).catch((err) => {
		console.log(error)
	})
})


// Deleting the User from AddressBook

app.delete('/delete/:id', (req, res) => {
	Transaction.deleteOne({_id: req.params.id}).then(() => {
		res.send('Transaction deleted')
	}).catch((err) => {
		console.log(error)
	})
})

// Initialize the sever
app.listen(3010, () => {
    console.log('sever listening on port:3010');
});
