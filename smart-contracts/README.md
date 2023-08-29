# Steps

1. `npx hardhat run scripts/deploy.js --network mumbai`
```
entryPoint deployed on polygon mumbai to 0x4A6Cba149892B8b8ac0dC581a4512D40C2fa7560
wallet deployed on polygon mumbai to 0x29C23DE681878F96435451e149570bb10ebE4CE1
paymaster deployed on polygon mumbai to 0xE6B255a6719f89BEE60dF0bcc971e49212Ff95F8
paymasterToken deployed on polygon mumbai to 0x9364930a054fb540d3Ab3086E9c94c19cE6eF794
factory deployed on polygon mumbai to 0x5b20fA3dabdbCeFF316f97151D398BF9847dF98e
token deployed on polygon mumbai to 0x1dcd6c91cE4F12CD4e9969A047E43877ADE66A59
```

2. 
```
npx hardhat verify 0x4A6Cba149892B8b8ac0dC581a4512D40C2fa7560 --network mumbai 
npx hardhat verify --constructor-args scripts/arguments.js 0x29C23DE681878F96435451e149570bb10ebE4CE1 --network mumbai 
npx hardhat verify 0xE6B255a6719f89BEE60dF0bcc971e49212Ff95F8 "0x4A6Cba149892B8b8ac0dC581a4512D40C2fa7560" --network mumbai
npx hardhat verify 0x9364930a054fb540d3Ab3086E9c94c19cE6eF794 "0x4A6Cba149892B8b8ac0dC581a4512D40C2fa7560" --network mumbai
npx hardhat verify 0x5b20fA3dabdbCeFF316f97151D398BF9847dF98e --network mumbai
npx hardhat verify 0x1dcd6c91cE4F12CD4e9969A047E43877ADE66A59 --network mumbai
```



# Account Abstraction (EIP-4337)






## Introduction:-

->Users interact with Ethereum using Externally Owned Accounts(EOAs). This is the only way to start a transaction or execute a smart contract. This limits how users can interact with Ethereum. For example, it makes it difficult to do batches of transactions and requires users to always keep an ETH balance to cover gas.


Account abstraction is a way to solve these problems by allowing users to flexibly program more security and better user experiences into their accounts. This can happen by upgrading EOAs so they can be controlled by smart contracts, or by upgrading smart contracts so they can initiate transactions. These options both require changes to the Ethereum protocol. There is also a third path involving adding a second, separate transaction system to run in parallel to the existing protocol. Regardless of the route, the outcome is access to Ethereum via smart contract wallets, either natively supported as part of the existing protocol or via an add-on transaction network.


ERC-4337(Account Abstraction via Entry Point Contract specification) is a specification that aims to use an entry point contract to achieve account abstraction without changing the consensus layer protocol of Ethereum.
	
Instead of modifying the logic of the consensus layer itself, ERC-4337 replicates the functionality of the transaction mempool in a higher-level system. Users send UserOperation objects that package up the user’s intent along with signatures and other data for verification. Either miners or bundlers using services such as Flashbots can package up a set of UserOperation objects into a single “bundle transaction”, which then gets included into an Ethereum block.


ERC-4337 also introduces a Paymaster mechanism that can enable users to pay gas fees using ERC-20 tokens (e.g. USDC) instead of ETH or to allow a third party to sponsor their gas fees altogether, all in a decentralized fashion.

## Architecture:-

->There are several main components to ERC-4337: UserOperation, Bundler, EntryPoint Contract, Account Contract, Account Factory Contract and Paymaster Contract :-

- UserOperations:- UserOperations are pseudo-transaction objects that are used to execute transactions with contract accounts. These are created by the dapp. Wallets should be able to translate regular transactions into UserOperations so dapps' frontends don't need to change anything to support ERC-4337

- Bundlers:- Bundlers are actors that package UserOperations from a mempool and send them to the EntryPoint contract on the blockchain.

- EntryPoint:- EntryPoint is a smart contract that handles the verification and execution logic for transactions. Account Contracts are smart contract accounts owned by a user.


- Account Contract:-  Account Contract is the smart contract wallet of a user. Wallet developers are required to implement at least two custom functions - one to verify signatures, and another to process transactions.

- Factory Contract:- Factory Contract - When using a wallet for the first time, the initCode field of the UserOperation is used to specify the creation of the smart contract wallet. This is used concurrently with the first actual operation of the wallet (in the same UserOperation). Therefore, wallet developers also need to implement the account factory contract. Creating new wallets should use the CREATE2 method to ensure the determinacy of generated addresses.
- Paymaster Contracts:- Paymaster Contracts are optional smart contract accounts that can sponsor gas fees for Account Contracts, or allow their owners to pay for those fees with ERC-20 tokens instead of ETH. 


## Features

- Multisig authorization: You can share authorization credentials across multiple trusted people or devices. Then the contract can be configured so that transactions of more than some preset value require authorization from a certain proportion (e.g. 3/5) of the trusted parties. For example, high value transactions might require approval from both a mobile device and a hardware wallet, or signatures from accounts distributed to trusted family members.

- Account freezing: If a device is lost or compromised the account can be locked from another authorized device, protecting the user's assets.

- Account recovery: Lost a device or forgotten a password? In the current paradigm this means your assets could be frozen forever. With a smart contract wallet, you can set some pre-approved accounts that can authorize new devices and reset access.
- Set transaction limits: specify daily thresholds for how much value can be transferred from the account in a day/week/month. This means if an attacker does gain access to your account they can't drain everything at once and you have opportunities to freeze and reset access.

- Create whitelists: only allow transactions to certain addresses that you know to be safe. This means that even if your private key was stolen, the attacker could not send funds to non-whitelisted destination accounts. These whitelists would require multiple signatures to change them so that an attacker couldn't add their own address to the list unless they had access to several of your backup keys.

- Batched Transactions :- With Account Abstraction, users can streamline their Ethereum interactions by executing multiple transactions in a single, cohesive sequence. For instance, users can seamlessly combine actions like approving a transaction and executing a swap into a singular operation. This not only enhances operational efficiency but also reduces the need for multiple interactions, resulting in a more user-friendly and intuitive experience.

