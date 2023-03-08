const path = require("path");
// require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC =
  "more rib chapter cave crystal anxiety mix orchard green lobster shove tumble";
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    developement: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777,
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "http://127.0.0.1:7545",
          AccountIndex
        );
      },
      network_id: 5777,
    },
    gorli_infura: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://goerli.infura.io/v3/2d2bf23735664eba87d0efe83589608c",
          AccountIndex
        );
      },
      network_id: 5,
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "wss://ropsten.infura.io/ws/v3/2d2bf23735664eba87d0efe83589608c",
          AccountIndex
        );
      },
      network_id: 3,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
