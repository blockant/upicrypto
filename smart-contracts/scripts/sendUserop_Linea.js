const { ethers } = require("hardhat");
require("dotenv").config();

const smartWalletABI = require("../artifacts/contracts/SmartWallet.sol/SmartWallet.json").abi;

async function main() {
  const benificiaryAddress = "0x0a678Df2dC9E7A288131bd7924b5d9026971c8F8";
  const receiverAddr = "0x566E21aFE80E341A2B542A7a1d068202c3b9dD69";
  const EntryPoint_Addr = "0x0a678Df2dC9E7A288131bd7924b5d9026971c8F8";
  const privateKey = process.env.LINEA_PRIVATE_KEY;

  const sender = "0xAf7Df9Bf75D05CA6CcfA002b86e420951a39AD3B"; //computed address
  // const nonce = "0";
  const callGasLimit = "1000000";
  const verificationGasLimit = "200000";
  const preVerificationGas = "5000000";
  const maxFeePerGas = "10000000000";
  const maxPriorityFeePerGas = "10000000000";
  const smartAccount = new ethers.utils.Interface(smartWalletABI);
  const amount = ethers.utils.parseEther("0.001");
  console.log("Amount", amount);

  const calldata = smartAccount.encodeFunctionData("executeFromEntryPoint", [
    receiverAddr,
    amount,
    "0x",
  ]);
  const smartwallet = await ethers.getContractAt(
    "SmartWallet",
    "0xAf7Df9Bf75D05CA6CcfA002b86e420951a39AD3B"
  );

  const nonce = await smartwallet.nonce();
  const owner = await smartwallet.owner();
  console.log("nonce", nonce);
  console.log("owner", owner);

  console.log("Call data", calldata);

  const EntryPoint = await ethers.getContractAt("EntryPoint", EntryPoint_Addr);

  let userOpHash;
  try {
    userOpHash = await EntryPoint.getUserOpHash({
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
      signature: "0x",
    });
    console.log("userOpHash :", userOpHash);
  } catch (error) {
    console.error("Error:", error);
  }

  const arraifiedHash = ethers.utils.arrayify(userOpHash);
  console.log("Arraified hash", arraifiedHash);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://linea-goerli.infura.io/v3/c5481ef9dd88453492aa84ccd297f474"
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const signature = await wallet.signMessage(arraifiedHash);
  const { r, s, v } = ethers.utils.splitSignature(signature);
  console.log("r", r);
  console.log("s", s);
  console.log("v", v);
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
  console.log("UserOp", userOperations);

  // const EntryPoint = await ethers.getContractAt("EntryPoint", EntryPoint_Addr);
  try {
    const tx = await EntryPoint.connect(wallet).handleOps(
      userOperations,
      benificiaryAddress,
      { gasLimit: 150000 }
    );
    await tx.wait();
    console.log("Transaction receipt:",tx.receipt.reason);
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

