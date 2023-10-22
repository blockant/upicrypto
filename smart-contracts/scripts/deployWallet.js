const { ethers } = require("hardhat");
require("dotenv").config();

const privateKey = process.env.POLYGON_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/n9mtf5trLko3Rmr05t-LUFvm8Zg3lwp7" //"https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {
  const deployer = wallet;

  const factoryAddress = "0x313d9F7dBF73dFbbBaAe408F6Ef020a6bE38D0f0"; //"0xB4096D858c846fc1C5Ae6f9126235C1935ae2D03"; //"0xbc7cb1188006553fCA5E2aeB76974CfF66Dd9791";
  const entryPoint = "0x17d15ce833AC53e793a27746300A86e36D42162B"; //"0xCD4fF2FEcFD23C7693157395160dE6eA30609C39"; //"0x1781dD58E10698Ce327d493771F7Ba9E5B394BF2";
  const walletOwner = deployer.address;
  console.log("Wallet address", walletOwner);
  const salt = 1;

  const factory = await ethers.getContractAt("WalletFactory", factoryAddress);

  const deployTx = await factory.deployWallet(entryPoint, walletOwner, salt);
  await deployTx.wait();

  const computedAddress = await factory.computeAddress(
    entryPoint,
    walletOwner,
    salt
  );

  console.log(
    "Wallet deployed and computed address:",

    computedAddress
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
