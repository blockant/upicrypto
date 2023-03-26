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