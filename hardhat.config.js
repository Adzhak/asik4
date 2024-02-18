require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://localhost:8545", // Adjust port if needed
    },
  },
  solidity: "0.8.24",
  
};
