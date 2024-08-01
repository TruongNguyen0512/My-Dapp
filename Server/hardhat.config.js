require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    } , 
  },
  etherscan: {
    apiKey: 'YOUR_ETHERSCAN_API_KEY'
  },
  gasReporter: {
    enabled: true,
    currency: 'USD'
  }
};
