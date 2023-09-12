# UpiCrypto
Unified Payment Interface for Crypto

# Project Description
Making user onboarding seamless through account abstraction: A unified crypto payment interface to make crypto payments seamless and easier.
Tool (DEV) » onboarding

Transaction cost will be taken care of by Platform through transaction subscription methodologies of ERC-4337 after staking utility tokens for transactions
This means that user can transfer 100 XRP and pay the transaction fee for 100 ETH in fiat. This makes it easier for user since they donot need to keep any crypto (required for transaction fee on the chain) and only with fiat can make transaction thus reducing on ramping. 
Also, it can be integration with many web3 platforms like gaming, social media where platform needs a seemless wallet integration.

# Functionalities For Users:
1. Private Key management / ERC 4337
2. Social Login - Register through Gmail/Google Accounts / Social accounts Onboarding through OAuth2
3. Passwordless authentication and authorisation - Link-based authentication through Gmail or SMS - Will use AWS SES for emails or mobile services for sending links through SMSs.

# Deployed Contracts 

## Polygon Mumbai
1. Paymaster Contract: https://mumbai.polygonscan.com/address/0xE6B255a6719f89BEE60dF0bcc971e49212Ff95F8#writeContract
2. UpiCrypto SmartWallet Contract: https://mumbai.polygonscan.com/address/0x29C23DE681878F96435451e149570bb10ebE4CE1#writeContract
3. EntryPoint Contract: https://mumbai.polygonscan.com/address/0x4A6Cba149892B8b8ac0dC581a4512D40C2fa7560#writeContract
4. Delegate Payment Contract: https://mumbai.polygonscan.com/address/0x9afae241d8d7d268fff21c74c4eee319583d4458#writeContract
5. MockERC20 Contract: https://mumbai.polygonscan.com/address/0x1dcd6c91cE4F12CD4e9969A047E43877ADE66A59#writeContract

# Account Abstraction (EIP-4337)

## Polygon zkEVM contracts
1. EntryPoint: https://testnet-zkevm.polygonscan.com/address/0x340f2cd1253d2e5ed8087d4da1958a20d9e87684#code
2. Smart Wallet: https://testnet-zkevm.polygonscan.com/address/0x0a678Df2dC9E7A288131bd7924b5d9026971c8F8#code
3. Paymaster: https://testnet-zkevm.polygonscan.com/address/0xFEaB7800f9CE8dA3F936f19BC7C03b11dF7D1845#code
4. Paymaster Token: https://testnet-zkevm.polygonscan.com/address/0x77c2686501FF82287558FE3c98424c074CA34E4A
5. Wallet Factory: https://testnet-zkevm.polygonscan.com/address/0x82BB132511196d92D1c9310D8Bb7bec3c9268D4a#code
6. ERC20 Mock Token: https://testnet-zkevm.polygonscan.com/address/0xa6FbF91843396D5FEb7711A87c37F25A3E9E6Dbf#readContract


## Linea Smart Contracts
1. EntryPoint: https://goerli.lineascan.build/address/0x0a678Df2dC9E7A288131bd7924b5d9026971c8F8#code
2. Smart Wallet: https://goerli.lineascan.build/address/0xFEaB7800f9CE8dA3F936f19BC7C03b11dF7D1845#code
3. Paymaster: https://goerli.lineascan.build/address/0x77c2686501FF82287558FE3c98424c074CA34E4A#code
4. Paymaster Token: https://goerli.lineascan.build/address/0x82BB132511196d92D1c9310D8Bb7bec3c9268D4a#code
5. Wallet Factory: https://goerli.lineascan.build/address/0xa6FbF91843396D5FEb7711A87c37F25A3E9E6Dbf#code
6. ERC20 Mock Token: https://goerli.lineascan.build/address/0x6265f71825Ce09F7544452109fb40a2521517238#code


## Taiko Smart Contracts
1. EntryPoint: https://explorer.test.taiko.xyz/address/0xa6FbF91843396D5FEb7711A87c37F25A3E9E6Dbf/write-contract#address-tabs
2. Smart Wallet: https://explorer.test.taiko.xyz/address/0xa6FbF91843396D5FEb7711A87c37F25A3E9E6Dbf/write-contract#address-tabs
3. Paymaster: https://explorer.test.taiko.xyz/address/0xa6FbF91843396D5FEb7711A87c37F25A3E9E6Dbf/write-contract#address-tabs
4. Paymaster Token: https://explorer.test.taiko.xyz/address/0xa6FbF91843396D5FEb7711A87c37F25A3E9E6Dbf/write-contract#address-tabs
5. Wallet Factory: https://explorer.test.taiko.xyz/address/0x77c2686501FF82287558FE3c98424c074CA34E4A#code
6. ERC20 Mock Token: https://explorer.test.taiko.xyz/address/0x82BB132511196d92D1c9310D8Bb7bec3c9268D4a#code

## Zilliqa Smart Contracts
1. EntryPoint: 0x340F2CD1253D2E5Ed8087D4Da1958a20d9E87684
2. Smart Wallet: 0x340F2CD1253D2E5Ed8087D4Da1958a20d9E87684
3. Paymaster: 0x0a678Df2dC9E7A288131bd7924b5d9026971c8F8
4. Paymaster Token: 0xFEaB7800f9CE8dA3F936f19BC7C03b11dF7D1845
5. Wallet Factory: 0x77c2686501FF82287558FE3c98424c074CA34E4A
6. ERC20 Mock Token: 0x82BB132511196d92D1c9310D8Bb7bec3c9268D4a

				

# UI/UX for the project

![image](https://user-images.githubusercontent.com/75947851/227715160-1ac967ce-b5c7-4e6a-aed4-60af872008f9.png)

![image](https://user-images.githubusercontent.com/75947851/227715212-fc63467b-e6a8-44eb-9a30-f3692b180584.png)

![image](https://user-images.githubusercontent.com/75947851/227715418-26b06986-16f2-41f3-a847-99706134a584.png)

![image](https://user-images.githubusercontent.com/75947851/227715424-bd3267c8-fcfa-4b9d-b5cd-7530c43e24dc.png)

![image](https://user-images.githubusercontent.com/75947851/227715428-9b54c30b-7d5e-4881-9a9d-c4e909150c46.png)

