var SmartWallet = artifacts.require("SmartWallet");


module.exports = function(deployer, network, accounts) {
  deployer.deploy(SmartWallet);
};