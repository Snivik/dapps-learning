var Campaign = artifacts.require("Campaign");


module.exports = function(deployer, network, accounts) {
  deployer.deploy(Campaign, [10000, 20000, 30000, 40000, 50000], 100 , {from: accounts[0]});
};