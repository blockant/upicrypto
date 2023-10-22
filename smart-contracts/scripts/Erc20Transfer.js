const { ethers } = require("hardhat");
require("dotenv").config();

const smartWalletABI =
  require("../artifacts/contracts/SmartWallet.sol/SmartWallet.json").abi;
const erc20abi = require("../constants/erc20abi.json");

async function main() {
  const benificiaryAddress = "0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2";
  const receiverAddr = "0xb34cDe61a284205ffeD6Baf0b06F0445336631DC";
  const EntryPoint_Addr = "0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2"; //"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; //"0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2";
  const privateKey = process.env.POLYGON_PRIVATE_KEY;
  const erc20TokenAddress = "0x2aC68A7Fa635972335d1d0880aa8861c5a46Bf88";

  const sender = "0xAa3bcBC78bc9d06CBA9355bf0dE0Dfd7D92957a0";
  // const nonce = "0";
  const callGasLimit = "100000";
  const verificationGasLimit = "200000";
  const preVerificationGas = "50";
  const maxFeePerGas = "10";
  const maxPriorityFeePerGas = "10";
  const smartAccount = new ethers.utils.Interface(smartWalletABI);
  const amount = ethers.utils.parseEther("0.01");
  console.log("Amount", amount);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
  );

  const erc20TokenContract = new ethers.Contract(
    erc20TokenAddress,
    erc20abi,
    provider
  );
  const [symbol, decimals] = await Promise.all([
    erc20TokenContract.symbol(),
    erc20TokenContract.decimals(),
  ]);

  console.log("decimals", decimals);
  console.log("symbol", symbol);
  const erc20amount = ethers.utils.parseUnits("1.0", decimals);

  console.log("Interface", erc20TokenContract.interface);

  const calldata = smartAccount.encodeFunctionData("executeFromEntryPoint", [
    erc20TokenAddress,
    ethers.constants.Zero,
    erc20TokenContract.interface.encodeFunctionData("transfer", [
      receiverAddr,
      erc20amount,
    ]),
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
      { gasLimit: 15000000 }
    );
    await tx.wait();
    console.log("Transaction:", tx);
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
