const hre = require("hardhat");

async function main() {
    const OWNER="0x41Eb71f017503327EcAAD2E4F6f05C3B962538B7"

    const EntryPointC = await hre.ethers.getContractFactory("EntryPoint");
    const entryPoint = await EntryPointC.deploy();
    await entryPoint.deployed();
  
    console.log(`entryPoint deployed on polygon mumbai to ${entryPoint.address}`);
    //////////////////////
    
    const Wallet = await hre.ethers.getContractFactory("SmartWallet");
    const wallet = await Wallet.deploy(entryPoint.address, OWNER);
    await wallet.deployed();
  
    console.log(`wallet deployed on polygon mumbai to ${wallet.address}`);
    /////////////////////

    const PayMaster = await hre.ethers.getContractFactory("PayMaster");
    const paymaster = await PayMaster.deploy(entryPoint.address);
    await paymaster.deployed();
  
    console.log(`paymaster deployed on polygon mumbai to ${paymaster.address}`);
    /////////////////////

    const PayMasterToken = await hre.ethers.getContractFactory("PayMasterToken");
    const paymasterToken = await PayMasterToken.deploy(entryPoint.address);
    await paymasterToken.deployed();
  
    console.log(`paymasterToken deployed on polygon mumbai to ${paymasterToken.address}`);
    /////////////////////

    const WalletFactory = await hre.ethers.getContractFactory("WalletFactory");
    const factory = await WalletFactory.deploy();
    await factory.deployed();
  
    console.log(`factory deployed on polygon mumbai to ${factory.address}`);
    /////////////////////
    
    const Token = await hre.ethers.getContractFactory("MockERC20");
    const token = await Token.deploy();
    await token.deployed();
  
    console.log(`token deployed on polygon mumbai to ${token.address}`);
    /////////////////////
  }

  main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});