const mongoose = require('mongoose');

// Schema for AddressBook
const TransactionSchema = mongoose.Schema({

    user_id: {
     type: String,
     required: true
    },
    fiat_wallet_id: {
        type: String,
        required: true
       },
    fiat_wallet_balance: {
        type: Number,
        required: true
       },
    fiat_wallet_currency: {
        type: String,
        required: true
       },
    crypto_wallet_id: {
        type: String,
        required: true
       },
    crypto_wallet_balance: {
        type: Array, //[0.53 USDT, 0.1 ETH, 23 MATIC]
        required: true
       },
    crypto_wallet_currency: {
        type: String,
        required: true
       },
    email: {
     type: String,
     required: true
    },
    txn_client_name: {
     type: String,
     required: true
    },
    txn_client_id: {
     type: String,
     required: true
    },
    crypto_txn_fee: {
        type: Number,
        required: true
    },
    crypto_txn_currency: {
        type: String,
        required: true
    },
    fiat_txn_fee: {
        type: Number,
        required: true
    },
    fiat_txn_currency: {
        type: String,
        required: true
    },
    txn_type: {
        type: String, 
        enum : ['SPONSORED','SELF'],
        default: 'SPONSORED'
    },
    txn_mode: {
        type: String, 
        enum : ['MERCHANTPAYMENT','CRYPTOTRANSFER'],
        default: 'MERCHANTPAYMENT'
    },
    timestamp: {
        type: Number,
        default: (new Date()).getTime()
    },
    currency_type: {
        type: String, 
        enum : ['UTILITY','ERC20'],
        default: 'UTILITY'
    }
   
   })
   //Creating the collection Address
   const Transaction = mongoose.model('Transaction', TransactionSchema)
  
   module.exports = Transaction