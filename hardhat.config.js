// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ganache");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  networks: {
    ganache: {
      // url: "http://127.0.0.1:7545",
      // chainId: 1337
      url: process.env.PROVIDER_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.0",
};