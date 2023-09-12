require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require("solidity-docgen");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const { 
  ALCHEMY_API_KEY, 
  POLYGON_PRIVATE_KEY,
  INFURA_API_KEY,
  LINEA_PRIVATE_KEY
 } =
  process.env;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20,
      },
    },
  },
  allowUnlimitedContractSize: "true",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [POLYGON_PRIVATE_KEY],
    },
    zkEVM:{
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [POLYGON_PRIVATE_KEY],
    },
    ziliqaTestnet:{
      url: `https://dev-api.zilliqa.com`,
      accounts: [POLYGON_PRIVATE_KEY],
    },
    lineaTestnet: {
      url: `https://linea-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [LINEA_PRIVATE_KEY],
    },
    taikoTestnet:{
      url: `https://rpc.test.taiko.xyz`,
      accounts: [POLYGON_PRIVATE_KEY],
    },
  },
  etherscan :{
    apiKey: {
      // polygonMumbai: POLYGONSCAN_API_KEY,
      // zkEVM: "JMWIV8P7XEJUH7J87YMQ5NBNR2JA3XHF3S",
      lineaTestnet: '5QWDTVPDD9GU8WUU2RR15TUHIMUKWZZ9XY',
    }
  }
  // taiko
  // etherscan: {
  //   apiKey: {
  //     taiko: "42069",
  // },
  // customChains: [
  //     {
  //         network: "taiko",
  //         chainId: 167005,
  //         urls: {
  //             apiURL: "https://explorer.test.taiko.xyz/api",
  //             browserURL: "https://explorer.test.taiko.xyz",
  //         },
  //     },
  // ],
  // },
};
