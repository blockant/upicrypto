const { ethers } = require("hardhat");
require("dotenv").config();

const privateKey = process.env.POLYGON_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(
  "https://linea-goerli.infura.io/v3/c5481ef9dd88453492aa84ccd297f474"
);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {
  const deployer = wallet;

  const factoryAddress = "0xa6FbF91843396D5FEb7711A87c37F25A3E9E6Dbf";
  const entryPoint = "0x0a678Df2dC9E7A288131bd7924b5d9026971c8F8";
  const walletOwner = deployer.address;

  const salt = 1;

  const factory = await ethers.getContractAt("WalletFactory", factoryAddress);
  // console.log("factory address", factory);
  
  const gasPrice = ethers.utils.parseUnits('1', 'gwei'); // Replace with your desired gas price in Gwei
  const gasLimit = 3000000; // Replace with your desired gas limit

  const deployTx = await factory.deployWallet(entryPoint, walletOwner, salt, {
    gasPrice: gasPrice,
    gasLimit: gasLimit, // Specify the gas limit here
  });
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
