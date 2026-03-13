require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: process.env.BASE_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
