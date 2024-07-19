require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan"); // Nếu cần xác thực với Etherscan

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    ropsten: {
      url: `https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: YOUR_ETHERSCAN_API_KEY // Nếu bạn muốn xác thực hợp đồng trên Etherscan
  },
  gasReporter: {
    enabled: true,
    currency: 'USD'
  }
};
