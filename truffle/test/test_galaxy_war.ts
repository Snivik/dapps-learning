const GalaxyWar = artifacts.require("GalaxyWar");

/**
 * Sample test suite for the GalaxyWar.sol. Read notes on the contract to get
 * a context
 */
contract("GalaxyWar", async accounts => {

    it("User shoud be able to mint a planet", async () => {
        const instance = await GalaxyWar.deployed();
        
        await instance.mint(0, {from: accounts[0], value: web3.utils.toWei('0.1', 'ether')});
        await instance.mint(1, {from: accounts[1], value: web3.utils.toWei('0.1', 'ether')});

        const owner1 = await instance.getOwner(0);
        const owner2 = await instance.getOwner(1);

        assert.equal(owner1, accounts[0]);
        assert.equal(owner2, accounts[1]);
    });

    it("Users shouldn't be able to remint a planet", async () => {
        const instance = await GalaxyWar.deployed();

        instance.mint(0, {from: accounts[0], value: web3.utils.toWei('0.1', 'ether')}).then(()=>{
            assert.fail("Mint should've failed should've failed");
        }).catch(()=>{
            // All good
        });
     });

    it("Buying 1 eth worth of force gives you 100 force", async () => {
        const instance = await GalaxyWar.deployed();
        await instance.buyPlanetaryForce(0, {value: web3.utils.toWei('1', 'ether')});
        const planetPower = await instance.getPower(0);
        assert.equal(planetPower.toNumber(), 100, "Should have 100 power");
    });

    
});