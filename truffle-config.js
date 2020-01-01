var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "mobile level over custom cry shove once board trend coral mother usage";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(mnemonic, "https://ropsten.infura.io/099ee8a18b7e4e03a2f4b5508f38ee3a"),
      network_id: '3',
    }
  }
};
