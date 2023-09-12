const { ethers } = require("hardhat");
require("dotenv").config();

const smartWalletABI = require("../artifacts/contracts/SmartWallet.sol/SmartWallet.json").abi;

async function main() {
  const benificiaryAddress = "0x340F2CD1253D2E5Ed8087D4Da1958a20d9E87684";
  const receiverAddr = "0x41Eb71f017503327EcAAD2E4F6f05C3B962538B7";
  const EntryPoint_Addr = "0x340F2CD1253D2E5Ed8087D4Da1958a20d9E87684";
  const privateKey = process.env.POLYGON_PRIVATE_KEY;

  const sender = "0x4276438aCd46880E1d80AbB5A83c8cB37361030F"; //computed address
  // const nonce = "0";
  const callGasLimit = "1000000";
  const verificationGasLimit = "200000";
  const preVerificationGas = "5000000";
  const maxFeePerGas = "10000000000";
  const maxPriorityFeePerGas = "10000000000";
  const smartAccount = new ethers.utils.Interface(smartWalletABI);
  const amount = ethers.utils.parseEther("0.0001");
  console.log("Amount", amount);

  const calldata = smartAccount.encodeFunctionData("executeFromEntryPoint", [
    receiverAddr,
    amount,
    "0x",
  ]);
  const smartwallet = await ethers.getContractAt(
    "SmartWallet",
    "0x4276438aCd46880E1d80AbB5A83c8cB37361030F"
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
    "https://rpc.public.zkevm-test.net"
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
      { gasLimit: 150000000 }
    );
    await tx.wait();
    console.log("Transaction:",tx)
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

