const { ethers } = require("hardhat");
require("dotenv").config();

const privateKey = process.env.POLYGON_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {
  const deployer = wallet;

  const factoryAddress = "0xbc7cb1188006553fCA5E2aeB76974CfF66Dd9791";
  const entryPoint = "0x1d965463060CF0baC17C67ec8FF9ace46d6D53d8";
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
