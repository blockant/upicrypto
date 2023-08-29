const { ethers } = require("hardhat");
const smartWalletABI =
  require("../artifacts/contracts/SmartWallet.sol/SmartWallet.json").abi;

async function main() {
  //   console.log("Abi for the contract", smartWalletABI);
  const benificiaryAddress = "0xb34cDe61a284205ffeD6Baf0b06F0445336631DC";
  const receiverAddr = "0xb34cDe61a284205ffeD6Baf0b06F0445336631DC";
  const EntryPoint_Addr = "0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2";
  const privateKey =
    "6d17286d5e09678c23c0fe7a95715146892c95294d1acd8fb399b53bdd14e9b2";
  const sender = "0xAa3bcBC78bc9d06CBA9355bf0dE0Dfd7D92957a0";
  // const nonce = "0";
  const callGasLimit = "500000";
  const verificationGasLimit = "200000";
  const preVerificationGas = "50000";
  const maxFeePerGas = "1000000000";
  const maxPriorityFeePerGas = "1000000000";
  const smartAccount = new ethers.utils.Interface(smartWalletABI);
  const amount = ethers.utils.parseEther("0.1");
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
      [ethers.utils.keccak256(packed), EntryPoint_Addr, "80001"]
    );

    return ethers.utils.keccak256(enc);
  };

  const userOpHash = getUserOpHash();
  console.log("userOpHash :", userOpHash);
 
  const arraifiedHash = ethers.utils.arrayify(userOpHash);
  console.log("Arraifiedfied hash", arraifiedHash);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  // console.log("Wallet is ", wallet);

  const signature = await wallet.signMessage(arraifiedHash);
  console.log("Signature", signature);

  const userOperations = [
    {
      sender: sender,
      nonce: nonce,
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

  // const EntryPoint = await ethers.getContractAt("EntryPoint", EntryPoint_Addr);

  try {
    // const tx = await EntryPoint.connect(wallet).simulateValidation(
    //   {
    //   sender: sender,
    //   nonce: nonce,
    //   initCode: "0x",
    //   callData: calldata,
    //   callGasLimit: callGasLimit,
    //   verificationGasLimit: verificationGasLimit,
    //   preVerificationGas: preVerificationGas,
    //   maxFeePerGas: maxFeePerGas,
    //   maxPriorityFeePerGas: maxPriorityFeePerGas,
    //   paymasterAndData: "0x",
    //   signature: signature,
    // },
    //   { gasLimit: 15000000 }
    // );
    const tx = await EntryPoint.connect(wallet).handleOps(
      userOperations,
      benificiaryAddress,
      { gasLimit: 1500000 }
    );
    await tx.wait();
    console.log("Transaction successful:", tx.logs);
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
