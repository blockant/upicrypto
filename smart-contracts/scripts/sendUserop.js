const axios = require("axios");
const { ethers } = require("hardhat");
require("dotenv").config();
const { UserOperationBuilder } = require("userop");

const smartWalletABI =
  require("../artifacts/contracts/SmartWallet.sol/SmartWallet.json").abi;

async function main() {
  //   console.log("Abi for the contract", smartWalletABI);
  const benificiaryAddress = "0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2";
  const receiverAddr = "0xb34cDe61a284205ffeD6Baf0b06F0445336631DC";
  const EntryPoint_Addr = "0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2"; //"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; //"0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2";
  const privateKey = process.env.POLYGON_PRIVATE_KEY;

  const sender = "0xAa3bcBC78bc9d06CBA9355bf0dE0Dfd7D92957a0";
  // const nonce = "0";
  const callGasLimit = "1000000";
  const verificationGasLimit = "200000";
  const preVerificationGas = "5000000";
  const maxFeePerGas = "10000000000";
  const maxPriorityFeePerGas = "10000000000";
  const smartAccount = new ethers.utils.Interface(smartWalletABI);
  const amount = ethers.utils.parseEther("0.01");
  console.log("Amount", amount);

  const calldata = smartAccount.encodeFunctionData("executeFromEntryPoint", [
    receiverAddr,
    amount,
    "0x",
  ]);
  const smartwallet = await ethers.getContractAt(
    "SmartWallet",
    "0xAa3bcBC78bc9d06CBA9355bf0dE0Dfd7D92957a0"
  );

  const builder = new UserOperationBuilder().useDefaults({ sender });
  console.log("Builder", builder);
  // Build op with the middleware stack.
  let userOp = await builder.buildOp(EntryPoint_Addr, 80001);
  console.log("new userOp is ", userOp);

  // Reset op back to default values when you're done.
  // builder.resetOp();

  const nonce = await smartwallet.nonce();
  const owner = await smartwallet.owner();
  console.log("nonce", nonce);
  console.log("owner", owner);

  console.log("Call data", calldata);

  const EntryPoint = await ethers.getContractAt("EntryPoint", EntryPoint_Addr);

  const getUserOpHash = () => {
    const packed = ethers.utils.defaultAbiCoder.encode(
      [
        "address",
        "uint256",
        "bytes32",
        "bytes32",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes32",
      ],
      [
        sender,
        nonce,
        ethers.utils.keccak256("0x"),
        ethers.utils.keccak256(calldata),
        callGasLimit,
        verificationGasLimit,
        preVerificationGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        ethers.utils.keccak256("0x"),
      ]
    );

    const enc = ethers.utils.defaultAbiCoder.encode(
      ["bytes32", "address", "uint256"],
      [ethers.utils.keccak256(packed), EntryPoint_Addr, 80001]
    );

    return ethers.utils.keccak256(enc);
  };

  const userOpHash = getUserOpHash();
  console.log("userOpHash :", userOpHash);
  // try {
  //   const userOpHash = await EntryPoint.getUserOpHash({
  //     sender: "0xAa3bcBC78bc9d06CBA9355bf0dE0Dfd7D92957a0",
  //     nonce: "0",
  //     initCode: "0x",
  //     callData:
  //       "0x73a68f7a000000000000000000000000b34cde61a284205ffed6baf0b06f0445336631dc000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
  //     callGasLimit: "500000",
  //     verificationGasLimit: "200000",
  //     preVerificationGas: " 50000",
  //     maxFeePerGas: "10000000",
  //     maxPriorityFeePerGas: "10000000",
  //     paymasterAndData: "0x",
  //     signature:
  //       "0x3c1f20886bce0d923d4746843ab0437bb88aec11c2a288755bcd904622d5c3132f8b4ac56967027a2d43dc831784e9763dd36a68dda841e7a64fbc1530967abd1c",
  //   });
  //   console.log("userOphash", userOpHash);
  // } catch (error) {
  //   console.log("Error from function call", error);
  // }
  // console.log("userOphash", userOpHash);
  const arraifiedHash = ethers.utils.arrayify(userOpHash);
  console.log("Arraifiedfied hash", arraifiedHash);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const signature = await wallet.signMessage(arraifiedHash);
  console.log("Signature", signature);

  const userOperations = [
    {
      sender: sender,
      nonce: "0x0",
      initCode: "0x",
      callData: calldata,
      callGasLimit: callGasLimit,
      verificationGasLimit: verificationGasLimit,
      preVerificationGas: preVerificationGas,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      paymasterAndData: "0x",
      signature: signature,
    },
  ];
  console.log("UserOp", userOperations);

  // const EntryPoint = await ethers.getContractAt("EntryPoint", EntryPoint_Addr);

  try {
    const tx = await EntryPoint.connect(wallet).handleOps(
      userOperations,
      benificiaryAddress,
      { gasLimit: 1500000 }
    );
    await tx.wait();
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// const pm_options = {
//   method: "POST",
//   url: "https://api.stackup.sh/v1/paymaster/79225dbae15054cc4d30baa56d27b24cf664712132a50a650f06b07d301ce91a",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//   },
//   data: {
//     jsonrpc: "2.0",
//     id: 1,
//     method: "pm_sponsorUserOperation",
//     params: [
//       {
//         sender: sender,
//         nonce: "0x0",
//         initCode: "0x",
//         callData: calldata,
//         callGasLimit: "1000000",
//         verificationGasLimit: "200000",
//         preVerificationGas: "5000000",
//         maxFeePerGas: "10000000000",
//         maxPriorityFeePerGas: "10000000000",
//         paymasterAndData: "0x",
//         signature: signature,
//       },
//       "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
//       {
//         type: "payg",
//       },
//     ],
//   },
// };
// await axios
//   .request(pm_options)
//   .then(function (response) {
//     console.log("paymaster response", response.data);
//   })
//   .catch(function (error) {
//     console.error("paymaster error ", error);
//   });
// const options = {
//   method: "POST",
//   url: "https://api.stackup.sh/v1/node/79225dbae15054cc4d30baa56d27b24cf664712132a50a650f06b07d301ce91a",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//   },
//   data: {
//     jsonrpc: "2.0",
//     id: 1,
//     method: "eth_sendUserOperation",
//     params: [
//       {
//         sender: sender,
//         nonce: "0x0",
//         initCode: "0x",
//         callData: calldata,
//         callGasLimit: "12000000",
//         verificationGasLimit: "2000000",
//         preVerificationGas: "500000000000000",
//         maxFeePerGas: "10000000000",
//         maxPriorityFeePerGas: "10000000000",
//         paymasterAndData: "0x",
//         signature: signature,
//       },
//       "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
//     ],
//   },
// };
// await axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
//console.log("Transaction successful:", tx.logs);
