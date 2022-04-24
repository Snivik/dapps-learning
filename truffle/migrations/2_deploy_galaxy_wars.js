var GalaxyWar = artifacts.require("GalaxyWar");


module.exports = function(deployer, network, accounts) {
  deployer.deploy(GalaxyWar);
};