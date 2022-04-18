const SmartWallet = artifacts.require("SmartWallet");

const {toWei} = web3.utils;

contract("SmartWallet", async accounts => {

    const instance = await SmartWallet.deployed();
    it("User should be able to deposit money", async () => {
       
        await instance.send(toWei('1', 'ether'), {from: accounts[0]});
        const balance = await instance.getBalance({from: accounts[0]});
        assert.equal(balance.toString(), toWei('1', 'ether'),   "Account should have one ether");
    });

    it("User should set an allowance", async () => {
        await instance.setAllowance(accounts[1], toWei('0.1', 'ether'));
    });


    
});