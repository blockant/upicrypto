const { ethers } = require("hardhat");
require("dotenv").config();

const privateKey = process.env.POLYGON_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.public.zkevm-test.net"
);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {
  const deployer = wallet;

  const factoryAddress = "0x82BB132511196d92D1c9310D8Bb7bec3c9268D4a";
  const entryPoint = "0x340F2CD1253D2E5Ed8087D4Da1958a20d9E87684";
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