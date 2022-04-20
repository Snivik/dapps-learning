const SmartWallet = artifacts.require("SmartWallet");

const {toWei} = web3.utils;


/**
 * Test cases for a study of smart wallet contract. It doesn't test complex
 * reentry attacks, but it does test logic holes I could've made while developing
 * simple logic
 */
contract("SmartWallet", async accounts => {

    it("User should be able to deposit money", async () => {
        const instance = await SmartWallet.deployed();
        await instance.send(toWei('1', 'ether'), {from: accounts[0]});
        const balance = await instance.getBalance({from: accounts[0]});
        assert.equal(balance.toString(), toWei('1', 'ether'),   "Account should have one ether");
    });

    it("User should set an allowance", async () => {
        const instance = await SmartWallet.deployed();
        await instance.setAllowance(accounts[1], toWei('0.1', 'ether'), {from: accounts[0]});
    });

    it("User should be able to withdraw their allowance", async () => {
        const instance = await SmartWallet.deployed();

        await instance.withdrawFrom(accounts[0], toWei('0.1', 'ether'), {from: accounts[1]});

        const balance = await instance.getBalance({from: accounts[0]});
        assert.equal(balance.toString(), toWei('0.9', 'ether'), '0.9 ether should remain in the account');

    });

    it("User's allowance should be 0", async () => {
        const instance = await SmartWallet.deployed();
        const remainingAllowance = await instance.getAllowance(accounts[0], {from: accounts[1]});
        assert.equal(remainingAllowance[0].toString(), '0', 'Allowance should be 0');
    });

    it("Can't withdraw below the allowance", async () => {
        const instance = await SmartWallet.deployed();

        try {
            await instance.withdrawFrom(accounts[0], toWei('0.1', 'ether'), {from: accounts[1]})
            assert.fail("Shouldn't be able to withdraw below allowance");
        } catch{
            // All good
        }
    

    });

    it("Can't withdraw more than wallet has", async ()=>{
        const instance = await SmartWallet.deployed();
        await instance.setAllowance(accounts[1], toWei('10', 'ether'), {from: accounts[0]});

        try {
            await instance.withdrawFrom(accounts[0], toWei('10', 'ether'), {from: accounts[1]});
            assert.fail("Shouldn't be able to withdraw below allowance");
        } catch {
            // All good
        }
    });

    it("Correctly shows withdrawable balance", async ()=>{
        const instance = await SmartWallet.deployed();
        const remainingAllowance = await instance.getAllowance(accounts[0], {from: accounts[1]});
        
        assert.equal(remainingAllowance[0].toString(), toWei('10', 'ether'), 'Allowance should be 10');
        assert.equal(remainingAllowance[1].toString(), toWei('0.9', 'ether'), '"permitted" allowance should be 0.9');

    });

    it("Someone else cannot destroy contract", async ()=>{
        const instance = await SmartWallet.deployed();

        try {
            await instance.destroy(accounts[0], {from: accounts[1]});
            assert.fail("Should not be able to destroy the contract");
        } catch {
            // All good
        }
    });
    
});