require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");

module.exports = {
  networks: {
    ganache: {
      url: "http://localhost:7545",
      chainId: 1337
    }
  },
  solidity: "0.8.0",
};