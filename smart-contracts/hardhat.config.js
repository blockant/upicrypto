require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require("solidity-docgen");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const {
  ALCHEMY_API_KEY,
  POLYGON_PRIVATE_KEY,
  POLYGONSCAN_API_KEY,
  ZK_EVM_POLYGONSCAN_API_KEY,
  ZK_EVM_ALCHEMY_API_KEY,
  GOERLI_ALCHEMY_API_KEY,
} = process.env;

module.exports = {
  // docgen: { ... },
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
    zkEvm: {
      url: `https://polygonzkevm-testnet.g.alchemy.com/v2/${ZK_EVM_ALCHEMY_API_KEY}`,
      accounts: [POLYGON_PRIVATE_KEY],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${GOERLI_ALCHEMY_API_KEY}`,
      accounts: [POLYGON_PRIVATE_KEY],
    },
    // gnosis: { //Need xDAI
    //   url: "https://rpc.gnosischain.com",
    //   accounts: [GNOSIS_PRIVATE_KEY]
    // },
    // scroll_alpha_testnet : {
    //   url: "https://alpha-rpc.scroll.io/l2",
    //   accounts: [SCROLL_PRIVATE_KEY]
    // },
    // scroll_georli_testnet: {
    //   url: "https://endpoints.omniatech.io/v1/eth/goerli/public",
    //   accounts: [SCROLL_PRIVATE_KEY]
    // },
    // georli_optimism_testnet: {
    //   url: "https://goerli.optimism.io",
    //   accounts: [OPTIMISM_PRIVATE_KEY]
    // }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
      zkEvm: ZK_EVM_POLYGONSCAN_API_KEY,
    },
    customChains: [
      {
        network: "zkEvm",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/",
        },
      },
    ],
  },
};
