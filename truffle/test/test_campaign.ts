const Campaign = artifacts.require("Campaign");


contract ("Campaign", async (accounts) => {
    
    it("Contract is set up", async ()=>{
        const c = await Campaign.deployed();
        assert.equal(await (await c.currentMilestone()).toNumber(), 0);
        assert.equal(await (await c.milestonesCount()).toNumber(), 5);

    });
    
    it("Can donate and donations are reflected", async ()=>{
        const c = await Campaign.deployed();
        await c.send(500, {from: accounts[2]});

        assert.equal((await c.donations(accounts[2])).toNumber(), 500);
        assert.equal((await c.donatedAmount()).toNumber(), 500);
        
    });

    it("Cannot donate less than minimum pledge", async ()=>{
        const c = await Campaign.deployed();
        try {
            await c.send(1, {from: accounts[3]});
            assert.fail("Should not be able to send less than a pledge")
        } catch {
            assert.equal((await c.donatedAmount()).toNumber(),  500);
        }
        
    });

    it("10,000 in donations flip milestone", async ()=> {
        const c = await Campaign.deployed();
        assert.equal(await (await c.currentMilestone()).toNumber(), 0);
        
        await c.send(5000, {from: accounts[0]});
        await c.send(5000, {from: accounts[1]});

        assert.equal((await c.donatedAmount()).toNumber(), 10500);
        assert.equal((await c.currentMilestone()).toNumber(), 1);
        
    });

    it("Donators can access milestone 0", async ()=>{
        const c = await Campaign.deployed();
        assert.isTrue(await c.canSeeContent(0, {from: accounts[0]}));
        assert.isTrue(await c.canSeeContent(0, {from: accounts[1]}));
        assert.isTrue(await c.canSeeContent(0, {from: accounts[2]}));

    });

    it("Non-donators can't see milestone 0", async ()=>{
        const c = await Campaign.deployed();
        assert.isFalse(await c.canSeeContent(0, {from: accounts[3]}));
    })

    it("Noone except owner can't see past milestone 0", async() => {
        const c = await Campaign.deployed();
        assert.isTrue(await c.canSeeContent(1, {from: accounts[0]}));
        assert.isFalse(await c.canSeeContent(1, {from: accounts[1]}));
        assert.isFalse(await c.canSeeContent(1, {from: accounts[3]}));
   
    });

    it("Owner can withdraw milestone 0 proceedings", async ()=>{
        const c = await Campaign.deployed();
        const oldBalance = await web3.eth.getBalance(accounts[0]);
        await c.collect({from: accounts[0]});
        const newBalance = await web3.eth.getBalance(accounts[0]);
        assert.notEqual(oldBalance, newBalance, "Balance should've changed");
        
        try {
            await c.collect({from: accounts[0]});
            assert.fail("Shouldn't be able to collect twice");
        } catch {
            // Balance should have a change
            const contractBalance = await web3.eth.getBalance(c.address);
            assert.equal(contractBalance, "500");
        }

    });

    it("Big donation can flip multiple milestones", async ()=>{
        const c = await Campaign.deployed();
        await c.send(20000, {from: accounts[3]});
        assert.equal((await c.currentMilestone()).toNumber(), 3);
    });

    it("Donators can access 0,1,2 ms content", async ()=>{
        const c = await Campaign.deployed();

        for(const i of [0,1,2]){
            assert.isTrue(await c.canSeeContent(i, {from: accounts[0]}));
            assert.isTrue(await c.canSeeContent(i, {from: accounts[1]}));
            assert.isTrue(await c.canSeeContent(i, {from: accounts[2]}));
        }
    });

    it("Owner can withdraw again", async () =>{
        const c = await Campaign.deployed();
        const oldBalance = await web3.eth.getBalance(accounts[0]);
        await c.collect({from: accounts[0]});
        const newBalance = await web3.eth.getBalance(accounts[0]);
        assert.notEqual(oldBalance, newBalance, "Balance should've changed");
        
        try {
            await c.collect({from: accounts[0]});
            assert.fail("Shouldn't be able to collect twice");
        } catch {
            // Balance should have a change
            const contractBalance = await web3.eth.getBalance(c.address);
            assert.equal(contractBalance, "500");
        }
    });

    it("Can complete campaign", async () => {
        const c = await Campaign.deployed();
        await c.send(100000, {from: accounts[1]});
        assert.isTrue(await c.campaignIsFinished());
        
     
    });

    it("Can withdraw without control after", async ()=>{
        const c = await Campaign.deployed();

        await c.collect()
        assert.equal(await web3.eth.getBalance(c.address), "0");
        
        // Can still send and double connect
        await c.send(100000, {from: accounts[1]});
        assert.equal(await web3.eth.getBalance(c.address), "100000");
        await c.collect();
        assert.equal(await web3.eth.getBalance(c.address), "0");

    });

    
})

